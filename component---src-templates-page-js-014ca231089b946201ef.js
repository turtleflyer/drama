(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{167:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c}),n.d(t,"query",function(){return p});n(45),n(102),n(67),n(44),n(106);var r=n(8),i=n.n(r),o=n(12),a=n(0),s=n.n(a),l=n(62),u=n.n(l),d=n(180),c=function(e){function t(t){var r,i=(r=e.call(this,t)||this).props.data.markdownRemark.frontmatter.inject;return r.inject=i,r.pieces=i&&i.map(function(e){return n(217)("./"+e+".js")}),r}i()(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=this;this.inject&&Promise.all(this.pieces).then(function(t){t.forEach(function(t,n){var r=t.default,i=e.markdownContainer.querySelector("#"+e.inject[n]);u.a.render(Object(o.d)(r,null),i)})})},r.render=function(){var e=this,t=this.props.data.markdownRemark,n=t.html,r=t.fields.sectionPath;return Object(o.d)(s.a.Fragment,null,Object(o.d)(d.a,{active:r},Object(o.d)("div",{dangerouslySetInnerHTML:{__html:n},ref:function(t){e.markdownContainer=t}})))},t}(s.a.Component),p="313246118"},173:function(e,t,n){var r;e.exports=(r=n(176))&&r.default||r},175:function(e){e.exports={data:{site:{siteMetadata:{title:"Drama"}}}}},176:function(e,t,n){"use strict";n.r(t);n(66);var r=n(0),i=n.n(r),o=n(5),a=n.n(o),s=n(74),l=function(e){var t=e.location,n=e.pageResources;return n?i.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json)):null};l.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},t.default=l},178:function(e){e.exports={data:{allMarkdownRemark:{edges:[{node:{fields:{sectionPath:"/examples/"},frontmatter:{title:"",parentTitle:"Examples",orderIndex:0,noContent:!0}}},{node:{fields:{sectionPath:"/examples/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/examples/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/"},frontmatter:{title:"",parentTitle:"Test Section",orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test12/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test14/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test15/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test16/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test11/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test17/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test13/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test10/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test19/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test20/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test18/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test2/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test21/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test7/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test9/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test5/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test6/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test8/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test22/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test3/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test4/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}}]}}}},179:function(e,t,n){n(105),n(69),e.exports={removeSectionsPartFromPath:function(e){return e.replace("/sections","")},extractBeforeFirstSlash:function(e){return e.match(/\/.*?\//)[0]}}},180:function(e,t,n){"use strict";var r=n(12),i=n(175),o=n(0),a=n.n(o),s=n(5),l=n.n(s),u=n(42),d=n.n(u),c=(n(173),a.a.createContext({}));function p(e){var t=e.staticQueryData,n=e.data,i=e.query,o=e.render,s=n?n.data:t[i]&&t[i].data;return Object(r.d)(a.a.Fragment,null,s&&o(s),!s&&Object(r.d)("div",null,"Loading (StaticQuery)"))}var f=function(e){var t=e.data,n=e.query,i=e.render,o=e.children;return Object(r.d)(c.Consumer,null,function(e){return Object(r.d)(p,{data:t,query:n,render:i||o,staticQueryData:e})})};f.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func};var m=n(238),h=n(237),b=n(172),g=function(e,t){void 0===e&&(e="div");var n=void 0===t?{}:t,i=n.addContainerStyle,o=n.addBoxStyle,a=Object(b.a)("div",{target:"ex5gman0"})("display:flex;justify-content:center;",i),s=Object(b.a)(e,{target:"ex5gman1"})("width:960px;justify-content:center;display:flex;align-items:center;",o),u=function(e){var t=e.children;return Object(r.d)(a,null,Object(r.d)(s,null,t))};return u.propTypes={children:l.a.oneOfType([l.a.arrayOf(l.a.node),l.a.node])},u.defaultProps={children:[]},u},y=g("header",{addContainerStyle:{name:"1kp5zft",styles:"background:rebeccapurple;margin-bottom:1.45rem;position:fixed;width:100%;top:0;left:0;z-index:17;"},addBoxStyle:{name:"irtz8t",styles:"height:5rem;"}}),v={name:"1i2z6sa",styles:"display:block;margin:0;"},x={name:"mv5f6b",styles:"color:white;text-decoration:none;"};function O(e){var t=e.siteTitle;return Object(r.d)(y,null,Object(r.d)("h1",{css:v},Object(r.d)(d.a,{to:"/",css:x},t)))}O.propTypes={siteTitle:l.a.string},O.defaultProps={siteTitle:""};var T=n(43),j=n.n(T),w=(n(66),n(102),n(67),n(44),n(181),n(177),n(182),n(178)),C=n(179),k={name:"3dr502",styles:"position:fixed;height:100%;"},E={name:"fgijvt",styles:"position:sticky;height:calc(100vh - 5rem);top-margin:5rem;"},P=Object(b.a)("nav",{target:"e1bc26kg0"})("width:180px;flex:initial;z-index:15;top:5rem;left:0;padding-top:1rem;background-color:white;overflow-y:auto;",function(e){return e.fixed?k:E}),S=Object(b.a)("div",{target:"e1bc26kg1"})({name:"1lejymi",styles:"text-transform:uppercase;"}),I=Object(b.a)("span",{target:"e1bc26kg2"})({name:"1ooq9a1",styles:"color:#d64444;"});function R(e){return Object.keys(e).sort(function(t,n){return e[t].orderIndex-e[n].orderIndex})}function M(e){var t=e.data,n=e.active,i=e.fixed,o=t.allMarkdownRemark.edges.reduce(function(e,t){var n,r=t.node,i=r.frontmatter,o=i.parentTitle,a=i.title,s=i.orderIndex,l=i.noContent,u=r.fields.sectionPath;if(0===u.length)return e;var d,c=Object(C.extractBeforeFirstSlash)(u),p=e[c]||{subsections:{}};if(o)n=Object.assign({},e,((d={})[u]=Object.assign({},p,{parentTitle:o,orderIndex:s,noContent:l&&!0}),d));else if(a){var f,m;n=Object.assign({},e,((m={})[c]=Object.assign({},p,{subsections:Object.assign({},p.subsections,(f={},f[u]={title:a,orderIndex:s},f))}),m))}return n},{}),a=Object(r.d)("ul",null,R(o).map(function(e){var t=o[e],i=t.parentTitle,a=t.subsections,s=t.noContent;return Object(r.d)("li",{key:e},Object(r.d)("ul",null,Object(r.d)(S,null,s?i:Object(r.d)(d.a,{to:e},e===n?Object(r.d)(I,null,i):i)),R(a).map(function(e){return Object(r.d)("li",{key:e},Object(r.d)(d.a,{to:e},e===n?Object(r.d)(I,null,a[e].title):a[e].title))})))}));return Object(r.d)(P,{fixed:i},a)}M.propTypes={data:l.a.shape({allMarkdownRemark:l.a.shape({edges:l.a.arrayOf(l.a.shape({node:l.a.shape({fields:l.a.shape({sectionPath:l.a.string.isRequired}).isRequired,frontmatter:l.a.shape({title:l.a.string.isRequired}).isRequired}).isRequired}).isRequired).isRequired}).isRequired}).isRequired};var B=function(e){return Object(r.d)(f,{query:"3295447902",render:function(t){return Object(r.d)(M,j()({data:t},e))},data:w})},z=g("footer",{addBoxStyle:{name:"hmxpft",styles:"display:block;text-align:center;padding-left:180px;padding-bottom:1rem;"}});function D(e){var t=e.children;return Object(r.d)(z,null,t)}D.propTypes={children:s.PropTypes.oneOfType([s.PropTypes.arrayOf(s.PropTypes.node),s.PropTypes.node])},D.defaultProps={children:[]};n(103),n(104);var F=Object(o.createContext)({sideBarOpen:!1,scrollY:null}),q=Object(o.createContext)(function(){return null}),K=Symbol("@slideSideBar/OPEN_SIDE_BAR"),A=Symbol("@slideSideBar/CLOSE_SIDE_BAR"),Q=function(e,t){switch(t.type){case K:return Object.assign({},e,{sideBarOpen:!0,scrollY:window.scrollY});case A:return Object.assign({},e,{sideBarOpen:!1});default:return e}},N=function(e){var t=e.children,n=Object(o.useReducer)(Q,{sideBarOpen:!1}),i=n[0],a=n[1];return Object(r.d)(F.Provider,{value:i},Object(r.d)(q.Provider,{value:a},t))},_=Object(b.a)("div",{target:"eygulds0"})({name:"1qzukwv",styles:"z-index:20;position:fixed;left:0;"}),H=function(e){var t=e.sideBarOpen,n=e.openSideBarCallback,i=e.closeSideBarCallback;return t?Object(r.d)(_,{onClick:i},"O"):Object(r.d)(_,{onClick:n},"C")},W=function(e){var t=e.active,n=[Object(o.useContext)(F),Object(o.useContext)(q)],i=n[1],s=n[0].sideBarOpen,l=Object(o.useCallback)(function(e){return function(){i({type:e})}},[i]);return Object(r.d)(a.a.Fragment,null,s?Object(r.d)(B,j()({active:t},{fixed:!0})):null,Object(r.d)(H,{sideBarOpen:s,openSideBarCallback:l(K),closeSideBarCallback:l(A)}))},L={name:"123o6s3",styles:"html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block;}audio,canvas,progress,video{display:inline-block;}audio:not([controls]){display:none;height:0;}progress{vertical-align:baseline;}[hidden],template{display:none;}a{background-color:transparent;-webkit-text-decoration-skip:objects;}a:active,a:hover{outline-width:0;}img{border-style:none;}svg:not(:root){overflow:hidden;}figure{margin:1em 40px;}hr{box-sizing:content-box;height:0;overflow:visible;}button,input,optgroup,select,textarea{font:inherit;margin:0;}optgroup{font-weight:700;}button,input{overflow:visible;}button,select{text-transform:none;}[type='reset'],[type='submit'],button,html [type='button']{-webkit-appearance:button;}[type='button']::-moz-focus-inner,[type='reset']::-moz-focus-inner,[type='submit']::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0;}[type='button']:-moz-focusring,[type='reset']:-moz-focusring,[type='submit']:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText;}fieldset{border:1px solid silver;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}textarea{overflow:auto;}[type='checkbox'],[type='radio']{box-sizing:border-box;padding:0;}[type='number']::-webkit-inner-spin-button,[type='number']::-webkit-outer-spin-button{height:auto;}[type='search']{-webkit-appearance:textfield;outline-offset:-2px;}[type='search']::-webkit-search-cancel-button,[type='search']::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-input-placeholder{color:inherit;opacity:0.54;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}html{box-sizing:border-box;overflow-y:scroll;}*{box-sizing:inherit;}*:before{box-sizing:inherit;}*:after{box-sizing:inherit;}body{color:hsla(0,0%,0%,0.8);word-wrap:break-word;}img{max-width:100%;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;margin-bottom:1.45rem;}nav{color:#a0a0a0;}nav a{color:#742a86;text-decoration:none;}nav ul{list-style:none;margin:0.7em 0;}nav li{margin:0 0 0.3em 0.4em;}"},Y=function(){return Object(r.d)(r.a,{styles:L})},G=g("div",{addContainerStyle:{name:"1k82u0d",styles:"margin-top:5rem;min-width:768px;min-height:75vh;"},addBoxStyle:{name:"1jfvg9w",styles:"align-items:flex-start;"}}),J={name:"1etxbbi",styles:"top:0;"},U={name:"196jqjz",styles:"width:0;"},X=function(e){var t=e.children,n=Object(o.useContext)(F),i=n.sideBarOpen,a=n.scrollY;return Object(o.useEffect)(function(){i||null===a||window.scrollTo(0,a)},[i,a]),Object(r.d)("main",{css:Object(r.c)("margin:1rem auto 0;padding:0px 1.3rem 1.5rem;flex:1;z-index:10;",i?Object(r.c)("position:fixed;width:100%;",a?Object(r.c)("top:calc(5rem - ",a,"px);"):J):U)},t)},V=function(e){var t=e.children,n=e.active;return Object(r.d)(f,{query:"755544856",render:function(e){return Object(r.d)(m.a,null,Object(r.d)(Y,null),Object(r.d)(N,null,Object(r.d)(h.a.Consumer,null,function(i){return Object(r.d)(a.a.Fragment,null,Object(r.d)(O,{siteTitle:e.site.siteMetadata.title}),Object(r.d)(G,null,"small"===i?Object(r.d)(W,{active:n}):Object(r.d)(B,{active:n}),Object(r.d)(X,null,t)),Object(r.d)(D,null,"©",(new Date).getFullYear(),", Built with ",Object(r.d)("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))})))},data:i})};V.propTypes={children:l.a.oneOfType([l.a.arrayOf(l.a.node),l.a.node]),active:l.a.string.isRequired},V.defaultProps={children:[]};t.a=V},185:function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},217:function(e,t,n){var r={"./tic-tac-toe.js":218};function i(e){return o(e).then(function(e){return n.t(e,7)})}function o(e){return Promise.resolve().then(function(){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t})}i.keys=function(){return Object.keys(r)},i.resolve=o,i.id=217,e.exports=i},218:function(e,t,n){if("undefined"!=typeof document){var r=n(219).default,i=n(233).default;e.exports=r(i)}else e.exports=function(){return null}},219:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return l});var r=n(8),i=n.n(r),o=n(12),a=n(0),s=n.n(a);function l(e){return function(t){function n(e){var n;return(n=t.call(this,e)||this).myRef=s.a.createRef(),n}i()(n,t);var r=n.prototype;return r.componentDidMount=function(){this.placeholder.parentNode.replaceChild(e(),this.placeholder)},r.render=function(){var e=this;return Object(o.d)("div",{ref:function(t){e.placeholder=t}})},n}(s.a.Component)}},220:function(e,t,n){var r=n(221),i=n(185),o=n(222),a=n(223);function s(t){var n="function"==typeof Map?new Map:void 0;return e.exports=s=function(e){if(null===e||!o(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,t)}function t(){return a(e,arguments,r(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i(t,e)},s(t)}e.exports=s},221:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},222:function(e,t){e.exports=function(e){return-1!==Function.toString.call(e).indexOf("[native code]")}},223:function(e,t,n){var r=n(185);function i(t,n,o){return!function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?e.exports=i=function(e,t,n){var i=[null];i.push.apply(i,t);var o=new(Function.bind.apply(e,i));return n&&r(o,n.prototype),o}:e.exports=i=Reflect.construct,i.apply(null,arguments)}e.exports=i},224:function(e,t,n){var r=n(14).f,i=Function.prototype,o=/^\s*function ([^ (]*)/;"name"in i||n(10)&&r(i,"name",{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},225:function(e,t,n){"use strict";var r=n(110),i=n(73);e.exports=n(111)("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=r.getEntry(i(this,"Map"),e);return t&&t.v},set:function(e,t){return r.def(i(this,"Map"),0===e?0:e,t)}},r,!0)},233:function(e,t,n){"use strict";n.r(t);var r=n(72),i=n.n(r),o=(n(177),n(66),n(46)),a=n.n(o),s=n(8),l=n.n(s),u=n(220),d=n.n(u),c=(n(45),n(224),n(103),n(104),n(109),n(102),n(67),n(44),n(106),n(225),function(){function e(){var e=this;this.eventsStore=new Map,this.elementsMap=new Map,this.customEventTypes=new Set,this.onAddElementActionsMap=new Map,this.exhaustTypesMap=new Map,this.routine={interpretTarget:function(e){return e}},this.propagationKey=Symbol("propagationKey"),this.nullKey=Symbol("@@eventswork/nullKey"),this.parentKey=Symbol("@@eventswork/parentKey"),this.addElementEventType=Symbol("@@addElement"),this.registerEventType(this.addElementEventType),this.RoleSet=this.invokeRoleSetClass(),this.worker=new this.RoleSet([]),this.fireFromQueueType=Symbol("@@eventswork/fireFromQueue"),this.fireFromQueueId=Symbol("@@eventswork/fireFromQueueId"),this.queueData=[],this.countTypesInQueue=new Map,this.worker.name="@@worker",this.eventChain({roleSet:this.worker,type:this.fireFromQueueType,action:function(){if(e.queueData.length>0){var t=e.queueData.shift(),n=t.target,r=t.type,i=t.event;e.fireEvent(n,r,i);var o=e.countTypesInQueue.get(r)-1;0===o&&e.exhaustTypesMap.has(r)&&(e.exhaustTypesMap.get(r)(r),e.exhaustTypesMap.delete(r)),e.countTypesInQueue.set(r,o),Promise.resolve().then(function(){var t;return e.getCallback(((t={})[e.nullKey]=!0,t[e.parentKey]=e.worker,t),e.fireFromQueueType)()})}}},this.fireFromQueueId),this.defineRoutine=this.defineRoutine.bind(this),this.managePropagation=this.managePropagation.bind(this),this.stopBubbling=this.stopBubbling.bind(this),this.stopPropagatingNested=this.stopPropagatingNested.bind(this),this.setActionOnAddElement=this.setActionOnAddElement.bind(this),this.fireEvent=this.fireEvent.bind(this),this.eventChain=this.eventChain.bind(this),this.waitWhenTypeExhausted=this.waitWhenTypeExhausted.bind(this)}e.getSomeFromDeep=function(e,t,n){var r;return(r=e instanceof Map?e.get(t):e[t])||(r=n(),e instanceof Map?e.set(t,r):e[t]=r),r},e.getFromDeepMap=function(t,n){var r=e.getSomeFromDeep(t,n,function(){return new Map});return{map:r,next:e.getFromDeepMap.bind(null,r)}};var t=e.prototype;return t.defineRoutine=function(e){var t=e.interpretTarget,n=e.defaultPropagation;Object.assign(this.routine,{interpretTarget:t,defaultPropagation:n})},t.registerEventType=function(e){this.customEventTypes.add(e)},t.managePropagation=function(e,t){var n=t.stopBubbling,r=t.stopPropagatingNested;return e[this.propagationKey]||(e[this.propagationKey]={}),Object.assign(e[this.propagationKey],{stopBubbling:n?new Set:null,stopPropagatingNested:r}),e},t.stopBubbling=function(e){return void 0===e&&(e={}),this.managePropagation(e,{stopBubbling:!0}),e.stopPropagatingNested=this.stopPropagatingNested.bind(null,e),e},t.stopPropagatingNested=function(e){return void 0===e&&(e={}),this.managePropagation(e,{stopPropagatingNested:!0}),e.stopBubbling=this.stopBubbling.bind(null,e),e},t.applyDefaultPropagation=function(e){if(!e[this.propagationKey]){e[this.propagationKey]={};var t=this.routine.defaultPropagation;t&&this.managePropagation(e,t)}return e},t.getCallback=function(t,n){var r=this;return function(o){void 0===o&&(o={}),function t(n,o,a,s){var l=s;s||(l=n[r.parentKey]||r.elementsMap.get(n).belong);var u=e.getFromDeepMap(r.eventsStore,l).map;u.has(o)&&i()(u.get(o).entries()).forEach(function(e){var t=e[0];(0,e[1])({target:n,roleSet:n[r.parentKey]||r.elementsMap.get(n).belong,type:o,event:a,eventID:t})});var d=r.elementsMap.get(l);d&&t(n,o,a,d.belong)}(t,n,r.applyDefaultPropagation(o))}},t.addCallback=function(t,n){var r=this.elementsMap.get(t),i=e.getSomeFromDeep(r,"types",function(){return new Set});i.has(n)||(this.routine.interpretTarget(t)&&this.routine.interpretTarget(t).addEventListener(n,this.getCallback(t,n)),i.add(n))},t.addCallbackToChildren=function(t,n){var r=this;t.size>0&&(0===e.getFromDeepMap(this.eventsStore,t).next(n).map.size&&i()(t).forEach(function(e){e instanceof r.RoleSet?r.addCallbackToChildren(e,n):r.addCallback(e,n)}))},t.combineTypes=function(t,n){void 0===n&&(n=[]);var r=n.concat(i()(e.getFromDeepMap(this.eventsStore,t).map.keys()).filter(function(e){return"string"==typeof e})),o=this.elementsMap.get(t);return o&&(r=this.combineTypes(o.belong,r)),r},t.invokeRoleSetClass=function(){var t=this;return function(n){function r(e){var r;return r=n.call(this,e)||this,e&&e.forEach(function(e){t.elementsMap.set(e,{belong:a()(r)})}),t.onAddElementActionsMap.set(a()(r),function(){}),t.eventChain({roleSet:a()(r),type:t.addElementEventType,action:function(){t.onAddElementActionsMap.get(a()(r)).apply(void 0,arguments)}},Symbol("@@elementAdded")),r}l()(r,n);var o=r.prototype;return o.addElement=function(n){if(this.has(n))return this;this.add(n);var i=e.getSomeFromDeep(t.elementsMap,n,function(){return n instanceof r?{}:{types:new Set}});return i.belong&&i.belong.delete(n),i.belong=this,t.combineTypes(this).forEach(function(e){n instanceof r?t.addCallbackToChildren(n,e):t.addCallback(n,e)}),t.fireEvent(new Set([n]),t.addElementEventType,t.managePropagation({},{stopBubbling:!0,stopPropagatingNested:!0})),this},o.deleteElement=function(e){return this.delete(e),t.elementsMap.get(e).belong=null,this},o.addElements=function(e){var t=this;return e.forEach(function(e){return t.addElement(e)}),this},o.clearElements=function(){var e=this;return i()(this).forEach(function(t){return e.deleteElement(t)}),this},r}(d()(Set))},t.setActionOnAddElement=function(e,t){return this.onAddElementActionsMap.set(e,t),e},e.invokePromiseHandle=function(){var e;return{promise:new Promise(function(t){e=t}),promiseHandle:e}},t.waitGroupEvent=function(t,n,r){var i=e.invokePromiseHandle(),o=i.promise,a=i.promiseHandle;return"string"==typeof n&&this.addCallbackToChildren(t,n),e.getFromDeepMap(this.eventsStore,t).next(n).map.set(r,a),o},t.fireEvent=function(e,t,n){var r=this;if(void 0===n&&(n={}),this.applyDefaultPropagation(n),e instanceof Set){var o,a,s;if(e.size>0)a=i()(e);else a=[(s={},s[this.nullKey]=!0,s[this.parentKey]=e,s)];a.forEach(function(e){if(!(n[r.propagationKey].stopPropagatingNested&&e instanceof r.RoleSet)){r.queueData.push({target:e,type:t,event:n});var i=r.countTypesInQueue.get(t);r.countTypesInQueue.set(t,i?i+1:1)}}),this.getCallback(((o={})[this.nullKey]=!0,o[this.parentKey]=this.worker,o),this.fireFromQueueType)()}else this.getCallback(e,t)(n)},t.eventChain=function(e,t){var n=this,r=e.roleSet,i=e.type,o=e.action,a=e.typeRegistered,s=e.checkIfTerminate||function(){return!1},l=Object.assign({},e,{checkIfTerminate:s});a||"string"==typeof i||this.customEventTypes.has(i)||(this.registerEventType(i),l.typeRegistered=!0);var u=t;return t||(u="string"==typeof i?Symbol(i+"-eventID"):Symbol(i.description+"-eventID")),this.waitGroupEvent(r,i,u).then(function(e){var t=e.target,a=e.event;a[n.propagationKey].stopBubbling&&a[n.propagationKey].stopBubbling.has(t)?n.eventChain(l,u):s(e)?n.eventsStore.get(r).get(i).delete(u):(o(e),a[n.propagationKey].stopBubbling&&a[n.propagationKey].stopBubbling.add(t),n.eventChain(l,u))}),t},t.waitWhenTypeExhausted=function(t){var n=t;if("onAddElement"===t&&(n=this.addElementEventType),this.countTypesInQueue.get(n)){var r=e.invokePromiseHandle(),i=r.promise,o=r.promiseHandle;return this.exhaustTypesMap.set(n,o),i}return Promise.resolve()},e}()),p=new c,f=p.RoleSet,m=p.defineRoutine,h=(p.managePropagation,p.stopBubbling,p.stopPropagatingNested,p.setActionOnAddElement),b=(p.fireEvent,p.eventChain),g=(p.waitWhenTypeExhausted,{border:"1px solid black",width:"3rem",height:"3rem",position:"relative",display:"inline-block","background-color":"white"}),y={"background-color":"Khaki"};var v=document.createElement("div");var x=function(e){for(var t=[],n=0;n<9;n++){var r=new e;v.appendChild(r.node),t.push(r),(n+1)%3==0&&v.appendChild(document.createElement("br"))}return t},O={"line-height":"2rem","font-style":"italic",color:"Red","font-size":"1.5rem"},T=document.createElement("div");function j(){for(;T.firstChild;)T.removeChild(T.firstChild)}Object.assign(T.style,{height:"3rem"});var w=function(e){var t=document.createElement("div");t.appendChild(document.createTextNode(e)),Object.assign(t.style,O),j(),T.appendChild(t),window.setTimeout(j,1500)};n(107),n(108);var C=document.createElement("button");C.innerText="Restart",Object.assign(C.style,{width:"7rem",height:"2rem"});var k,E=C,P=function(){var e;this.node=(e=document.createElement("div"),Object.assign(e.style,g),e)};m({interpretTarget:function(e){return e.node}});var S=["X won","O won"],I=["markX","markO"];Object.assign(P.prototype,((k={})[I[0]]=function(){var e={position:"absolute",left:"-0.24rem",top:"1.24rem",width:"3rem",height:"0",border:"0.3rem solid RoyalBlue",backgroundColor:"RoyalBlue",margin:"0","border-radius":"0.3rem"},t=document.createElement("div"),n=document.createElement("div");return Object.assign(t.style,e,{transform:"rotate(45deg)"}),Object.assign(n.style,e,{transform:"rotate(135deg)"}),this.resetCell(),this.node.appendChild(t),this.node.appendChild(n),this},k[I[1]]=function(){var e=document.createElement("div");return Object.assign(e.style,{position:"absolute",left:"0.15rem",top:"0.15rem",width:"1.5rem",height:"1.5rem",border:"0.6rem solid Red",margin:"0","border-radius":"2.1rem"}),this.resetCell(),this.node.appendChild(e),this},k.markAsWin=function(){Object.assign(this.node.style,y)},k.resetCell=function(){for(;this.node.firstChild;)this.node.removeChild(this.node.firstChild);return Object.assign(this.node.style,g),this},k));var R=x(P),M=new f(R);var B,z=I.map(function(e,t){var n,r=new f;return h(r,(n=[],function(r){var o=r.target;1===r.roleSet.size&&(n=[]),o[e]();var a=function(e){for(var t=0,n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];t<n.length;t++){var r=[],i=n[t],o=Array.isArray(i),a=0;for(i=o?i:i[Symbol.iterator]();;){var s;if(o){if(a>=i.length)break;s=i[a++]}else{if((a=i.next()).done)break;s=a.value}var l=s;if(!e.includes(l)){r=[];break}r.push(l)}if(r.length>0)return r}return!1}(n=function(e,t){var n=R.indexOf(e);return[].concat(i()(t),[n]).sort(function(e,t){return e-t})}(o,n));a?(M.clearElements(),z.clearElements(),a.forEach(function(e){R[e].markAsWin()}),w(S[t])):0===M.size&&(z.clearElements(),w("Game is over"))})),b({roleSet:r,type:"click",action:function(){w("The cell is already set")}}),r});function D(){var e=document.createElement("div");return Object.assign(e.style,{"line-height":"0","box-sizing":"content-box"}),e.appendChild(v),e.appendChild(T),e.appendChild(E),e}z.clearElements=function(){this.forEach(function(e){return e.clearElements()})},b({roleSet:M,type:"click",action:(B=0,function(e){var t=e.target;9===e.roleSet.size&&(B=0),B=function(e,t){return z[e].addElement(t),1-e}(B,t)})}),E.onclick=function(){R.forEach(function(e){return e.resetCell()}),M.addElements(R)},n.d(t,"default",function(){return D})}}]);
//# sourceMappingURL=component---src-templates-page-js-014ca231089b946201ef.js.map