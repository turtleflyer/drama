(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{167:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return u}),n.d(t,"query",function(){return p});n(45),n(102),n(67),n(44),n(106);var r=n(8),o=n.n(r),i=n(12),a=n(0),l=n.n(a),s=n(62),d=n.n(s),c=n(181),u=function(e){function t(t){var r,o=(r=e.call(this,t)||this).props.data.markdownRemark.frontmatter.inject;return r.inject=o,r.pieces=o&&o.map(function(e){return n(219)("./"+e+".js")}),r}o()(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=this;this.inject&&Promise.all(this.pieces).then(function(t){t.forEach(function(t,n){var r=t.default,o=e.markdownContainer.querySelector("#"+e.inject[n]);d.a.render(Object(i.d)(r,null),o)})})},r.render=function(){var e=this,t=this.props.data.markdownRemark,n=t.html,r=t.fields.sectionPath;return Object(i.d)(l.a.Fragment,null,Object(i.d)(c.a,{active:r},Object(i.d)("div",{dangerouslySetInnerHTML:{__html:n},ref:function(t){e.markdownContainer=t}})))},t}(l.a.Component),p="313246118"},173:function(e,t,n){var r;e.exports=(r=n(177))&&r.default||r},176:function(e){e.exports={data:{site:{siteMetadata:{title:"Drama"}}}}},177:function(e,t,n){"use strict";n.r(t);n(66);var r=n(0),o=n.n(r),i=n(5),a=n.n(i),l=n(74),s=function(e){var t=e.location,n=e.pageResources;return n?o.a.createElement(l.a,Object.assign({location:t,pageResources:n},n.json)):null};s.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},t.default=s},179:function(e){e.exports={data:{allMarkdownRemark:{edges:[{node:{fields:{sectionPath:"/examples/"},frontmatter:{title:"",parentTitle:"Examples",orderIndex:0,noContent:!0}}},{node:{fields:{sectionPath:"/examples/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/examples/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/test-section/"},frontmatter:{title:"",parentTitle:"Test Section",orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test10/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test11/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test12/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test13/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test15/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test18/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test16/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test19/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test2/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test20/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test21/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test22/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test3/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test4/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test5/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test14/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test17/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test7/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test8/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test9/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test6/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}}]}}}},180:function(e,t,n){n(105),n(69),e.exports={removeSectionsPartFromPath:function(e){return e.replace("/sections","")},extractBeforeFirstSlash:function(e){return e.match(/\/.*?\//)[0]}}},181:function(e,t,n){"use strict";var r=n(12),o=n(176),i=n(0),a=n.n(i),l=n(5),s=n.n(l),d=n(42),c=n.n(d),u=(n(173),a.a.createContext({}));function p(e){var t=e.staticQueryData,n=e.data,o=e.query,i=e.render,l=n?n.data:t[o]&&t[o].data;return Object(r.d)(a.a.Fragment,null,l&&i(l),!l&&Object(r.d)("div",null,"Loading (StaticQuery)"))}var m=function(e){var t=e.data,n=e.query,o=e.render,i=e.children;return Object(r.d)(u.Consumer,null,function(e){return Object(r.d)(p,{data:t,query:n,render:o||i,staticQueryData:e})})};m.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func};var f=n(239),b=n(238),h=n(172),x=function(e,t){void 0===e&&(e="div");var n=void 0===t?{}:t,o=n.addContainerStyle,i=n.addBoxStyle,a=Object(h.a)("div",{target:"ex5gman0"})("display:flex;justify-content:center;",o),l=Object(h.a)(e,{target:"ex5gman1"})("width:960px;justify-content:center;display:flex;align-items:center;",i),d=function(e){var t=e.children;return Object(r.d)(a,null,Object(r.d)(l,null,t))};return d.propTypes={children:s.a.oneOfType([s.a.arrayOf(s.a.node),s.a.node])},d.defaultProps={children:[]},d},g=x("header",{addContainerStyle:{name:"1kp5zft",styles:"background:rebeccapurple;margin-bottom:1.45rem;position:fixed;width:100%;top:0;left:0;z-index:17;"},addBoxStyle:{name:"irtz8t",styles:"height:5rem;"}}),y={name:"1i2z6sa",styles:"display:block;margin:0;"},O={name:"mv5f6b",styles:"color:white;text-decoration:none;"};function j(e){var t=e.siteTitle;return Object(r.d)(g,null,Object(r.d)("h1",{css:y},Object(r.d)(c.a,{to:"/",css:O},t)))}j.propTypes={siteTitle:s.a.string},j.defaultProps={siteTitle:""};var v=n(43),T=n.n(v),w=(n(66),n(102),n(67),n(44),n(182),n(174),n(183),n(179)),k=n(180),C={name:"3dr502",styles:"position:fixed;height:100%;"},P={name:"fgijvt",styles:"position:sticky;height:calc(100vh - 5rem);top-margin:5rem;"},I=Object(h.a)("nav",{target:"e1bc26kg0"})("width:180px;flex:initial;z-index:15;top:5rem;left:0;padding-top:1rem;background-color:white;overflow-y:auto;",function(e){return e.fixed?C:P}),z=Object(h.a)("div",{target:"e1bc26kg1"})({name:"1lejymi",styles:"text-transform:uppercase;"}),S=Object(h.a)("span",{target:"e1bc26kg2"})({name:"1ooq9a1",styles:"color:#d64444;"});function q(e){return Object.keys(e).sort(function(t,n){return e[t].orderIndex-e[n].orderIndex})}function B(e){var t=e.data,n=e.active,o=e.fixed,i=t.allMarkdownRemark.edges.reduce(function(e,t){var n,r=t.node,o=r.frontmatter,i=o.parentTitle,a=o.title,l=o.orderIndex,s=o.noContent,d=r.fields.sectionPath;if(0===d.length)return e;var c,u=Object(k.extractBeforeFirstSlash)(d),p=e[u]||{subsections:{}};if(i)n=Object.assign({},e,((c={})[d]=Object.assign({},p,{parentTitle:i,orderIndex:l,noContent:s&&!0}),c));else if(a){var m,f;n=Object.assign({},e,((f={})[u]=Object.assign({},p,{subsections:Object.assign({},p.subsections,(m={},m[d]={title:a,orderIndex:l},m))}),f))}return n},{}),a=Object(r.d)("ul",null,q(i).map(function(e){var t=i[e],o=t.parentTitle,a=t.subsections,l=t.noContent;return Object(r.d)("li",{key:e},Object(r.d)("ul",null,Object(r.d)(z,null,l?o:Object(r.d)(c.a,{to:e},e===n?Object(r.d)(S,null,o):o)),q(a).map(function(e){return Object(r.d)("li",{key:e},Object(r.d)(c.a,{to:e},e===n?Object(r.d)(S,null,a[e].title):a[e].title))})))}));return Object(r.d)(I,{fixed:o},a)}B.propTypes={data:s.a.shape({allMarkdownRemark:s.a.shape({edges:s.a.arrayOf(s.a.shape({node:s.a.shape({fields:s.a.shape({sectionPath:s.a.string.isRequired}).isRequired,frontmatter:s.a.shape({title:s.a.string.isRequired}).isRequired}).isRequired}).isRequired).isRequired}).isRequired}).isRequired};var R=function(e){return Object(r.d)(m,{query:"3295447902",render:function(t){return Object(r.d)(B,T()({data:t},e))},data:w})},E=x("footer",{addBoxStyle:{name:"hmxpft",styles:"display:block;text-align:center;padding-left:180px;padding-bottom:1rem;"}});function D(e){var t=e.children;return Object(r.d)(E,null,t)}D.propTypes={children:l.PropTypes.oneOfType([l.PropTypes.arrayOf(l.PropTypes.node),l.PropTypes.node])},D.defaultProps={children:[]};n(103),n(104);var F=Object(i.createContext)({sideBarOpen:!1,scrollY:null}),M=Object(i.createContext)(function(){return null}),_=Symbol("@slideSideBar/OPEN_SIDE_BAR"),Y=Symbol("@slideSideBar/CLOSE_SIDE_BAR"),L=function(e,t){switch(t.type){case _:return Object.assign({},e,{sideBarOpen:!0,scrollY:window.scrollY});case Y:return Object.assign({},e,{sideBarOpen:!1});default:return e}},N=function(e){var t=e.children,n=Object(i.useReducer)(L,{sideBarOpen:!1}),o=n[0],a=n[1];return Object(r.d)(F.Provider,{value:o},Object(r.d)(M.Provider,{value:a},t))},Q=Object(h.a)("div",{target:"eygulds0"})({name:"1qzukwv",styles:"z-index:20;position:fixed;left:0;"}),A=function(e){var t=e.sideBarOpen,n=e.openSideBarCallback,o=e.closeSideBarCallback;return t?Object(r.d)(Q,{onClick:o},"O"):Object(r.d)(Q,{onClick:n},"C")},J=function(e){var t=e.active,n=[Object(i.useContext)(F),Object(i.useContext)(M)],o=n[1],l=n[0].sideBarOpen,s=Object(i.useCallback)(function(e){return function(){o({type:e})}},[o]);return Object(r.d)(a.a.Fragment,null,l?Object(r.d)(R,T()({active:t},{fixed:!0})):null,Object(r.d)(A,{sideBarOpen:l,openSideBarCallback:s(_),closeSideBarCallback:s(Y)}))},U={name:"123o6s3",styles:"html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block;}audio,canvas,progress,video{display:inline-block;}audio:not([controls]){display:none;height:0;}progress{vertical-align:baseline;}[hidden],template{display:none;}a{background-color:transparent;-webkit-text-decoration-skip:objects;}a:active,a:hover{outline-width:0;}img{border-style:none;}svg:not(:root){overflow:hidden;}figure{margin:1em 40px;}hr{box-sizing:content-box;height:0;overflow:visible;}button,input,optgroup,select,textarea{font:inherit;margin:0;}optgroup{font-weight:700;}button,input{overflow:visible;}button,select{text-transform:none;}[type='reset'],[type='submit'],button,html [type='button']{-webkit-appearance:button;}[type='button']::-moz-focus-inner,[type='reset']::-moz-focus-inner,[type='submit']::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0;}[type='button']:-moz-focusring,[type='reset']:-moz-focusring,[type='submit']:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText;}fieldset{border:1px solid silver;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}textarea{overflow:auto;}[type='checkbox'],[type='radio']{box-sizing:border-box;padding:0;}[type='number']::-webkit-inner-spin-button,[type='number']::-webkit-outer-spin-button{height:auto;}[type='search']{-webkit-appearance:textfield;outline-offset:-2px;}[type='search']::-webkit-search-cancel-button,[type='search']::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-input-placeholder{color:inherit;opacity:0.54;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}html{box-sizing:border-box;overflow-y:scroll;}*{box-sizing:inherit;}*:before{box-sizing:inherit;}*:after{box-sizing:inherit;}body{color:hsla(0,0%,0%,0.8);word-wrap:break-word;}img{max-width:100%;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;margin-bottom:1.45rem;}nav{color:#a0a0a0;}nav a{color:#742a86;text-decoration:none;}nav ul{list-style:none;margin:0.7em 0;}nav li{margin:0 0 0.3em 0.4em;}"},G=function(){return Object(r.d)(r.a,{styles:U})},H=x("div",{addContainerStyle:{name:"1k82u0d",styles:"margin-top:5rem;min-width:768px;min-height:75vh;"},addBoxStyle:{name:"1jfvg9w",styles:"align-items:flex-start;"}}),K={name:"1etxbbi",styles:"top:0;"},V={name:"196jqjz",styles:"width:0;"},W=function(e){var t=e.children,n=Object(i.useContext)(F),o=n.sideBarOpen,a=n.scrollY;return Object(i.useEffect)(function(){o||null===a||window.scrollTo(0,a)},[o,a]),Object(r.d)("main",{css:Object(r.c)("margin:1rem auto 0;padding:0px 1.3rem 1.5rem;flex:1;z-index:10;",o?Object(r.c)("position:fixed;width:100%;",a?Object(r.c)("top:calc(5rem - ",a,"px);"):K):V)},t)},X=function(e){var t=e.children,n=e.active;return Object(r.d)(m,{query:"755544856",render:function(e){return Object(r.d)(f.a,null,Object(r.d)(G,null),Object(r.d)(N,null,Object(r.d)(b.a.Consumer,null,function(o){return Object(r.d)(a.a.Fragment,null,Object(r.d)(j,{siteTitle:e.site.siteMetadata.title}),Object(r.d)(H,null,"small"===o?Object(r.d)(J,{active:n}):Object(r.d)(R,{active:n}),Object(r.d)(W,null,t)),Object(r.d)(D,null,"©",(new Date).getFullYear(),", Built with ",Object(r.d)("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))})))},data:o})};X.propTypes={children:s.a.oneOfType([s.a.arrayOf(s.a.node),s.a.node]),active:s.a.string.isRequired},X.defaultProps={children:[]};t.a=X},219:function(e,t,n){var r={"./tic-tac-toe.js":220};function o(e){return i(e).then(function(e){return n.t(e,7)})}function i(e){return Promise.resolve().then(function(){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t})}o.keys=function(){return Object.keys(r)},o.resolve=i,o.id=219,e.exports=o},220:function(e,t,n){var r=n(186).default;if("undefined"!=typeof document){var o=n(189);e.exports.default=r(o)}}}]);
//# sourceMappingURL=component---src-templates-page-js-bff19835e77dce62b734.js.map