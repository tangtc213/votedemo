const express = require('express')
// const open = require('open')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fsp = require('fs').promises
const path = require('path')
var svgCaptcha = require('svg-captcha')
const cors = require('cors')
const uploader = multer({ dest:__dirname + '/uploads/' })
const WebSocket = require('ws')
const http = require('http')
const _ = require('lodash')
// 建立服务器部分
const app = express()
const PORT = 8080
const server = http.createServer(app) //express返回的app就是传给createserver
const wss = new WebSocket.Server({server})

// 投票id到到订阅这个投票信息的websocket的映射
var voteIdMapWs = {}
wss.on("connection", (ws, req) => {
    var voteId = req.url.split('/').slice(-1)[0]
    console.log('将会把', voteId, ' 的实时信息发送到客户端')
    if(voteId in voteIdMapWs) {
        voteIdMapWs[voteId].push(ws)
    } else {
        voteIdMapWs[voteId] = [ws]
    }

    ws.on('close', () => {
        voteIdMapWs[voteId] = voteIdMapWs[voteId].filter(it => it != ws)
    })
})

// 声明数据块
let db
const dbPromise = require('./vote-db.js')
dbPromise.then(value => {
    db = value
})



app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use(cors({
    maxAge: 86400,
    orgin: true,
    credentials: true,
}))

app.use(express.static(__dirname + '/build'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static',express.static(__dirname + '/static'))
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use(cookieParser('sadf9a7sdf79afd9'))

// 使用一个session
var sessionStore = Object.create(null)

app.use(function sessionMW(req,res,next) {
    if(req.cookies.sessionId) {
        req.session = sessionStore[req.cookies.sessionId]
        if(!req.session) {
            req.session = sessionStore[req.cookies.sessionId] = {}
        }
    } else {
        let id =  Math.random().toString(16).slice(2)
        req.session = sessionStore[id] = {}
        res.cookie('sessionId', id, {
            maxAge: 86400000,
        })
    }
    next()
})

// 处理cookie
app.use(async (req, res, next) => {
    console.log(req.cookies, req.signedCookies)
    // 从签名cookie中找到该用户的信息并挂在req对象上以供后续的中间件访问
    if(req.signedCookies.user) {
        req.user = await db.get('SELECT rowId as id, * FROM users WHERE name = ?', req.signedCookies.user)
    }
    next()
})



// 创建投票
app.post('/vote', async(req, res, next) => {
        if(req.user) {
            /**
             * {
             *  title,
             *  desc,
             * options: ['foo', 'bar'],
             * deadline,
             * anonymous,
             * isMultiple
             * }
             */
            var voteInfo = req.body
            await db.run('INSERT INTO votes VALUES (?, ?, ?, ?, ?, ?, ?)',
            [voteInfo.title,voteInfo.desc,req.user.id,voteInfo.deadline,voteInfo.anonymous,new Date().toISOString(),voteInfo.isMultiple]
            )
            var vote = await db.get('SELECT rowId AS id, * from votes ORDER BY ID DESC LIMIT 1')
            for(var option of voteInfo.options) {
                db.run('INSERT INTO options VALUES (?,?,?)',
                [vote.id, option, 0]
                )
            }

            res.json({voteId: vote.id})
        } else {
            res.status(401/**未授权 */).json({
                code: -1,
                msg: '未登录无法创建投票'
            })
        }
    })

// 查看投票(无需登录)
app.get('/vote/:id', async(req, res, next) => {
    var id = req.params.id
    // console.log(id)
    var vote = await db.get('SELECT rowid AS id, * FROM votes WHERE id = ?', id)
    var options = await db.all('SELECT rowid AS id, * FROM options WHERE voteId = ?', id)
    var votings = await db.all('SELECT votings.rowid As id, * FROM votings JOIN user ON userId = user.id WHERE voteId = ?', id)
    console.log(votings)
    vote.options = options
    vote.votings = votings
    res.json(vote)
})

// 获取用户的所有帖子
app.get('/myvotes', async(req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            code: -1,
            msg: '用户未登录'
        })
        return
    }
    // var myVotes = await db.all('SELECT rowid AS id, * FROM votes WHERE userId = ?', req.user.id)
    var Votes = await db.all('SELECT rowid AS id, * FROM votes')
    res.json(Votes)
})


// 用户对某个选项发起的投票
app.post('/voteup/:voteId', async(req, res, next) => {
    /**
     * {
     *  optionId,
     *  isVoteDown: true,
     * }
     */
    var voteId = req.params.voteId
    var body = req.body
    var vote = await db.get('SELECT rowid AS id, * FROM votes WHERE id = ?', voteId)

    // 超截止日期提醒
    if(Date.now() > new Date(vote.deadline)) {
        res.status(401).end({
            code: -1,
            msg: '该问题已过截止日期，不能再投票'
        })
    }

    // 非多选
    if(!vote.isMultiple) { // 单选
        // 删除之前可能的一票
        await db.run('DELETE FROM votings WHERE userId = ? AND voteId = ?',req.user.id, voteId)
        // 添加这次的一票
        await db.run('INSERT INTO votings VALUES (?, ?, ?)',
        [voteId, body.optionId, req.user.id]
        )
        res.end()
    } else { // 多选

        await db.run('DELETE FROM votings WHERE voteId = ? AND optionId = ? AND userId = ?',
        [voteId, body.optionId,req.user.id]
        )
        console.log('Mdelete')
        if(!body.isVoteDown) {
            await db.run('INSERT INTO votings VALUES (?, ?, ?)',
            [voteId, body.optionId,req.user.id]
            )
        }
        res.end()
    }
    broadcast(voteId)
})


var broadcast = _.throttle(async function boradcase(voteId) {
    var webSockets = voteIdMapWs[voteId] || []
    var votings = await db.all('SELECT votings.rowid As id, * FROM votings JOIN user ON userId = user.id WHERE voteId = ?', voteId)
    for(var ws of webSockets) {
        ws.send(JSON.stringify(votings))
    }

}, 300, {leading: false})

// 删除某项投票
app.post('/delete-vote', async(req, res, next) => {
    console.log(req.body)
    await db.run('DELETE FROM votes WHERE rowid = ?',req.body.voteId)
    await db.run('DELETE FROM options WHERE voteId = ?',req.body.voteId)
    var myVotes = await db.all('SELECT rowid AS id, * FROM votes WHERE userId = ?', req.user.id)
    res.json(myVotes)
})

// 用户注册
app.route('/register')
    .post(uploader.single('avatar'), async (req, res, next) => {
        var user = req.body
        console.log(req.body)
        const defaultEmail = 'default@gmail.com'
        const avatarUrl = '/uploads/default-avatar.png'
        // var file = req.file
        // console.log(user, file)
        // let targetName = file.path + '-' + file.originalname
        // await fsp.rename(file.path,targetName)
        // var avatarOnlineUrl = `/uploads/` + path.basename(targetName)
        let conflictName = await db.get('SELECT * FROM users WHERE name = ?', req.body.username)
        if(conflictName) {
            res.status(400).json({
                msg: '用户名已使用',
                code: -1,
            })
            res.end()
        }
        try {
            await db.run(`INSERT INTO users VALUES (?,?,?,?)`,[req.body.name, req.body.password, defaultEmail, avatarUrl])
            res.json({
                msg: '注册成功',
            })
        } catch(e) {
            res.status(400).json({
                msg: '注册失败:' + e.toString() ,
                code: -1,
            })
        }

    })

// 提供用户名重复检测接口
app.get('/username-conflict-check' ,async (req,res, next) => {
    // 到数据库中检测重复冲突
    var user = await db.get('SELECT * FROM users WHERE name = ?', req.query.name)

    if(user) {
        res.json({
            code: -1,
            msg: '用户名被占用',
        })
    } else {
        res.json({
            code: 0,
            msg: '用户名可用',
        })
    }

})



// 验证码处理
app.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
});

// 登录页面
app.route('/login')

    .post(async (req, res, next) => {
        console.log('收到登录请求', req.body)
        var loginInfo = req.body

        // // 验证码验证
        // if(req.body.captcha !== req.session.captcha) {
        //     console.log(req.body.captcha, req.session.captcha)
        //     res.json({
        //         code: -1,
        //         msg: '验证码错误'
        //     })
        //     return
        // }

        var user = await db.get('SELECT rowid as id, * FROM users WHERE name = ? AND password = ?',
        [loginInfo.name, loginInfo.password]
        )

        if(user) {
            res.cookie('user', user.name, {
                maxAge: 86400000,
                signed: true,
            })
            res.json(user)
        } else {
            res.status(404).json({
                code: -1,
                msg: '登录失败, 用户名或密码错误',
            })
        }
        res.end('ok')
    })

// 获取用户信息
app.get('/userinfo', async(req, res, next) => {
     if(req.user) {
        res.json(req.user)
     } else {
        res.status(404).json({
            code: -1,
            msg: '用户未登录',
        })
     }
})

// 登出页面
app.route('/logout')
    .get((req, res, next) => {
        res.clearCookie('user')
        res.json({
            code: 0,
            msg: '登出成功'
        })
    })


// 用户界面
app.route('/user/:id')
    .get(async(req,res, next) => {
        var userInfo = await db.get('SELECT * FROM users WHERE rowId = ?' ,req.params.id)

        if(userInfo) {
            var userPostsPromise = db.all('SELECT rowId as id, * FROM posts WHERE userId=? ORDER BY createdAt DESC', req.params.id)
            var userCommentsPromise = db.all('SELECT postId, title as postTitle, comments.content, comments.createdAt FROM comments JOIN posts ON comments.postId = posts.rowId WHERE comments.userId = ? ORDER BY comments.createdAt DESC', req.params.id)
            var [userPosts, userComments] = await Promise.all([userPostsPromise, userCommentsPromise])

            res.render('user-profile.pug', {
                user: req.user,
                userInfo,
                userPosts,
                userComments,
            })
        } else {
            res.end('查无此人')
        }
    })

// 由更改密码id映射到对应的用户
var changePassWordMap = {}
// 找回密码请求
app.route('/forget')
    .get(async (req, res, next) => {
        res.render('forget.pug')
    })
    .post(async(req,res, next) => {
        var email = req.body.email
        console.log(email)
        var user = await db.get('SELECT * FROM users WHERE email= ?', email)
        if(user) {
            var changePassWordId = Math.random().toString(16).slice(2)
            changePassWordMap[changePassWordId] = user
            // 设置十分钟以后清零
            setTimeout(() => {
                delete changePassWordMap[changePassWordId]
            }, 1000 * 60 * 10)

            var changePassWordLink = 'http://localhost:8080/change-password/' + changePassWordId

            console.log(changePassWordLink)
            res.end('a link has been send to your email, please click to change your password')
            console.log(changePassWordMap)
            // sendEmail(email, `
            //     请点击连接以修改密码,
            // var changPassWordLink = 'http://localhost:8080/change-password/' + changPassWordId
            //     ${changPassWordLink}
            //     如果以上连接不能打开，请复制到浏览器中打开，
            //     该链接10分钟内有效
            // `)
        } else {
            console.log('1')
            res.end('The email is not in users')
        }
    })


// 修改密码请求
app.route('/change-password/:id')
    .get(async(req,res,next) => {
        var user = changePassWordMap[req.params.id]
        if(user) {
            res.render('change-password.pug', {
                user: user,
            })
        } else {
            res.end('link has expired')
        }
    })
    .post(async (req,res,next) => {
        var user = changePassWordMap[req.params.id]
        await db.run('UPDATE users SET password= ? WHERE name = ?',
        req.body.password, user.name
        )
        res.end('password change success')
    })

// 监听运行
server.listen(PORT, '127.0.0.1', () => {
    console.log('server listening on the port: ' , PORT)
})
