(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2562:function(e,n,r){"use strict";r.r(n);var t=r(2809),o=r(9008),i=r(7294),c=r(9163),a=r(5893);function s(e,n){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(!e)return;if("string"===typeof e)return l(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,n)}(e))||n&&e&&"number"===typeof e.length){r&&(e=r);var t=0,o=function(){};return{s:o,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){a=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(a)throw i}}}}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function u(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function d(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var f="images/img.png",p=c.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-eccczk-0"})(["display:flex;align-items:center;justify-content:center;height:100vh;background-image:url('images/background.png');"]),h=c.ZP.div.withConfig({displayName:"pages__Board",componentId:"sc-eccczk-1"})(["display:flex;flex-direction:column;align-items:center;justify-content:space-around;width:","px;height:","px;background-color:#ccc;border:2px solid;border-color:#ddd #666 #666 #ddd;"],(function(e){return 40*e.numberOfBlocks.width+50}),(function(e){return 40*e.numberOfBlocks.height+150})),b=c.ZP.div.withConfig({displayName:"pages__StateBoard",componentId:"sc-eccczk-2"})(["display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:","px;height:86px;border:4px solid;border-color:#666 #ddd #ddd #666;"],(function(e){return 40*e.numberOfBlocksWidth+2})),g=c.ZP.div.withConfig({displayName:"pages__Flagcouner",componentId:"sc-eccczk-3"})(["display:inline;width:120px;height:68px;margin-left:10px;font-size:60px;line-height:55px;color:red;text-align:center;background-color:black;border:0.5vh solid black;border-color:#666 #ddd #ddd #666;"]),m=(0,c.ZP)(g).withConfig({displayName:"pages__CountUpTimer",componentId:"sc-eccczk-4"})(["margin-right:10px;margin-left:0;"]),x=c.ZP.div.withConfig({displayName:"pages__Face",componentId:"sc-eccczk-5"})(["width:70px;height:70px;background-image:url(",");background-repeat:no-repeat;background-position:","px;background-origin:border-box;background-size:826px;border:3px solid;border-color:#ddd #666 #666 #ddd;&:hover{opacity:0.8;transition:0.1s;}"],f,(function(e){return-58.6*e.faceState})),y=c.ZP.div.withConfig({displayName:"pages__GameBoard",componentId:"sc-eccczk-6"})(["width:","px;height:","px;border:1px solid;border-color:#666 #ddd #ddd #666;"],(function(e){return 40*e.numberOfBlocks.width+2}),(function(e){return 40*e.numberOfBlocks.height+2})),k=c.ZP.div.withConfig({displayName:"pages__BombBlock",componentId:"sc-eccczk-7"})(["display:inline-block;width:40px;height:40px;vertical-align:bottom;background-color:",";background-image:url(",");background-repeat:no-repeat;background-position:-367px;background-size:516px;border:1px solid #666;"],(function(e){return 99===e.num?"red":"#bbb"}),f),v=(0,c.ZP)(k).withConfig({displayName:"pages__GameBlock",componentId:"sc-eccczk-8"})(["background-color:",";background-position:","px;background-size:505px;",""],(function(e){return e.isOpen?"#bbb":"gray"}),(function(e){return-36*(e.num-1)}),(function(e){return e.isOpen?"border: 0.2px solid #666;":"border: 0.4px solid;border-color: #bbb #666 #666 #bbb;"})),w=(0,c.ZP)(k).withConfig({displayName:"pages__FlagBlock",componentId:"sc-eccczk-9"})(["background-color:gray;background-position:","px 0;background-size:507px;border:0.1vh solid;border-color:#bbb #666 #666 #bbb;"],(function(e){return-36*(e.num-3)})),O=c.ZP.div.withConfig({displayName:"pages__SideMenu",componentId:"sc-eccczk-10"})(["position:fixed;bottom:15px;left:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;width:170px;height:220px;padding:10px;text-align:center;background-color:#ccc;border:5px solid #666;"]),B=c.ZP.div.withConfig({displayName:"pages__LevelButton",componentId:"sc-eccczk-11"})(["position:relative;display:inline-block;width:90%;height:25%;padding:10px;font-family:bold;color:#fff;text-decoration:none;background-color:#f2545b;border-radius:2px;box-shadow:0 6px 0 #a4243b;transition:none;"," &:hover{top:6px;color:#fff;box-shadow:none;}"],(function(e){return e.isSelect?"background-color: #33ccff; \n    top: 6px;\n    box-shadow: none;\n    color: #fff;":""}));n.default=function(){var e=[],n={isGameclear:!1,isGameover:!1},r=[{widthBlocks:9,heightBlocks:9,numberOfBombs:10},{widthBlocks:16,heightBlocks:16,numberOfBombs:40},{widthBlocks:30,heightBlocks:16,numberOfBombs:99}],t=function(e,n){return Array.from(new Array(n),(function(){return new Array(e).fill(9)}))},c=(0,i.useState)(0),l=c[0],u=c[1],f=(0,i.useState)(r[l]),_=f[0],j=f[1],S=(0,i.useState)(t(_.widthBlocks,_.heightBlocks)),C=S[0],N=S[1],P=(0,i.useState)(e),I=P[0],z=P[1],G=(0,i.useState)(n),Z=G[0],E=G[1],A=(0,i.useState)(_.numberOfBombs),M=A[0],J=A[1],D=(0,i.useState)(0),F=D[0],T=D[1];(0,i.useEffect)((function(){if(0!==I.length&&!Z.isGameclear&&!Z.isGameover){var e=setInterval((function(){T((function(e){return e+1}))}),1e3);return function(){clearInterval(e)}}}),[I,Z]);var U=function(e,n,r){if(r.preventDefault(),!Z.isGameclear&&!Z.isGameover){var t=JSON.parse(JSON.stringify(C));9===t[n][e]?0<M?(t[n][e]=12,J(M-1)):t[n][e]=11:12===t[n][e]?(t[n][e]=11,J(M+1)):11===t[n][e]&&(t[n][e]=9),N(t)}},W=function(o){var i=_;o!==l&&(u(o),j(r[o]),i=r[o]),N(t(i.widthBlocks,i.heightBlocks)),z(e),E(n),J(i.numberOfBombs),T(0)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.default,{children:(0,a.jsx)("title",{children:"Minesweeper"})}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(O,{children:[(0,a.jsx)(B,{onClick:function(){return W(0)},isSelect:0===l,children:"Beginner"}),(0,a.jsx)(B,{onClick:function(){return W(1)},isSelect:1===l,children:"Intermediate"}),(0,a.jsx)(B,{onClick:function(){return W(2)},isSelect:2===l,children:"Expert"})]}),(0,a.jsxs)(h,{numberOfBlocks:{width:_.widthBlocks,height:_.heightBlocks},children:[(0,a.jsxs)(b,{numberOfBlocksWidth:_.widthBlocks,children:[(0,a.jsx)(g,{children:("000"+M).slice(-3)}),(0,a.jsx)(x,{faceState:Z.isGameover?13:Z.isGameclear?12:11,onClick:function(){return W(l)}}),(0,a.jsx)(m,{children:F>999?999:("000"+F).slice(-3)})]}),(0,a.jsx)(y,{numberOfBlocks:{width:_.widthBlocks,height:_.heightBlocks},children:C.map((function(e,n){return e.map((function(e,r){return 10===e||99===e?(0,a.jsx)(k,{num:e},"".concat(r,"-").concat(n)):11<=e?(0,a.jsx)(w,{num:e,onContextMenu:function(e){return U(r,n,e)}},"".concat(r,"-").concat(n)):(0,a.jsx)(v,{isOpen:e<9,num:1<=e&&e<=8?e:100,onClick:function(){return function(e,n){var r=function(e,n){for(var r=[],t=e-1;t<e+2;t++)for(var o=n-1;o<n+2;o++)0<=t&&t<_.widthBlocks&&0<=o&&o<_.heightBlocks&&JSON.stringify({x:e,y:n})!==JSON.stringify({x:t,y:o})&&r.push({x:t,y:o});return r},t=function(e,n,r){for(var t=0,o=function(e){for(var o=function(n){r.some((function(r){return r.x===e&&r.y===n}))&&t++},i=n-1;i<n+2;i++)o(i)},i=e-1;i<e+2;i++)o(i);return t},o=JSON.parse(JSON.stringify(C));if(!Z.isGameclear&&!Z.isGameover&&9===o[n][e]){var i=I;0===i.length&&(i=function(e,n){for(var r=[],t=function(){var t=Math.floor(Math.random()*_.widthBlocks),o=Math.floor(Math.random()*_.heightBlocks);r.some((function(e){return e.x===t&&e.y===o}))||e===t||n===o||r.push({x:t,y:o})};r.length<_.numberOfBombs;)t();return r}(e,n),z(i));for(var c=0,a=!1,l=0;l<i.length;l++)i[l].x===e&&i[l].y===n&&(a=!0);if(a){E(d(d({},Z),{},{isGameover:!0}));var u,f=s(i);try{for(f.s();!(u=f.n()).done;){var p=u.value;o[p.y][p.x]=10}}catch(A){f.e(A)}finally{f.f()}o[n][e]=99}else{if(c=t(e,n,i),o[n][e]=c,0===c){var h,b=0,g=M,m=r(e,n),x=s(m);try{for(x.s();!(h=x.n()).done;){var y=h.value;if(12===o[y.y][y.x]&&g++,b=t(y.x,y.y,i),o[y.y][y.x]=b,0===b){var k,v=s(r(y.x,y.y));try{var w=function(){var e=k.value;m.some((function(n){return n.x===e.x&&n.y===e.y}))||m.push({x:e.x,y:e.y})};for(v.s();!(k=v.n()).done;)w()}catch(A){v.e(A)}finally{v.f()}}}}catch(A){x.e(A)}finally{x.f()}J(g)}var O,B=0,j=s(o);try{for(j.s();!(O=j.n()).done;)B+=O.value.filter((function(e){return 9===e||11<=e})).length}catch(A){j.e(A)}finally{j.f()}if(B===_.numberOfBombs){E(d(d({},Z),{},{isGameclear:!0}));var S,P=s(i);try{for(P.s();!(S=P.n()).done;){var G=S.value;o[G.y][G.x]=12}}catch(A){P.e(A)}finally{P.f()}}}N(o)}}(r,n)},onContextMenu:function(e){return U(r,n,e)}},"".concat(r,"-").concat(n))}))}))})]})]})]})}},5301:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(2562)}])}},function(e){e.O(0,[90,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);