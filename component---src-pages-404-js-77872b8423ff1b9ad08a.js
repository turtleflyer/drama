(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{169:function(e,t,n){"use strict";n.r(t);var r=n(12),o=(n(0),n(180)),i=n(226),a=n(5),s=n.n(a),l=n(227),d=n.n(l);function c(e){var t=e.description,n=e.lang,o=e.meta,a=e.keywords,s=e.title,l=i.data.site,c=t||l.siteMetadata.description;return Object(r.d)(d.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:s},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:c}].concat(a.length>0?{name:"keywords",content:a.join(", ")}:[]).concat(o)})}c.defaultProps={lang:"en",meta:[],keywords:[],description:""},c.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.arrayOf(s.a.object),keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired};var u=c;t.default=function(){return Object(r.d)(o.a,null,Object(r.d)(u,{title:"404: Not found"}),Object(r.d)("h1",null,"NOT FOUND"),Object(r.d)("p",null,"You just hit a route that doesn't exist... the sadness."))}},173:function(e,t,n){var r;e.exports=(r=n(176))&&r.default||r},175:function(e){e.exports={data:{site:{siteMetadata:{title:"Drama"}}}}},176:function(e,t,n){"use strict";n.r(t);n(66);var r=n(0),o=n.n(r),i=n(5),a=n.n(i),s=n(74),l=function(e){var t=e.location,n=e.pageResources;return n?o.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json)):null};l.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},t.default=l},178:function(e){e.exports={data:{allMarkdownRemark:{edges:[{node:{fields:{sectionPath:"/examples/"},frontmatter:{title:"",parentTitle:"Examples",orderIndex:0,noContent:!0}}},{node:{fields:{sectionPath:"/examples/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/examples/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/"},frontmatter:{title:"",parentTitle:"Test Section",orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test1/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test12/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test14/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test15/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test16/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test11/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test17/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test13/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test10/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test19/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test20/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test18/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test2/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test21/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test7/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test9/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test5/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/tic-tac-toe/"},frontmatter:{title:"Examples of drama library use",parentTitle:null,orderIndex:0,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test6/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test8/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test22/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test3/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}},{node:{fields:{sectionPath:"/test-section/test4/"},frontmatter:{title:"Test 1 lorem impsum",parentTitle:null,orderIndex:1,noContent:null}}}]}}}},179:function(e,t,n){n(105),n(69),e.exports={removeSectionsPartFromPath:function(e){return e.replace("/sections","")},extractBeforeFirstSlash:function(e){return e.match(/\/.*?\//)[0]}}},180:function(e,t,n){"use strict";var r=n(12),o=n(175),i=n(0),a=n.n(i),s=n(5),l=n.n(s),d=n(42),c=n.n(d),u=(n(173),a.a.createContext({}));function p(e){var t=e.staticQueryData,n=e.data,o=e.query,i=e.render,s=n?n.data:t[o]&&t[o].data;return Object(r.d)(a.a.Fragment,null,s&&i(s),!s&&Object(r.d)("div",null,"Loading (StaticQuery)"))}var m=function(e){var t=e.data,n=e.query,o=e.render,i=e.children;return Object(r.d)(u.Consumer,null,function(e){return Object(r.d)(p,{data:t,query:n,render:o||i,staticQueryData:e})})};m.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func};var f=n(238),b=n(237),h=n(172),g=function(e,t){void 0===e&&(e="div");var n=void 0===t?{}:t,o=n.addContainerStyle,i=n.addBoxStyle,a=Object(h.a)("div",{target:"ex5gman0"})("display:flex;justify-content:center;",o),s=Object(h.a)(e,{target:"ex5gman1"})("width:960px;justify-content:center;display:flex;align-items:center;",i),d=function(e){var t=e.children;return Object(r.d)(a,null,Object(r.d)(s,null,t))};return d.propTypes={children:l.a.oneOfType([l.a.arrayOf(l.a.node),l.a.node])},d.defaultProps={children:[]},d},x=g("header",{addContainerStyle:{name:"1kp5zft",styles:"background:rebeccapurple;margin-bottom:1.45rem;position:fixed;width:100%;top:0;left:0;z-index:17;"},addBoxStyle:{name:"irtz8t",styles:"height:5rem;"}}),y={name:"1i2z6sa",styles:"display:block;margin:0;"},O={name:"mv5f6b",styles:"color:white;text-decoration:none;"};function j(e){var t=e.siteTitle;return Object(r.d)(x,null,Object(r.d)("h1",{css:y},Object(r.d)(c.a,{to:"/",css:O},t)))}j.propTypes={siteTitle:l.a.string},j.defaultProps={siteTitle:""};var T=n(43),v=n.n(T),w=(n(66),n(102),n(67),n(44),n(181),n(177),n(182),n(178)),k=n(179),C={name:"3dr502",styles:"position:fixed;height:100%;"},P={name:"fgijvt",styles:"position:sticky;height:calc(100vh - 5rem);top-margin:5rem;"},I=Object(h.a)("nav",{target:"e1bc26kg0"})("width:180px;flex:initial;z-index:15;top:5rem;left:0;padding-top:1rem;background-color:white;overflow-y:auto;",function(e){return e.fixed?C:P}),z=Object(h.a)("div",{target:"e1bc26kg1"})({name:"1lejymi",styles:"text-transform:uppercase;"}),B=Object(h.a)("span",{target:"e1bc26kg2"})({name:"1ooq9a1",styles:"color:#d64444;"});function q(e){return Object.keys(e).sort(function(t,n){return e[t].orderIndex-e[n].orderIndex})}function S(e){var t=e.data,n=e.active,o=e.fixed,i=t.allMarkdownRemark.edges.reduce(function(e,t){var n,r=t.node,o=r.frontmatter,i=o.parentTitle,a=o.title,s=o.orderIndex,l=o.noContent,d=r.fields.sectionPath;if(0===d.length)return e;var c,u=Object(k.extractBeforeFirstSlash)(d),p=e[u]||{subsections:{}};if(i)n=Object.assign({},e,((c={})[d]=Object.assign({},p,{parentTitle:i,orderIndex:s,noContent:l&&!0}),c));else if(a){var m,f;n=Object.assign({},e,((f={})[u]=Object.assign({},p,{subsections:Object.assign({},p.subsections,(m={},m[d]={title:a,orderIndex:s},m))}),f))}return n},{}),a=Object(r.d)("ul",null,q(i).map(function(e){var t=i[e],o=t.parentTitle,a=t.subsections,s=t.noContent;return Object(r.d)("li",{key:e},Object(r.d)("ul",null,Object(r.d)(z,null,s?o:Object(r.d)(c.a,{to:e},e===n?Object(r.d)(B,null,o):o)),q(a).map(function(e){return Object(r.d)("li",{key:e},Object(r.d)(c.a,{to:e},e===n?Object(r.d)(B,null,a[e].title):a[e].title))})))}));return Object(r.d)(I,{fixed:o},a)}S.propTypes={data:l.a.shape({allMarkdownRemark:l.a.shape({edges:l.a.arrayOf(l.a.shape({node:l.a.shape({fields:l.a.shape({sectionPath:l.a.string.isRequired}).isRequired,frontmatter:l.a.shape({title:l.a.string.isRequired}).isRequired}).isRequired}).isRequired).isRequired}).isRequired}).isRequired};var R=function(e){return Object(r.d)(m,{query:"3295447902",render:function(t){return Object(r.d)(S,v()({data:t},e))},data:w})},E=g("footer",{addBoxStyle:{name:"hmxpft",styles:"display:block;text-align:center;padding-left:180px;padding-bottom:1rem;"}});function M(e){var t=e.children;return Object(r.d)(E,null,t)}M.propTypes={children:s.PropTypes.oneOfType([s.PropTypes.arrayOf(s.PropTypes.node),s.PropTypes.node])},M.defaultProps={children:[]};n(103),n(104);var D=Object(i.createContext)({sideBarOpen:!1,scrollY:null}),F=Object(i.createContext)(function(){return null}),Y=Symbol("@slideSideBar/OPEN_SIDE_BAR"),N=Symbol("@slideSideBar/CLOSE_SIDE_BAR"),_=function(e,t){switch(t.type){case Y:return Object.assign({},e,{sideBarOpen:!0,scrollY:window.scrollY});case N:return Object.assign({},e,{sideBarOpen:!1});default:return e}},A=function(e){var t=e.children,n=Object(i.useReducer)(_,{sideBarOpen:!1}),o=n[0],a=n[1];return Object(r.d)(D.Provider,{value:o},Object(r.d)(F.Provider,{value:a},t))},Q=Object(h.a)("div",{target:"eygulds0"})({name:"1qzukwv",styles:"z-index:20;position:fixed;left:0;"}),J=function(e){var t=e.sideBarOpen,n=e.openSideBarCallback,o=e.closeSideBarCallback;return t?Object(r.d)(Q,{onClick:o},"O"):Object(r.d)(Q,{onClick:n},"C")},L=function(e){var t=e.active,n=[Object(i.useContext)(D),Object(i.useContext)(F)],o=n[1],s=n[0].sideBarOpen,l=Object(i.useCallback)(function(e){return function(){o({type:e})}},[o]);return Object(r.d)(a.a.Fragment,null,s?Object(r.d)(R,v()({active:t},{fixed:!0})):null,Object(r.d)(J,{sideBarOpen:s,openSideBarCallback:l(Y),closeSideBarCallback:l(N)}))},G={name:"123o6s3",styles:"html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block;}audio,canvas,progress,video{display:inline-block;}audio:not([controls]){display:none;height:0;}progress{vertical-align:baseline;}[hidden],template{display:none;}a{background-color:transparent;-webkit-text-decoration-skip:objects;}a:active,a:hover{outline-width:0;}img{border-style:none;}svg:not(:root){overflow:hidden;}figure{margin:1em 40px;}hr{box-sizing:content-box;height:0;overflow:visible;}button,input,optgroup,select,textarea{font:inherit;margin:0;}optgroup{font-weight:700;}button,input{overflow:visible;}button,select{text-transform:none;}[type='reset'],[type='submit'],button,html [type='button']{-webkit-appearance:button;}[type='button']::-moz-focus-inner,[type='reset']::-moz-focus-inner,[type='submit']::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0;}[type='button']:-moz-focusring,[type='reset']:-moz-focusring,[type='submit']:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText;}fieldset{border:1px solid silver;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}textarea{overflow:auto;}[type='checkbox'],[type='radio']{box-sizing:border-box;padding:0;}[type='number']::-webkit-inner-spin-button,[type='number']::-webkit-outer-spin-button{height:auto;}[type='search']{-webkit-appearance:textfield;outline-offset:-2px;}[type='search']::-webkit-search-cancel-button,[type='search']::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-input-placeholder{color:inherit;opacity:0.54;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}html{box-sizing:border-box;overflow-y:scroll;}*{box-sizing:inherit;}*:before{box-sizing:inherit;}*:after{box-sizing:inherit;}body{color:hsla(0,0%,0%,0.8);word-wrap:break-word;}img{max-width:100%;margin-left:0;margin-right:0;margin-top:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;margin-bottom:1.45rem;}nav{color:#a0a0a0;}nav a{color:#742a86;text-decoration:none;}nav ul{list-style:none;margin:0.7em 0;}nav li{margin:0 0 0.3em 0.4em;}"},U=function(){return Object(r.d)(r.a,{styles:G})},H=g("div",{addContainerStyle:{name:"1k82u0d",styles:"margin-top:5rem;min-width:768px;min-height:75vh;"},addBoxStyle:{name:"1jfvg9w",styles:"align-items:flex-start;"}}),K={name:"1etxbbi",styles:"top:0;"},V={name:"196jqjz",styles:"width:0;"},W=function(e){var t=e.children,n=Object(i.useContext)(D),o=n.sideBarOpen,a=n.scrollY;return Object(i.useEffect)(function(){o||null===a||window.scrollTo(0,a)},[o,a]),Object(r.d)("main",{css:Object(r.c)("margin:1rem auto 0;padding:0px 1.3rem 1.5rem;flex:1;z-index:10;",o?Object(r.c)("position:fixed;width:100%;",a?Object(r.c)("top:calc(5rem - ",a,"px);"):K):V)},t)},X=function(e){var t=e.children,n=e.active;return Object(r.d)(m,{query:"755544856",render:function(e){return Object(r.d)(f.a,null,Object(r.d)(U,null),Object(r.d)(A,null,Object(r.d)(b.a.Consumer,null,function(o){return Object(r.d)(a.a.Fragment,null,Object(r.d)(j,{siteTitle:e.site.siteMetadata.title}),Object(r.d)(H,null,"small"===o?Object(r.d)(L,{active:n}):Object(r.d)(R,{active:n}),Object(r.d)(W,null,t)),Object(r.d)(M,null,"©",(new Date).getFullYear(),", Built with ",Object(r.d)("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))})))},data:o})};X.propTypes={children:l.a.oneOfType([l.a.arrayOf(l.a.node),l.a.node]),active:l.a.string.isRequired},X.defaultProps={children:[]};t.a=X},226:function(e){e.exports={data:{site:{siteMetadata:{title:"Drama",description:"The page provides the documentation of the library and ",author:"@turtleflyer"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-77872b8423ff1b9ad08a.js.map