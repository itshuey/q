(this["webpackJsonpq-client"]=this["webpackJsonpq-client"]||[]).push([[0],{107:function(e,t,a){},111:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(48),r=a.n(s),o=(a(58),a(51)),u=a(49),c=a(4),l=a(5),m=a(1),d=a(6),h=a(7),f=a(112),p=a(50),v=a.n(p),g=a(23),E=a.n(g),S=(a(13),a(8)),b=a.n(S),k=(a(47),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onDeleteClick=n.onDeleteClick.bind(Object(m.a)(n)),n}return Object(l.a)(a,[{key:"onDeleteClick",value:function(){var e=this;b.a.delete("/api/qitems/"+this.props.item._id).then((function(t){e.props.updateInfo()})).catch((function(e){console.log(e.message),console.log("Error from QueueItem_deleteClick")}))}},{key:"render",value:function(){var e=this.props.item.name,t=this.props.index,a=new Date(this.props.item.time),n=t+". "+e,s=a.getMinutes();s<=9&&(s="0"+s);var r=(this.props.timeZone+a.getHours())%12;r||(r=12);var o=r+":"+s,u=i.a.createElement("div",{className:"Queue-item-delete Clickable",onClick:this.onDeleteClick}," x "),c=i.a.createElement("div",{className:"Queue-item-empty-delete"}," ~ ");return i.a.createElement("div",{className:"Queue-item "+this.props.status},i.a.createElement("div",{className:"Queue-item-name"},n),i.a.createElement("div",{className:"Queue-item-tail"},i.a.createElement("div",{className:"Queue-item-date"},o),this.props.canDelete?u:c))}}]),a}(n.Component)),N=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={queue:[]},n}return Object(l.a)(a,[{key:"render",value:function(){var e,t=this,a=this.props.queueInfo;a&&(e=a.filter((function(e){return["active","in-progress","finished"].includes(e.status)})));var n="n/a",s="n/a";return e&&(n=e.filter((function(e){return"quick"===e.type})).map((function(e,a){return i.a.createElement(k,{status:e.status,canDelete:t.props.isAdmin||e.user_id===t.props.userID,index:a+1,item:e,key:e._id,timeZone:t.props.timeZone})})),s=e.filter((function(e){return"normal"===e.type})).map((function(e,a){return i.a.createElement(k,{status:e.status,canDelete:t.props.isAdmin||e.user_id===t.props.userID,index:a+1,item:e,key:e._id,timeZone:t.props.timeZone,updateInfo:t.props.updateInfo})}))),i.a.createElement("div",{className:"Queues"},i.a.createElement("div",{className:"Queue"},i.a.createElement("div",{className:"Queue-title"},"QUICK QUEUE"),n),i.a.createElement("div",{className:"Queue"},i.a.createElement("div",{className:"Queue-title"},"NORMAL QUEUE"),s))}}]),a}(n.Component),I=(a(107),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).state={timerOn:!1,timerStart:0,timerTime:0},e.handleTimer=function(){e.props.beingServed?e.stopTimer():e.startTimer()},e.startTimer=function(){e.setState({timerOn:!0,timerTime:e.state.timerTime,timerStart:Date.now()-e.state.timerTime}),e.timer=setInterval((function(){e.setState({timerTime:Date.now()-e.state.timerStart})}),10)},e.stopTimer=function(){e.setState({timerOn:!1}),clearInterval(e.timer)},e.resetTimer=function(){e.setState({timerStart:0,timerTime:0})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.handleTimer()}},{key:"componentWillUnmount",value:function(){this.stopTimer(),this.resetTimer()}},{key:"render",value:function(){var e=this.state.timerTime,t=("0"+Math.floor(e/10)%100).slice(-2),a=("0"+Math.floor(e/1e3)%60).slice(-2),n=Math.floor(e/6e4)%60,s=a+":"+t;return n&&(s=n+":"+s),i.a.createElement("div",{className:"Stopwatch"},i.a.createElement("div",{className:"Stopwatch-header"},"ELLAPSED"),i.a.createElement("div",{className:"Stopwatch-display"},s))}}]),a}(n.Component));function y(){var e=Object(u.a)([""]);return y=function(){return e},e}var C=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(c.a)(this,a),n=t.call(this,e);var i=e.cookies;return n.state={showLandingPage:!0,showSettingsPanel:!1,showInformationPanel:!1,isAdmin:!1,inQueue:!1,processing:!1,timeZone:0,name:i.get("name")||"",userID:i.get("user_id")||"",socket:v()("http://localhost:8080")},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(m.a)(n)),n.handleNewName=n.handleNewName.bind(Object(m.a)(n)),n.handleDQ=n.handleDQ.bind(Object(m.a)(n)),n.handleFinish=n.handleFinish.bind(Object(m.a)(n)),n.enterQueue=n.enterQueue.bind(Object(m.a)(n)),n.renderIntro=n.renderIntro.bind(Object(m.a)(n)),n.renderMain=n.renderMain.bind(Object(m.a)(n)),n.updateQueueInfo=n.updateQueueInfo.bind(Object(m.a)(n)),n.updateStatus=n.updateStatus.bind(Object(m.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.updateQueueInfo();var t=this.props.cookies;if(!t.get("user_id")){var a=Object(o.a)(Array(10)).map((function(e){return(36*Math.random()|0).toString(36)})).join(y());t.set("user_id",a,{path:"/"}),this.setState({userID:a})}this.state.socket.on("outgoing data",(function(t){console.log("Recieved express socket ping."),e.setState({queueInfo:t.info}),t.info.find((function(t){return t.user_id===e.state.userID&&"done"!==t.status}))||e.setState({inQueue:!1}),t.info.find((function(t){return t.user_id===e.state.userID&&("in-progress"===t.status||"finished"===t.status)}))}))}},{key:"enterQueue",value:function(){var e=this,t=this.props.cookies,a={name:this.state.name,user_id:t.get("user_id")||888};b.a.post("/api/qitems",a).then((function(t){e.updateQueueInfo(),e.setState({inQueue:!0})})).catch((function(e){console.log(e.message),console.log("Error in create!")}))}},{key:"updateQueueInfo",value:function(){var e=this;b.a.get("/api/qitems").then((function(t){e.setState({queueInfo:t.data}),e.state.socket.emit("incoming data",t.data),t.data.find((function(t){return t.user_id===e.state.userID&&"active"===t.status}))||e.setState({inQueue:!1})})).catch((function(e){console.log(e.message),console.log("Error from updateQueueInfo")}))}},{key:"handleChange",value:function(e){this.setState({name:e.target.value})}},{key:"handleNewName",value:function(e){var t=this;this.state.queueInfo&&this.state.queueInfo.filter((function(t){return t.user_id===e})).forEach((function(e,a){var n={name:t.state.name,user_id:e.user_id,type:e.type,status:e.status};b.a.put("/api/qitems/"+e._id,n).then((function(e){console.log("Updated!"),t.updateQueueInfo()})).catch((function(e){console.log("Error in handleNewName!")}))}))}},{key:"updateStatus",value:function(e,t){var a=this,n={name:e.name,user_id:e.user_id,type:e.type,status:t};b.a.put("/api/qitems/"+e._id,n).then((function(e){console.log("Updated!"),a.updateQueueInfo()})).catch((function(e){console.log("Error in updateStatus!")}))}},{key:"handleDQ",value:function(){if(this.state.queueInfo){var e=this.state.queueInfo.find((function(e){return"active"===e.status}));e&&this.updateStatus(e,"in-progress")}}},{key:"handleFinish",value:function(){var e=this;if(this.state.queueInfo){var t=this.state.queueInfo.find((function(e){return"in-progress"===e.status}));t&&(this.updateStatus(t,"finished"),setTimeout((function(){return e.updateStatus(t,"done")}),500))}}},{key:"handleSubmit",value:function(e){var t=this.props.cookies;this.setState({showLandingPage:!1}),"q-admin"!==this.state.name||this.state.isAdmin?this.state.isAdmin&&this.setState({isAdmin:!1}):this.setState({isAdmin:!0}),this.state.name||this.setState({name:t.get("name")||"Anonymous"}),this.state.name!==t.get("name")&&(this.handleNewName(t.get("user_id")),t.set("name",this.state.name,{path:"/"})),e.preventDefault()}},{key:"renderIntro",value:function(){var e=i.a.createElement("form",{className:"Name-form",onSubmit:this.handleSubmit},i.a.createElement("label",null,"Hi, I'm",i.a.createElement("input",{className:"Landing-name-text",type:"text",placeholder:this.state.name,value:this.state.value,onChange:this.handleChange})),i.a.createElement("input",{className:"Landing-name-submit",type:"submit",value:"<Enter>"}));return i.a.createElement("div",{className:"Entry"},i.a.createElement("div",{className:"Welcome"},"WELCOME TO THE QUEUE."),e)}},{key:"renderMain",value:function(){var e,t=this;e=this.state.isAdmin?i.a.createElement("div",{className:"Side-panel"},this.state.queueInfo.find((function(e){return"done"!==e.status}))&&(this.state.processing?i.a.createElement(I,null):i.a.createElement("div",{className:"Dequeue",onClick:function(){t.setState({processing:!0}),t.handleDQ()}},"DQ Next Student")),this.state.processing&&i.a.createElement("div",{className:"Finish",onClick:function(){t.setState({processing:!1}),t.handleFinish()}},"Finish current student"),i.a.createElement("div",{className:"Manage-settings Clickable",onClick:function(){return t.setState({showSettingsPanel:!0,showInformationPanel:!1})}},"Manage Settings"),i.a.createElement("div",{className:"Help Clickable",onClick:function(){return t.setState({showInformationPanel:!0,showSettingsPanel:!1})}},"More Information")):i.a.createElement("div",{className:"Side-panel"},this.state.inQueue?i.a.createElement(I,null):i.a.createElement("div",{className:"Enter-queue Clickable",onClick:this.enterQueue},"Enter The Queue"),i.a.createElement("div",{className:"Manage-settings Clickable",onClick:function(){return t.setState({showSettingsPanel:!0,showInformationPanel:!1})}},"Manage Settings"),i.a.createElement("div",{className:"Help Clickable",onClick:function(){return t.setState({showInformationPanel:!0,showSettingsPanel:!1})}},"More Information"));var a=null;return this.state.showSettingsPanel?a=i.a.createElement("div",{className:"Side-panel"},i.a.createElement("div",{className:"Settings"},i.a.createElement("form",{className:"Settings-name-form",onSubmit:this.handleSubmit},i.a.createElement("label",null,"Name:",i.a.createElement("input",{className:"Settings-name-text",placeholder:this.state.name,type:"text",value:this.state.value,onChange:this.handleChange})),i.a.createElement("input",{className:"Settings-name-submit",type:"submit",value:"<Save>"})),i.a.createElement("div",{className:"Back Clickable",onClick:function(){return t.setState({showSettingsPanel:!1})}},"Back"))):this.state.showInformationPanel&&(a=i.a.createElement("div",{className:"Side-panel"},i.a.createElement("div",null,"Q is a queueing app made by Huey. ",i.a.createElement("br",null),"Created with a ",i.a.createElement("b",null,"MERN")," stack."),i.a.createElement("div",{className:"Back Clickable",onClick:function(){return t.setState({showInformationPanel:!1})}},"Back"))),i.a.createElement("div",{className:"Main"},i.a.createElement(N,{isAdmin:this.state.isAdmin,userID:this.state.userID,queueInfo:this.state.queueInfo,timeZone:this.state.timeZone,updateInfo:this.updateQueueInfo}),e,a)}},{key:"render",value:function(){var e=this,t=i.a.createElement("header",{className:"App-header"},i.a.createElement("img",{src:E.a,className:"App-logo Clickable",alt:"logo",onClick:function(){return e.setState({showLandingPage:!0})}}),i.a.createElement("div",{className:"Session-details"},i.a.createElement("div",{className:"Session-details-instructor"},"Huey Sun"),i.a.createElement("div",{className:"Session-details-time"},"CS62 6-8PM"),this.state.isAdmin&&i.a.createElement("div",{className:"Session-details-admin"},"ADMIN MODE"))),a=i.a.createElement("div",{className:"Welcome-logo"},i.a.createElement("img",{src:E.a,className:"App-logo-main",alt:"logo"}));return i.a.createElement("div",{className:"App"},this.state.showLandingPage?a:t,i.a.createElement("div",{className:"Content"},this.state.showLandingPage?this.renderIntro():this.renderMain()))}}]),a}(i.a.Component),Q=Object(f.a)(C),w=a(113);function O(){return i.a.createElement(w.a,null,i.a.createElement(Q,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},13:function(e,t,a){},23:function(e,t,a){e.exports=a.p+"static/media/q.811fbfd1.png"},47:function(e,t,a){},53:function(e,t,a){e.exports=a(111)},58:function(e,t,a){},88:function(e,t){}},[[53,1,2]]]);
//# sourceMappingURL=main.a8d5e70f.chunk.js.map