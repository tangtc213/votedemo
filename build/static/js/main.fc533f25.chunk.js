(this["webpackJsonpvote-fe"]=this["webpackJsonpvote-fe"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},102:function(e,t,a){},103:function(e,t,a){},121:function(e,t,a){},122:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(65),r=a.n(l),o=(a(77),a(3)),s=(a(78),a(1)),i=a(6),u=a.n(i),m=a(4),v=a.n(m),f=a(11),p=a(2);a(59);function E(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),l=Object(s.g)();function r(){return(r=Object(f.a)(v.a.mark((function n(c){var r,o;return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c.preventDefault(),r={name:t.current.value,password:a.current.value},n.prev=2,n.next=5,u.a.post("/login",r);case 5:-1!=(o=n.sent).data.code&&(e.setUserInfo(o.data),l.push("/home")),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(2),alert(n.t0.response.data.msg.toString());case 12:case"end":return n.stop()}}),n,null,[[2,9]])})))).apply(this,arguments)}return Object(n.useEffect)((function(){e.userInfo&&l.push("/home")}),[]),c.a.createElement("div",null,c.a.createElement("div",{className:"title"},c.a.createElement("span",null,"\u767b\u5f55\u9875\u9762")),c.a.createElement("h2",{className:"login_nav"},"\u7528\u6237\u767b\u5f55"),c.a.createElement("form",{className:"login_form",onSubmit:function(e){return r.apply(this,arguments)}},c.a.createElement("div",{className:"login_form_item"},c.a.createElement("div",null,"\u7528\u6237\u540d\uff1a"),c.a.createElement("div",null,c.a.createElement("input",{className:"login_form_input",ref:t,type:"text"}))),c.a.createElement("div",{className:"login_form_item"},c.a.createElement("div",null,"\u5bc6\u7801\uff1a"),c.a.createElement("div",null,c.a.createElement("input",{className:"login_form_input",ref:a,type:"password"}))),c.a.createElement("button",{className:"finish_btn"},"\u767b\u5f55"),c.a.createElement(p.b,{to:"/register"},c.a.createElement("button",{className:"finish_btn"},"\u524d\u5f80\u6ce8\u518c")),c.a.createElement("section",{className:"login_form_item login_tip"},"tips: \u672cdemo\u53ef\u7528",c.a.createElement("i",null,"\u7528\u6237\u540d: lily, \u5bc6\u7801: 123456"),"\u6216",c.a.createElement("br",null),c.a.createElement("i",null,"\u7528\u6237\u540d: haha, \u5bc6\u7801: 213213"),"\u76f4\u63a5\u767b\u5f55. \u4e5f\u53ef\u4ee5\u6ce8\u518c\u5c1d\u8bd5")))}a(100);function d(){return c.a.createElement("div",{className:"create_content"},c.a.createElement("div",{className:"create_item"},c.a.createElement("img",{src:"/static/vote1.png",alt:"vote1"}),c.a.createElement(p.b,{to:"/create-vote"},c.a.createElement("div",{className:"create_item_btn"},"\u521b\u5efa\u5355\u9009"))),c.a.createElement("div",{className:"create_item"},c.a.createElement("img",{src:"/static/vote2.png",alt:"vote2"}),c.a.createElement(p.b,{to:"/create-vote?multiple=1"},c.a.createElement("div",{className:"create_item_btn"},"\u521b\u5efa\u591a\u9009"))))}a(101);function b(e){var t=e.userInfo,a=e.setUserInfo,l=window.localStorage,r=Object(s.g)(),i=Object(n.useState)([]),m=Object(o.a)(i,2),E=m[0],d=m[1];function b(){return(b=Object(f.a)(v.a.mark((function e(t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.post("/delete-vote",{voteId:t});case 2:a=e.sent,d(a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(f.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("/myvotes");case 2:t=e.sent,d(t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),c.a.createElement("div",null,c.a.createElement("ul",null,E.map((function(e,a){var n=new Date(e.deadline)<Date.now();return c.a.createElement("li",{className:"create_vote_list myvote_list",key:a},c.a.createElement(p.b,{className:"vote_link",to:"/vote/".concat(e.id)},c.a.createElement("span",null,e.title),n&&c.a.createElement("span",{style:{color:"rgba(230,0,18,0.4)",fontSize:"14px"}},"(\u5df2\u8fc7\u671f)")),t&&e&&e.userId===t.id&&c.a.createElement("button",{className:"delete_vote",onClick:function(){return function(e){return b.apply(this,arguments)}(e.id)}},"\u5220\u9664"))}))),c.a.createElement("button",{className:"finish_btn",onClick:function(){u.a.get("/logout").then((function(){a(null)})),l.clear(),r.push("/login")}},"\u767b\u51fa"))}a(102),a(35);function h(e){var t=e.userInfo,a=e.setUserInfo,n=Object(s.j)(),l=(n.path,n.url);return c.a.createElement("div",null,c.a.createElement("div",{className:"title"},"VoteDemo"),c.a.createElement(s.b,{path:"".concat(l,"/"),exact:!0},c.a.createElement(s.a,{to:"".concat(l,"/create")})),c.a.createElement(s.b,{path:"".concat(l,"/create")},c.a.createElement(d,null)),c.a.createElement(s.b,{path:"".concat(l,"/my")},c.a.createElement(b,{userInfo:t,setUserInfo:a})),c.a.createElement("div",{className:"navbar"},c.a.createElement("div",{className:"navbar_item"},c.a.createElement("div",null,c.a.createElement(p.c,{activeClassName:"active",to:"".concat(l,"/create")},c.a.createElement("i",{className:"iconfont icon-xinjian1"}),c.a.createElement("br",null),"\u65b0\u5efa"))),c.a.createElement("div",{className:"navbar_item"},c.a.createElement("div",null,c.a.createElement(p.c,{to:"".concat(l,"/my")},c.a.createElement("i",{className:"iconfont icon-wodedangxuan"}),c.a.createElement("br",null),"\u6211\u7684")))))}var g=a(17),_=a(131),N=a(127),w=a(130),j=(a(60),a(128));a(103);function O(){var e=new URLSearchParams(Object(s.h)().search),t=Object(s.g)(),a=Object(_.a)(["",""]),n=Object(N.a)(),l=Object(N.a)(),r=Object(N.a)(),o=Object(w.a)(),i=Object(w.a)("1"==e.get("multiple"));function m(){return(m=Object(f.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.post("/vote",{title:n.value,desc:l.value,options:a.value,deadline:new Date(r.value).toISOString(),anonymous:o.value?1:0,isMultiple:i.value?1:0});case 3:alert("\u521b\u5efa\u6210\u529f"),t.push("/home"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("\u521b\u5efa\u5931\u8d25");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return c.a.createElement("div",null,c.a.createElement("div",{className:"title"},c.a.createElement("span",null,c.a.createElement("i",{onClick:function(){t.goBack()},className:"iconfont icon-fanhui"})),"\xa0\u521b\u5efa\u6295\u7968"),c.a.createElement("div",{className:"createVote_content"},c.a.createElement("div",null,c.a.createElement("input",{className:"vote_title",value:n.value,onChange:n.onChange,type:"text",placeholder:"\u6295\u7968\u6807\u9898"})),c.a.createElement("div",null,c.a.createElement("input",{className:"vote_item",value:l.value,onChange:l.onChange,type:"text",placeholder:"\u8865\u5145\u63cf\u8ff0 [\u9009\u586b]"})),c.a.createElement("ul",{className:"vote_ul"},a.value.map((function(e,t){return c.a.createElement("li",{className:"create_vote_list",key:t},c.a.createElement("button",{className:"create_vote_btn",onClick:function(){return function(e){2!=a.length&&(a.removeIndex(e),2==a.length&&i.setTrue())}(t)}},c.a.createElement("span",null,"-")),c.a.createElement("input",{className:"create_vote_text",type:"text",value:e,onChange:function(e){return a.setValue([].concat(Object(g.a)(a.value.slice(0,t)),[e.target.value],Object(g.a)(a.value.slice(t+1))))}}))}))),c.a.createElement("div",{className:"create_vote_list"},c.a.createElement("button",{className:"create_vote_btn vote_add",onClick:function(){a.push(""),i.setFalse()}},c.a.createElement("span",null,"+")),c.a.createElement("span",null,"\u6dfb\u52a0\u9009\u9879")),c.a.createElement("div",{className:"create_vote_list create_vote_space"},"\u622a\u6b62\u65e5\u671f: ",c.a.createElement("input",{className:"deadline",value:r.value,onChange:r.onChange,type:"datetime-local"})),c.a.createElement("div",{className:"create_vote_list create_vote_select"},c.a.createElement("div",null,"\u533f\u540d\u6295\u7968: "),c.a.createElement(j.a,{className:"switch_btn",onChange:o.toggle,checked:o.checked})),c.a.createElement("div",{className:"create_vote_list create_vote_select"},c.a.createElement("div",null,"\u591a\u9009: "),c.a.createElement(j.a,{className:"switch_btn",checked:i.value,onChange:i.toggle}))),c.a.createElement("div",null,c.a.createElement("button",{className:"finish_btn",onClick:function(){return m.apply(this,arguments)}},"\u521b\u5efa")))}var y=a(48),k=a(71),x=a(129),I=(a(121),window.location);console.log(I.origin);var S=I.origin;function C(e){var t=e.userInfo,a=S.replace(/https?/,"ws"),l=Object(s.g)(),r=Object(s.i)().id,i=Object(n.useState)(!0),m=Object(o.a)(i,2),p=m[0],E=m[1],d=Object(n.useState)(null),b=Object(o.a)(d,2),h=b[0],g=b[1];if(!p&&h)var _=Object(k.groupBy)(h.votings,"optionId"),N=new Set(h.votings.map((function(e){return e.userId}))).size;function w(){return(w=Object(f.a)(v.a.mark((function e(t,a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(Date.now()>new Date(h.deadline).getTime())){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,u.a.post("/voteup/".concat(r),{optionId:t,isVoteDown:a});case 4:e.sent;case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e,t){return t?(100*e/t).toFixed(2):0}return Object(n.useEffect)((function(){function e(){return(e=Object(f.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(null),E(!1),e.next=4,u.a.get("/vote/".concat(r)).then((function(e){g(e.data),E(!1)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[r]),Object(n.useEffect)((function(){if(h&&Date.now()<new Date(h.deadline).getTime()){var e=new WebSocket("".concat(a,"/vote/").concat(r));return e.onmessage=function(e){var t=JSON.parse(e.data);g(Object(y.a)(Object(y.a)({},h),{},{votings:t}))},function(){return e.close()}}}),[h]),h?c.a.createElement("div",null,c.a.createElement("div",{className:"title"},c.a.createElement("i",{onClick:function(){l.goBack()},className:"iconfont icon-fanhui"}),"\xa0\u6295\u7968\u7ed3\u679c"),c.a.createElement("div",{className:"voteInfo_title"},c.a.createElement("h2",null,h.title),c.a.createElement("div",null,c.a.createElement(x.a,null))),c.a.createElement("p",{className:"voteInfo_desc"},h.desc?h.desc:"\u7a7a",c.a.createElement("span",null,h.isMultiple?"[\u5355\u9009]":"[\u591a\u9009]")),c.a.createElement("ul",null,h.options.map((function(e){e.userId;var a=_[e.id]?_[e.id]:[],n=!!a.find((function(e){return e.userId===t.id}));return c.a.createElement("li",{className:"voteInfo_content",key:e.id,onClick:function(){return function(e,t){return w.apply(this,arguments)}(e.id,n)}},c.a.createElement("span",{className:"option-text"},e.content)," ",n&&c.a.createElement("i",{className:"iconfont icon-gou"}),c.a.createElement("strong",null," ",a.length," \u7968 ","  "," ",j(a.length,N),"%"),c.a.createElement("div",{className:"option-ratio",style:{width:j(a.length,N)+"%"}}),c.a.createElement("ul",{className:"avatars"},a.map((function(e,t){return c.a.createElement("li",{key:t},c.a.createElement("img",{className:"avatar",src:e.avatar}))}))))}))),c.a.createElement("p",{className:"deadline_tip"},"\u6295\u7968\u622a\u81f3\uff1a",new Date(h.deadline).toLocaleString())):c.a.createElement("div",null,"loading...")}var D=function(){window.localStorage;var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=(t[0],t[1]),l=Object(n.useRef)(),r=Object(n.useRef)(),i=Object(s.g)();function m(){return(m=Object(f.a)(v.a.mark((function e(t){var n,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n={name:l.current.value,password:r.current.value},e.prev=2,e.next=5,u.a.post("/register",n);case 5:-1!=(c=e.sent).data.code&&(alert("\u6ce8\u518c\u6210\u529f"),a(c.data.currentUsername),i.push("/login")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert(e.t0.response.data.msg.toString());case 12:case"end":return e.stop()}}),e,null,[[2,9]])})))).apply(this,arguments)}return c.a.createElement("div",null,c.a.createElement("div",{className:"title"},c.a.createElement("span",null,"\u6ce8\u518c\u9875\u9762")),c.a.createElement("h2",{className:"login_nav"},"\u7528\u6237\u6ce8\u518c"),c.a.createElement("form",{className:"login_form",onSubmit:function(e){return m.apply(this,arguments)}},c.a.createElement("div",{className:"login_form_item"},c.a.createElement("div",null,"\u7528\u6237\u540d\uff1a"),c.a.createElement("div",null,c.a.createElement("input",{className:"login_form_input",ref:l,type:"text"}))),c.a.createElement("div",{className:"login_form_item"},c.a.createElement("div",null,"\u5bc6\u7801\uff1a"),c.a.createElement("div",null,c.a.createElement("input",{className:"login_form_input",ref:r,type:"password"}))),c.a.createElement("button",{className:"finish_btn"},"\u6ce8\u518c"),c.a.createElement(p.b,{to:"/login"},c.a.createElement("button",{className:"finish_btn"},"\u8fd4\u56de\u767b\u5f55"))))};var U=function(){var e=Object(s.g)(),t=Object(n.useState)(void 0),a=Object(o.a)(t,2),l=a[0],r=a[1];return window.setUserInfo=r,console.log(S),Object(n.useEffect)((function(){u.a.get("/userInfo").then((function(e){window.user=e.data,console.log("userInfo",e.data),r(e.data)}))}),[]),l||e.push("/login"),c.a.createElement("div",{className:"App"},c.a.createElement(s.d,null,c.a.createElement(s.b,{path:"/",exact:!0},c.a.createElement(s.a,{to:"/home"})),c.a.createElement(s.b,{path:"/login"},c.a.createElement(E,{setUserInfo:r,userInfo:l})),c.a.createElement(s.b,{path:"/register"},c.a.createElement(D,null)),c.a.createElement(s.b,{path:"/home"},c.a.createElement(h,{userInfo:l,setUserInfo:r})),c.a.createElement(s.b,{path:"/create-vote"},c.a.createElement(O,null)),c.a.createElement(s.b,{path:"/vote/:id"},l&&c.a.createElement(C,{userInfo:l}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p.a,null,c.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},35:function(e,t,a){},59:function(e,t,a){},72:function(e,t,a){e.exports=a(122)},77:function(e,t,a){},78:function(e,t,a){}},[[72,1,2]]]);
//# sourceMappingURL=main.fc533f25.chunk.js.map