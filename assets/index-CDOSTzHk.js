import{r as n,a as nt,R as ve}from"./vendor-B5ZO-m6Q.js";import{i as ot,g as lt,c as it,u as ct,s as dt,G as ut,a as ht,o as mt,b as pt}from"./firebase-BpiXNDqo.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const m of u.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function r(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerPolicy&&(u.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?u.credentials="include":o.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(o){if(o.ep)return;o.ep=!0;const u=r(o);fetch(o.href,u)}})();var ze={exports:{}},oe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xt=n,gt=Symbol.for("react.element"),ft=Symbol.for("react.fragment"),yt=Object.prototype.hasOwnProperty,bt=xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wt={key:!0,ref:!0,__self:!0,__source:!0};function Be(t,a,r){var s,o={},u=null,m=null;r!==void 0&&(u=""+r),a.key!==void 0&&(u=""+a.key),a.ref!==void 0&&(m=a.ref);for(s in a)yt.call(a,s)&&!wt.hasOwnProperty(s)&&(o[s]=a[s]);if(t&&t.defaultProps)for(s in a=t.defaultProps,a)o[s]===void 0&&(o[s]=a[s]);return{$$typeof:gt,type:t,key:u,ref:m,props:o,_owner:bt.current}}oe.Fragment=ft;oe.jsx=Be;oe.jsxs=Be;ze.exports=oe;var e=ze.exports,qe,je=nt;qe=je.createRoot,je.hydrateRoot;const vt={apiKey:"AIzaSyCMEsq7QGMo6mk71csYhh2K_jarvl7UfxE",authDomain:"thelearningrealm-b9543.firebaseapp.com",projectId:"thelearningrealm-b9543",storageBucket:"thelearningrealm-b9543.firebasestorage.app",messagingSenderId:"645907597774",appId:"1:645907597774:web:215c4e10cfc6e96dd3039f"},jt=ot(vt),ae=lt(jt);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Nt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),E=(t,a)=>{const r=n.forwardRef(({color:s="currentColor",size:o=24,strokeWidth:u=2,absoluteStrokeWidth:m,className:c="",children:i,...b},j)=>n.createElement("svg",{ref:j,...Nt,width:o,height:o,stroke:s,strokeWidth:m?Number(u)*24/Number(o):u,className:["lucide",`lucide-${St(t)}`,c].join(" "),...b},[...a.map(([k,g])=>n.createElement(k,g)),...Array.isArray(i)?i:[i]]));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=E("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=E("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=E("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=E("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=E("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=E("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=E("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=E("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=E("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=E("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=E("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=E("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=E("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=E("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=E("Leaf",[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=E("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=E("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=E("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=E("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=E("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=E("Map",[["polygon",{points:"3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21",key:"ok2ie8"}],["line",{x1:"9",x2:"9",y1:"3",y2:"18",key:"w34qz5"}],["line",{x1:"15",x2:"15",y1:"6",y2:"21",key:"volv9a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=E("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=E("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=E("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=E("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=E("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=E("PencilLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}],["path",{d:"m15 5 3 3",key:"1w25hb"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=E("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=E("Rainbow",[["path",{d:"M22 17a10 10 0 0 0-20 0",key:"ozegv"}],["path",{d:"M6 17a6 6 0 0 1 12 0",key:"5giftw"}],["path",{d:"M10 17a2 2 0 0 1 4 0",key:"gnsikk"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=E("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=E("Scroll",[["path",{d:"M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4",key:"13a6an"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=E("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=E("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=E("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=E("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=E("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=E("Speaker",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["circle",{cx:"12",cy:"14",r:"4",key:"1jruaj"}],["path",{d:"M12 14h.01",key:"1etili"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=E("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=E("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=E("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=E("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=E("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=E("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=E("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=E("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=E("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=E("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=E("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=E("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);function Zt({isOpen:t,onClose:a,isDarkMode:r,isVibrant:s}){const[o,u]=n.useState(!1),[m,c]=n.useState(""),[i,b]=n.useState(""),[j,k]=n.useState(""),[g,f]=n.useState(""),[h,C]=n.useState(!1);if(!t)return null;const v=async l=>{l.preventDefault(),C(!0),f("");try{if(o){const y=await it(ae,m,i);j&&y.user&&await ct(y.user,{displayName:j})}else await dt(ae,m,i);a()}catch(y){let w="An error occurred. Please try again.";switch(y.code){case"auth/email-already-in-use":w="This email is already registered. Please sign in instead.";break;case"auth/invalid-email":w="Please enter a valid email address.";break;case"auth/weak-password":w="Password should be at least 6 characters long.";break;case"auth/user-not-found":case"auth/wrong-password":w="Invalid email or password.";break}f(w)}finally{C(!1)}},d=async()=>{C(!0),f("");try{const l=new ut;await ht(ae,l),a()}catch{f("Failed to sign in with Google. Please try again.")}finally{C(!1)}};return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",children:e.jsxs("div",{className:`
        relative w-full max-w-md p-8 rounded-3xl
        ${r?"bg-gray-800":"bg-white"}
        shadow-xl
      `,children:[e.jsx("button",{onClick:a,className:"absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",children:e.jsx(ye,{className:"w-6 h-6"})}),e.jsx("h2",{className:`
          text-2xl font-bold mb-6 text-center
          ${r?"text-white":"text-gray-900"}
        `,children:o?"Create Account":"Sign In"}),g&&e.jsx("div",{className:"mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm",children:g}),e.jsxs("form",{onSubmit:v,className:"space-y-4 mb-6",children:[o&&e.jsx("input",{type:"text",value:j,onChange:l=>k(l.target.value),placeholder:"Name",className:`
                w-full px-4 py-3 rounded-xl
                border-2 transition-colors
                ${r?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}),e.jsx("input",{type:"email",value:m,onChange:l=>c(l.target.value),placeholder:"Email",required:!0,className:`
              w-full px-4 py-3 rounded-xl
              border-2 transition-colors
              ${r?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
              focus:outline-none focus:ring-2 focus:ring-purple-500
            `}),e.jsx("input",{type:"password",value:i,onChange:l=>b(l.target.value),placeholder:"Password",required:!0,minLength:6,className:`
              w-full px-4 py-3 rounded-xl
              border-2 transition-colors
              ${r?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
              focus:outline-none focus:ring-2 focus:ring-purple-500
            `}),e.jsx("button",{type:"submit",disabled:h,className:`
              w-full py-3 rounded-xl
              flex items-center justify-center gap-2
              font-bold text-white
              ${s?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"}
              disabled:opacity-50
            `,children:h?e.jsx("div",{className:"w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"}):e.jsxs(e.Fragment,{children:[o?e.jsx(ge,{className:"w-5 h-5"}):e.jsx(Gt,{className:"w-5 h-5"}),o?"Create Account":"Sign In"]})})]}),e.jsxs("button",{onClick:d,disabled:h,className:`
            w-full py-3 rounded-xl
            flex items-center justify-center gap-2
            font-bold
            ${r?"bg-gray-700 text-white":"bg-gray-100 text-gray-900"}
            hover:opacity-90
            disabled:opacity-50
          `,children:[e.jsx(It,{className:"w-5 h-5"}),"Continue with Google"]}),e.jsx("button",{onClick:()=>u(!o),className:`
            mt-4 w-full text-sm
            ${r?"text-gray-300":"text-gray-600"}
            hover:underline
          `,children:o?"Already have an account? Sign in":"Don't have an account? Create one"})]})})}const Ye=n.createContext({user:null,isLoading:!0,signOut:async()=>{}});function Je({children:t}){const[a,r]=n.useState(null),[s,o]=n.useState(!0);n.useEffect(()=>{const c=mt(ae,i=>{console.log("Auth state changed:",i==null?void 0:i.email),r(i),o(!1)});return()=>c()},[]);const u=async()=>{try{await pt(ae),console.log("User signed out successfully")}catch(c){console.error("Error signing out:",c)}};if(s)return e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"})});const m={user:a,isLoading:s,signOut:u};return e.jsx(Ye.Provider,{value:m,children:t})}const ne=()=>{const t=n.useContext(Ye);if(t===void 0)throw new Error("useAuth must be used within an AuthProvider");return t},Ke={success:"https://cdn.pixabay.com/download/audio/2022/03/19/audio_805cb3c75d.mp3",error:"https://cdn.pixabay.com/download/audio/2022/03/19/audio_c8c8a73f04.mp3",click:"https://cdn.pixabay.com/download/audio/2022/03/19/audio_1114.mp3"};let U=null;const fe={},Xt=()=>(U||(U=new(window.AudioContext||window.webkitAudioContext),Object.entries(Ke).forEach(([t,a])=>{fetch(a).then(r=>{if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return r.arrayBuffer()}).then(r=>U.decodeAudioData(r)).then(r=>{fe[t]=r}).catch(r=>{console.warn(`Failed to load audio ${t}:`,r)})})),U),Qt=async(t,a=.3)=>{try{const r=Xt();if(fe[t]){const o=r.createBufferSource(),u=r.createGain();o.buffer=fe[t],u.gain.value=a,o.connect(u),u.connect(r.destination),o.start(0);return}const s=new Audio;s.src=Ke[t],s.volume=a,await new Promise((o,u)=>{s.oncanplaythrough=o,s.onerror=u,s.load()}),await s.play()}catch(r){console.warn("Audio playback failed:",r);try{const s=U==null?void 0:U.createOscillator(),o=U==null?void 0:U.createGain();s&&o&&U&&(s.connect(o),o.connect(U.destination),o.gain.value=a*.1,s.frequency.value=t==="success"?880:440,s.start(),setTimeout(()=>s.stop(),200))}catch(s){console.warn("Fallback audio failed:",s)}}};let K=null,X=[],J=!1;const re=()=>{if(X.length===0||J)return;const{text:t,lang:a,onComplete:r}=X[0],s=new SpeechSynthesisUtterance(t);s.lang=a,s.rate=.9,s.pitch=1.1,s.onend=()=>{J=!1,K=null,X.shift(),r&&r(),re()},s.onerror=o=>{console.warn("Speech synthesis error:",o),J=!1,K=null,X.shift(),r&&r(),re()};try{window.speechSynthesis.speaking&&window.speechSynthesis.cancel(),K=s,J=!0,window.speechSynthesis.speak(s)}catch(o){console.warn("Speech synthesis failed:",o),J=!1,K=null,X.shift(),r&&r(),re()}},Vt=(t,a="en-US",r)=>{try{if(K&&K.text===t)return;X.push({text:t,lang:a,onComplete:r}),J||re()}catch(s){console.warn("Speech synthesis failed:",s),r&&r()}};document.addEventListener("DOMContentLoaded",()=>{U=new(window.AudioContext||window.webkitAudioContext),U.suspend()});document.addEventListener("click",()=>{(U==null?void 0:U.state)==="suspended"&&U.resume()},{once:!0});window.addEventListener("beforeunload",()=>{window.speechSynthesis.cancel(),K=null,X=[],J=!1});document.addEventListener("visibilitychange",()=>{document.hidden?(window.speechSynthesis.cancel(),K=null,J=!1):re()});const Ze=n.createContext({soundEnabled:!0,toggleSound:()=>{},playGameSound:()=>{},speakText:()=>{},isSpeaking:!1});function Dt({children:t}){const[a,r]=n.useState(()=>{const i=localStorage.getItem("soundEnabled");return i?JSON.parse(i):!0}),[s,o]=n.useState(!1);n.useEffect(()=>{localStorage.setItem("soundEnabled",JSON.stringify(a))},[a]);const u=()=>r(!a),m=(i,b=.3)=>{a&&Qt(i,b)},c=(i,b)=>{a&&(Vt(i,b,()=>o(!1)),o(!0))};return e.jsx(Ze.Provider,{value:{soundEnabled:a,toggleSound:u,playGameSound:m,speakText:c,isSpeaking:s},children:t})}const Z=()=>{const t=n.useContext(Ze);if(!t)throw new Error("useGameAudio must be used within a GameAudioProvider");return t},Me={en:{title:"Lesson Link",tagline:"Where Learning is Fun!",subTagline:"Explore Your Path Today!",letsPlay:"Let's Play!",gamesAndPuzzles:"Games & Puzzles",videos:"Videos",takeABreak:"Take a Break",parentDashboard:"Dashboard",learningPath:"Learn!",terms:"Terms",contact:"Contact",help:"Help",toggleColorMode:"Toggle Color Mode",switchLanguage:"Switch Language",toggleDarkMode:"Toggle Dark Mode",mascotAlt:"Friendly Learning Companion",contactPage:{title:"Contact the Creators!",subtitle:"Have a question, an idea, or just want to say hi? We'd love to hear from you!",form:{name:"Your Name",email:"Your Email",message:"Your Message",send:"Send Message",success:"Message Sent!",error:"Oops! Something went wrong. Please try again later.",successMessage:"Thank you for reaching out. We'll get back to you soon!"}},videoPage:{urlPlaceholder:"Paste YouTube URL here...",translateAndPlay:"Translate & Play",languages:{spanish:"Spanish",french:"French",german:"German",italian:"Italian"},featuredVideos:{abcSong:"ABC Song",numbers:"Numbers 1-10"}},breakPage:{parentInfo:"This page helps your child take a calming break while still learning!",activities:{music:{title:"Soothing Music",tracks:{ocean:"Ocean Waves",forest:"Forest Birds",rain:"Gentle Rain"}},visual:{title:"Calming Scenes",scenes:{waves:"Ocean Waves",garden:"Peaceful Garden",night:"Starry Night"}},breathing:{title:"Breathe with Bob",description:"Follow Bob's breathing pattern"}}},gamesPage:{mainGames:{letterMatching:{title:"Letter Matching",description:"Match letters to pictures"},phonics:{title:"Phonics Sound Match",description:"Match sounds to letters"},wordBuilder:{title:"Word Builder",description:"Build simple words"},findLetter:{title:"Find the Letter",description:"Spot hidden letters"}},upcomingGames:{numberAdventure:{title:"Number Adventure",description:"Coming Soon!"},shapeExplorer:{title:"Shape Explorer",description:"Coming Soon!"}}},dashboard:{profile:"Profile",achievements:"Achievements",progress:"Progress",settings:"Settings",parentMode:"Parent Mode",kidMode:"Kid Mode",streak:"Day Streak!",xp:"XP",upNext:"Up Next",soundEffects:"Sound Effects",notifications:"Notifications",switchChild:"Switch Child",learningProgress:"Learning Progress",currentLevelProgress:"Current Level Progress",xpToNextReward:"XP to Next Reward",lettersAdventure:"Letters Adventure",numberFun:"Number Fun",colorsAndShapes:"Colors & Shapes",lessonDuration:"15 minutes",unlockRewards:"Unlock new rewards!",superReader:"Super Reader",mathWizard:"Math Wizard",focusMaster:"Focus Master",creativeMind:"Creative Mind",screenTime:"Screen Time Today",rewards:"Reward Points",hours:"hours",minutes:"minutes",points:"points"}},es:{title:"Lección Enlace",tagline:"¡Donde Aprender es Divertido!",subTagline:"¡Explora Tu Camino Hoy!",letsPlay:"¡A Jugar!",gamesAndPuzzles:"Juegos y Rompecabezas",videos:"Videos",takeABreak:"Toma un Descanso",parentDashboard:"Panel",learningPath:"¡Aprende!",terms:"Términos",contact:"Contacto",help:"Ayuda",toggleColorMode:"Cambiar Modo de Color",switchLanguage:"Cambiar Idioma",toggleDarkMode:"Cambiar Modo Oscuro",mascotAlt:"Compañero Amigable de Aprendizaje",contactPage:{title:"¡Contacta a los Creadores!",subtitle:"¿Tienes una pregunta, una idea o simplemente quieres saludar? ¡Nos encantaría saber de ti!",form:{name:"Tu Nombre",email:"Tu Email",message:"Tu Mensaje",send:"Enviar Mensaje",success:"¡Mensaje Enviado!",error:"¡Ups! Algo salió mal. Por favor, inténtalo de nuevo más tarde.",successMessage:"Gracias por contactarnos. ¡Te responderemos pronto!"}},videoPage:{urlPlaceholder:"Pega la URL de YouTube aquí...",translateAndPlay:"Traducir y Reproducir",languages:{spanish:"Español",french:"Francés",german:"Alemán",italian:"Italiano"},featuredVideos:{abcSong:"Canción del ABC",numbers:"Números 1-10"}},breakPage:{parentInfo:"¡Esta página ayuda a tu hijo a tomar un descanso relajante mientras sigue aprendiendo!",activities:{music:{title:"Música Relajante",tracks:{ocean:"Olas del Mar",forest:"Pájaros del Bosque",rain:"Lluvia Suave"}},visual:{title:"Escenas Tranquilas",scenes:{waves:"Olas del Mar",garden:"Jardín Tranquilo",night:"Noche Estrellada"}},breathing:{title:"Respira con Bob",description:"Sigue el patrón de respiración de Bob"}}},gamesPage:{mainGames:{letterMatching:{title:"Emparejar Letras",description:"Relaciona letras con imágenes"},phonics:{title:"Sonidos Fonéticos",description:"Relaciona sonidos con letras"},wordBuilder:{title:"Constructor de Palabras",description:"Construye palabras simples"},findLetter:{title:"Encuentra la Letra",description:"Encuentra letras escondidas"}},upcomingGames:{numberAdventure:{title:"Aventura de Números",description:"¡Próximamente!"},shapeExplorer:{title:"Explorador de Formas",description:"¡Próximamente!"}}},dashboard:{profile:"Perfil",achievements:"Logros",progress:"Progreso",settings:"Configuración",parentMode:"Modo Padres",kidMode:"Modo Niños",streak:"¡Días Seguidos!",xp:"XP",upNext:"Siguiente",soundEffects:"Efectos de Sonido",notifications:"Notificaciones",switchChild:"Cambiar Niño",learningProgress:"Progreso de Aprendizaje",currentLevelProgress:"Progreso del Nivel Actual",xpToNextReward:"XP para la Siguiente Recompensa",lettersAdventure:"Aventura de Letras",numberFun:"Diversión con Números",colorsAndShapes:"Colores y Formas",lessonDuration:"15 minutos",unlockRewards:"¡Desbloquea nuevas recompensas!",superReader:"Super Lector",mathWizard:"Mago Matemático",focusMaster:"Maestro del Enfoque",creativeMind:"Mente Creativa",screenTime:"Tiempo de Pantalla Hoy",rewards:"Puntos de Recompensa",hours:"horas",minutes:"minutos",points:"puntos"}}};function be(t){return new Promise((a,r)=>{t.oncomplete=t.onsuccess=()=>a(t.result),t.onabort=t.onerror=()=>r(t.error)})}function es(t,a){const r=indexedDB.open(t);r.onupgradeneeded=()=>r.result.createObjectStore(a);const s=be(r);return(o,u)=>s.then(m=>u(m.transaction(a,o).objectStore(a)))}let de;function Xe(){return de||(de=es("keyval-store","keyval")),de}function ts(t,a=Xe()){return a("readonly",r=>be(r.get(t)))}function ss(t,a,r=Xe()){return r("readwrite",s=>(s.put(a,t),be(s.transaction)))}const Qe="placement_test_",Ve=async t=>{try{return await ts(`${Qe}${t}`)||null}catch(a){return console.error("Error retrieving placement test result:",a),null}},as=async t=>{try{await ss(`${Qe}${t.userId}`,t)}catch(a){throw console.error("Error saving placement test result:",a),a}},De=n.createContext(null);function rs({children:t}){var x;const{user:a}=ne(),[r,s]=n.useState(!1),[o,u]=n.useState((a==null?void 0:a.displayName)||((x=a==null?void 0:a.email)==null?void 0:x.split("@")[0])||"Guest"),[m,c]=n.useState(!0),[i,b]=n.useState(!0),[j,k]=n.useState(null),[g,f]=n.useState(!1),[h,C]=n.useState(!1),[v,d]=n.useState(null),l=5,y=75,w=1250,p=1500;n.useEffect(()=>{(async()=>{if(a){const S=await Ve(a.uid);d(S),S||C(!0)}})()},[a]);const P={user:a,isParentMode:r,selectedChild:o,soundEnabled:m,notificationsEnabled:i,activeCard:j,showCelebration:g,showPlacementTest:h,placementTestResult:v,learningStreak:l,progressPercentage:y,xpPoints:w,nextMilestone:p,toggleParentMode:()=>s(!r),setSelectedChild:u,setSoundEnabled:c,setNotificationsEnabled:b,setActiveCard:k,setShowCelebration:f,setShowPlacementTest:C,setPlacementTestResult:d};return e.jsx(De.Provider,{value:P,children:t})}const we=()=>{const t=n.useContext(De);if(!t)throw new Error("useDashboard must be used within a DashboardProvider");return t},Ge=[{id:"profile",icon:He,color:"from-purple-400 via-pink-400 to-red-400",getTitle:t=>t,getValue:()=>"",titleKey:"profile"},{id:"progress",icon:q,color:"from-blue-400 via-cyan-400 to-teal-400",getTitle:t=>t.dashboard.learningProgress,getValue:t=>`${t}%`,titleKey:"progress"},{id:"playtime",icon:We,color:"from-green-400 via-emerald-400 to-teal-400",getTitle:t=>t.dashboard.screenTime,getValue:t=>{const a=Math.floor(t/60),r=t%60;return`${a}h ${r}m`},titleKey:"playtime"},{id:"rewards",icon:_e,color:"from-yellow-400 via-orange-400 to-red-400",getTitle:t=>t.dashboard.rewards,getValue:t=>t.toString(),titleKey:"rewards"}];function ns({isDarkMode:t,isVibrant:a,language:r,t:s}){const{selectedChild:o,soundEnabled:u,progressPercentage:m,xpPoints:c,setActiveCard:i,setShowCelebration:b}=we(),{speakText:j}=Z(),[k,g]=n.useState(0);n.useEffect(()=>{const h=localStorage.getItem("playTime"),C=localStorage.getItem("lastPlayDate"),v=new Date().toDateString();C!==v?(g(0),localStorage.setItem("lastPlayDate",v),localStorage.setItem("playTime","0")):h&&g(parseInt(h,10));const d=setInterval(()=>{g(l=>{const y=l+1;return localStorage.setItem("playTime",y.toString()),y})},6e4);return()=>clearInterval(d)},[]);const f=h=>{i(h),b(!0);let C="";if(Ge.find(d=>d.id===h)){switch(h){case"profile":C=o;break;case"progress":C=`${s.dashboard.learningProgress}: ${m}%`;break;case"playtime":const d=Math.floor(k/60),l=k%60;C=`${s.dashboard.screenTime}: ${d} ${s.dashboard.hours} ${l} ${s.dashboard.minutes}`;break;case"rewards":C=`${s.dashboard.rewards}: ${c} ${s.dashboard.points}`;break}u&&C&&j(C,r==="es"?"es-ES":"en-US")}setTimeout(()=>{i(null),b(!1)},2e3)};return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:Ge.map(h=>e.jsxs("button",{onClick:()=>f(h.id),className:`
            relative p-8 rounded-3xl
            transform hover:scale-105 transition-all duration-500
            focus:outline-none focus:ring-4 focus:ring-purple-400
            shadow-xl
            group
            cursor-pointer
            overflow-hidden
            aspect-square
          `,children:[e.jsx("div",{className:`
            absolute inset-0
            bg-gradient-to-br ${h.color}
            opacity-40 group-hover:opacity-60
            transition-opacity duration-500
          `}),e.jsxs("div",{className:"relative flex flex-col items-center justify-center h-full space-y-6",children:[e.jsx(h.icon,{className:`
              w-24 h-24
              ${a?`text-transparent bg-clip-text bg-gradient-to-r ${h.color}`:t?"text-white":"text-gray-900"}
              animate-float
            `}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsx("h3",{className:`
                text-3xl md:text-4xl font-extrabold font-comic tracking-wide
                ${t?"text-white":"text-gray-900"}
                transform hover:scale-110 transition-transform
                ${a?"drop-shadow-lg":""}
              `,children:h.id==="profile"?h.getTitle(o):h.getTitle(s)}),h.id!=="profile"&&e.jsx("p",{className:`
                  text-2xl md:text-3xl font-bold font-comic tracking-wider
                  ${t?"text-gray-300":"text-gray-600"}
                  transform hover:scale-110 transition-transform
                  ${a?"drop-shadow":""}
                `,children:h.id==="progress"?h.getValue(m):h.id==="playtime"?h.getValue(k):h.getValue(c)})]})]}),e.jsx("div",{className:"absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",children:Array.from({length:3}).map((C,v)=>e.jsx(I,{className:`
                  absolute w-6 h-6
                  text-yellow-400
                  animate-pulse
                `,style:{top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,animationDelay:`${v*.2}s`}},v))})]},h.id))})}function os({isDarkMode:t,isVibrant:a,t:r}){const{progressPercentage:s,xpPoints:o,nextMilestone:u,soundEnabled:m,setSoundEnabled:c,notificationsEnabled:i,setNotificationsEnabled:b,setShowPlacementTest:j,placementTestResult:k,selectedChild:g,setSelectedChild:f}=we(),{user:h}=ne(),C=()=>{if(!h){const v=new CustomEvent("showAuthModal",{detail:{message:"Please sign in or create an account to access the placement test.",returnTo:"dashboard"}});window.dispatchEvent(v);return}j(!0)};return e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[e.jsxs("div",{className:"lg:col-span-2 space-y-8",children:[e.jsxs("div",{className:`rounded-2xl p-6 ${t?"bg-gray-800":"bg-white"} shadow-lg`,children:[e.jsx("h3",{className:`text-2xl font-bold mb-6 ${t?"text-white":"text-gray-900"}`,children:r.dashboard.learningProgress}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between text-sm mb-2",children:[e.jsx("span",{className:t?"text-gray-300":"text-gray-700",children:r.dashboard.currentLevelProgress}),e.jsxs("span",{className:t?"text-gray-300":"text-gray-700",children:[s,"%"]})]}),e.jsx("div",{className:"h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",children:e.jsx("div",{className:`h-full ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"} transition-all duration-300`,style:{width:`${s}%`}})})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between text-sm mb-2",children:[e.jsx("span",{className:t?"text-gray-300":"text-gray-700",children:r.dashboard.xpToNextReward}),e.jsxs("span",{className:t?"text-gray-300":"text-gray-700",children:[o," / ",u]})]}),e.jsx("div",{className:"h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",children:e.jsx("div",{className:`h-full ${a?"bg-gradient-to-r from-yellow-400 to-yellow-600":"bg-yellow-500"}`,style:{width:`${o/u*100}%`}})})]})]})]}),e.jsxs("div",{className:`rounded-2xl p-6 ${t?"bg-gray-800":"bg-white"} shadow-lg`,children:[e.jsx("h3",{className:`text-2xl font-bold mb-6 ${t?"text-white":"text-gray-900"}`,children:r.dashboard.upNext}),e.jsx("div",{className:"space-y-4",children:[r.dashboard.lettersAdventure,r.dashboard.numberFun,r.dashboard.colorsAndShapes].map((v,d)=>e.jsx("div",{className:`p-4 rounded-xl ${t?"bg-gray-700":"bg-gray-50"} hover:scale-102 transition-transform cursor-pointer`,children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`p-3 rounded-full ${a?"bg-gradient-to-r from-purple-500 to-pink-500":"bg-purple-600"}`,children:e.jsx($t,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h4",{className:`font-bold ${t?"text-white":"text-gray-900"}`,children:v}),e.jsxs("p",{className:`text-sm ${t?"text-gray-300":"text-gray-700"}`,children:[r.dashboard.lessonDuration," • ",r.dashboard.unlockRewards]})]})]})},d))})]})]}),e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:`rounded-2xl p-6 ${t?"bg-gray-800":"bg-white"} shadow-lg`,children:[e.jsx("h3",{className:`text-2xl font-bold mb-6 ${t?"text-white":"text-gray-900"}`,children:r.dashboard.achievements}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:[{icon:q,label:r.dashboard.superReader,color:"text-yellow-500"},{icon:_e,label:r.dashboard.mathWizard,color:"text-purple-500"},{icon:Ht,label:r.dashboard.focusMaster,color:"text-red-500"},{icon:I,label:r.dashboard.creativeMind,color:"text-blue-500"}].map((v,d)=>e.jsxs("div",{className:`p-4 rounded-xl ${t?"bg-gray-700":"bg-gray-50"} text-center`,children:[e.jsx(v.icon,{className:`w-8 h-8 ${v.color} mx-auto mb-2`}),e.jsx("span",{className:`text-sm font-medium ${t?"text-gray-300":"text-gray-700"}`,children:v.label})]},d))})]}),e.jsxs("div",{className:`rounded-2xl p-6 ${t?"bg-gray-800":"bg-white"} shadow-lg`,children:[e.jsx("h3",{className:`text-2xl font-bold mb-6 ${t?"text-white":"text-gray-900"}`,children:r.dashboard.settings}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("button",{onClick:()=>c(!m),className:`
                w-full flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              `,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(F,{className:t?"text-gray-400":"text-gray-600"}),e.jsx("span",{className:t?"text-gray-300":"text-gray-700",children:r.dashboard.soundEffects})]}),e.jsx("div",{className:`w-12 h-6 rounded-full transition-colors ${m?"bg-green-500":"bg-gray-400"}`,children:e.jsx("div",{className:`w-6 h-6 rounded-full bg-white transform transition-transform ${m?"translate-x-6":"translate-x-0"}`})})]}),e.jsxs("button",{onClick:()=>b(!i),className:`
                w-full flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              `,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(Ct,{className:t?"text-gray-400":"text-gray-600"}),e.jsx("span",{className:t?"text-gray-300":"text-gray-700",children:r.dashboard.notifications})]}),e.jsx("div",{className:`w-12 h-6 rounded-full transition-colors ${i?"bg-green-500":"bg-gray-400"}`,children:e.jsx("div",{className:`w-6 h-6 rounded-full bg-white transform transition-transform ${i?"translate-x-6":"translate-x-0"}`})})]}),e.jsxs("button",{onClick:C,className:`
                w-full flex items-center justify-between p-3 rounded-xl
                ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white":"bg-purple-600 text-white"}
                hover:opacity-90 transition-opacity
              `,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(Fe,{className:"w-5 h-5"}),e.jsx("span",{children:k?"Retake Placement Test":"Take Placement Test"})]}),e.jsx(I,{className:"w-5 h-5 animate-pulse"})]}),e.jsxs("div",{className:`
              flex items-center justify-between p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            `,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(Yt,{className:t?"text-gray-400":"text-gray-600"}),e.jsx("span",{className:t?"text-gray-300":"text-gray-700",children:r.dashboard.switchChild})]}),e.jsx("select",{value:g,onChange:v=>f(v.target.value),className:`
                  bg-transparent
                  ${t?"text-gray-300":"text-gray-700"}
                  pr-8
                `,children:e.jsx("option",{value:g,children:g})})]})]})]})]})]})}function ls({message:t,isBot:a,isDarkMode:r,isVibrant:s}){return e.jsxs("div",{className:`
      flex items-start gap-4 p-4 rounded-xl
      ${a?r?"bg-gray-800":"bg-gray-100":"bg-transparent"}
    `,children:[e.jsx("div",{className:`
        flex-shrink-0 w-8 h-8 rounded-full
        flex items-center justify-center
        ${a?s?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600":r?"bg-gray-700":"bg-gray-200"}
      `,children:a?e.jsx(Pt,{className:"w-5 h-5 text-white"}):e.jsx(He,{className:"w-5 h-5 text-gray-600"})}),e.jsx("div",{className:`
        flex-1
        ${r?"text-white":"text-gray-900"}
      `,children:t})]})}const Ie="Hi! I'm here to help find the perfect learning path for you. Let's start with a few questions to understand your needs better. What's your child's age?";function et({isDarkMode:t,isVibrant:a,onComplete:r}){const{user:s}=ne(),[o,u]=n.useState(!0),[m,c]=n.useState([]),[i,b]=n.useState(""),[j,k]=n.useState(!1),[g,f]=n.useState(0),h=n.useRef(null),C=["Great! Now, has your child started learning the alphabet yet?","Does your child enjoy interactive games with sound and music?","How comfortable is your child with using digital devices?","What specific skills would you like your child to develop? (e.g., reading, vocabulary, pronunciation)","Last question: How much time can your child typically focus on learning activities?"];n.useEffect(()=>{v()},[m]),n.useEffect(()=>{o&&(c([{text:Ie,isBot:!0}]),f(0),b(""))},[o]);const v=()=>{h.current&&h.current.scrollIntoView({behavior:"smooth"})},d=async()=>{if(!i.trim()||!s)return;const l={text:i,isBot:!1};c(y=>[...y,l]),b(""),k(!0);try{if(g<C.length)c(y=>[...y,{text:C[g],isBot:!0}]),f(y=>y+1);else{console.log("Making OpenAI API call...");const y=await fetch("/.netlify/functions/openaiProxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:Ie,responses:m.map($=>({text:$.text,isUser:!$.isBot}))})});if(!y.ok)throw new Error(`API call failed with status: ${y.status}`);const w=await y.json();if(console.log("OpenAI API response:",w),w.error)throw new Error(w.error);const p={userId:s.uid,chatResponse:w.chatResponse,lessons:w.lessons,completedAt:new Date().toISOString()};await as(p),console.log("Placement test result saved:",p),c($=>[...$,{text:w.chatResponse,isBot:!0}]),r==null||r(p),setTimeout(()=>u(!1),5e3)}}catch(y){console.error("Error during placement test:",y),c(w=>[...w,{text:"I'm sorry, there was an error processing your responses. Please try again later.",isBot:!0}])}finally{k(!1)}};return o?e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",children:e.jsxs("div",{className:`
        relative w-full max-w-2xl rounded-2xl
        ${t?"bg-gray-900":"bg-white"}
        shadow-2xl
        overflow-hidden
      `,children:[e.jsxs("div",{className:`
          flex items-center justify-between
          px-6 py-4 border-b
          ${t?"border-gray-800":"border-gray-200"}
        `,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(I,{className:`
              w-6 h-6
              ${a?"text-purple-500":t?"text-white":"text-gray-900"}
            `}),e.jsx("h2",{className:`
              text-xl font-bold
              ${t?"text-white":"text-gray-900"}
            `,children:"Placement Test"})]}),e.jsx("button",{onClick:()=>u(!1),className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",children:e.jsx(ye,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"h-[400px] overflow-y-auto p-4 space-y-4",children:[m.map((l,y)=>e.jsx(ls,{message:l.text,isBot:l.isBot,isDarkMode:t,isVibrant:a},y)),j&&e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"})}),e.jsx("div",{ref:h})]}),e.jsx("div",{className:`
          p-4 border-t
          ${t?"border-gray-800":"border-gray-200"}
        `,children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("input",{type:"text",value:i,onChange:l=>b(l.target.value),onKeyPress:l=>l.key==="Enter"&&d(),placeholder:"Type your answer...",className:`
                flex-1 px-4 py-2 rounded-xl
                ${t?"bg-gray-800 text-white placeholder-gray-400":"bg-gray-100 text-gray-900 placeholder-gray-500"}
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}),e.jsx("button",{onClick:d,disabled:!i.trim()||j,className:`
                p-2 rounded-xl
                ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
                text-white
                disabled:opacity-50
                transition-all duration-200
                hover:scale-105
              `,children:e.jsx(ie,{className:"w-6 h-6"})})]})})]})}):null}function is({language:t,isDarkMode:a,isVibrant:r,t:s}){const{selectedChild:o,isParentMode:u,toggleParentMode:m,learningStreak:c,xpPoints:i,showPlacementTest:b,showCelebration:j,setPlacementTestResult:k}=we();return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{className:`rounded-2xl p-6 mb-8 ${a?"bg-gray-800":"bg-white"} shadow-xl transition-all duration-300`,children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-6",children:[e.jsxs("div",{className:"relative group",children:[e.jsx("div",{className:`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${r?"bg-gradient-to-r from-purple-400 via-pink-400 to-red-400":"bg-blue-200"}`}),e.jsx("div",{className:`
                relative w-32 h-32 rounded-full
                flex items-center justify-center
                border-4 border-white dark:border-gray-700
                shadow-lg transform hover:scale-105
                transition-transform duration-300
                ${r?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
                text-white text-4xl font-bold
              `,children:o[0].toUpperCase()})]}),e.jsxs("div",{className:"flex-grow text-center md:text-left",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-800 dark:text-white mb-2",children:o}),e.jsxs("div",{className:"flex flex-wrap justify-center md:justify-start gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Tt,{className:"w-5 h-5 text-orange-500"}),e.jsxs("span",{className:"text-gray-600 dark:text-gray-300",children:[c," ",s.dashboard.streak]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{className:"w-5 h-5 text-yellow-500"}),e.jsxs("span",{className:"text-gray-600 dark:text-gray-300",children:[i," ",s.dashboard.xp]})]})]})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsx("button",{onClick:m,className:`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${u?"bg-purple-600 text-white hover:bg-purple-700":"bg-pink-500 text-white hover:bg-pink-600"}`,children:u?s.dashboard.kidMode:s.dashboard.parentMode})})]})}),u?e.jsx(os,{isDarkMode:a,isVibrant:r,t:s}):e.jsx(ns,{isDarkMode:a,isVibrant:r,language:t,t:s}),b&&e.jsx(et,{isDarkMode:a,isVibrant:r,onComplete:k}),j&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:t==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((g,f)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${f*.2}s`}},f))})]})})]})})}function cs(t){return e.jsx(rs,{children:e.jsx(is,{...t})})}const Ue=[{name:"apple",image:"https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=150&h=150"},{name:"balloon",image:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=150&h=150"},{name:"star",image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&h=150"},{name:"flower",image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=150&h=150"}];function ds({isDarkMode:t,isVibrant:a,onExit:r}){const[s,o]=n.useState(null),[u,m]=n.useState(0),[c,i]=n.useState([]),[b,j]=n.useState(0),[k,g]=n.useState(!1),[f,h]=n.useState(!0);n.useEffect(()=>{C()},[]);const C=()=>{const l=Ue[Math.floor(Math.random()*Ue.length)];o(l);const y=Math.floor(Math.random()*5)+1;m(y);let w=[y];for(;w.length<3;){const p=Math.floor(Math.random()*5)+1;w.includes(p)||w.push(p)}if(w=w.sort(()=>Math.random()-.5),i(w),f){const p=new SpeechSynthesisUtterance(`How many ${l.name}s do you see?`);p.rate=.8,p.pitch=1.2,window.speechSynthesis.speak(p)}},v=l=>{if(!f)return;const y={success:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_805cb3c75d.mp3",wrong:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73f04.mp3"},w=new Audio(y[l]);w.volume=l==="success"?.3:.2,w.play()},d=l=>{if(s){if(l===u){if(v("success"),j(b+1),g(!0),f){let y=1;const w=setInterval(()=>{const p=new SpeechSynthesisUtterance(y.toString());p.rate=.8,p.pitch=1.2,window.speechSynthesis.speak(p),y===u&&(clearInterval(w),setTimeout(()=>{const $=new SpeechSynthesisUtterance(`Yes! There are ${u} ${s.name}s!`);$.rate=.8,$.pitch=1.2,window.speechSynthesis.speak($)},1e3)),y++},800)}setTimeout(()=>{g(!1),C()},u*800+3e3)}else if(v("wrong"),f){const y=new SpeechSynthesisUtterance("Try counting again!");y.rate=.8,y.pitch=1.2,window.speechSynthesis.speak(y)}}};return s?e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:b})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"grid grid-cols-3 gap-4 mb-8",children:Array.from({length:u}).map((l,y)=>e.jsx("div",{className:`
                  aspect-square rounded-xl overflow-hidden
                  transform hover:scale-105
                  transition-all duration-300
                  shadow-lg
                `,children:e.jsx("img",{src:s.image,alt:s.name,className:"w-full h-full object-cover"})},y))}),e.jsx("div",{className:"flex justify-center gap-6",children:c.map((l,y)=>e.jsx("button",{onClick:()=>d(l),className:`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic text-white
                  transform hover:scale-110
                  transition-all duration-300
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-gray-700":"bg-purple-600"}
                  shadow-lg
                `,children:l},y))}),e.jsxs("div",{className:"flex justify-center space-x-4 mt-8",children:[e.jsx("button",{onClick:C,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(V,{className:"w-6 h-6"})}),e.jsx("button",{onClick:()=>h(!f),className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${f?"":"opacity-50"}`})})]}),k&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:"Perfect! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((l,y)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${y*.2}s`}},y))})]})})]})]})}):null}const ce={en:{letterMatching:{pairs:[{word:"Apple",letter:"A",image:"https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=300&h=300"},{word:"Ball",letter:"B",image:"https://images.unsplash.com/photo-1515548950066-8e1c7e9e6c62?auto=format&fit=crop&w=300&h=300"},{word:"Cat",letter:"C",image:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300"},{word:"Dog",letter:"D",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300"},{word:"Elephant",letter:"E",image:"https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=300&h=300"}],celebrations:{success:"Fantastic! 🎉",letterFound:(t,a)=>`"${t}" is for "${a}"!`}},wordBuilder:{words:[{word:"CAT",image:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&h=200"},{word:"DOG",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&h=200"},{word:"SUN",image:"https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=200&h=200"},{word:"HAT",image:"https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=200&h=200"}],celebrations:{success:"Wonderful! 🎉",wordBuilt:t=>`You built the word "${t}"!`}},phonetics:[{letter:"B",sound:"buh",example:"ball",color:"from-blue-400 to-blue-600"},{letter:"D",sound:"duh",example:"dog",color:"from-green-400 to-green-600"},{letter:"F",sound:"fuh",example:"fish",color:"from-yellow-400 to-yellow-600"},{letter:"M",sound:"mmm",example:"moon",color:"from-purple-400 to-purple-600"}],letterPairs:[["b","d","p","q"],["m","n","w"],["i","l","t"],["a","e","o"]],celebrations:{success:"Great job! 🎉",tryAgain:"Try again!",letterSound:(t,a)=>`Correct! ${t} says ${a}!`}},es:{letterMatching:{pairs:[{word:"Árbol",letter:"A",image:"https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&h=300"},{word:"Barco",letter:"B",image:"https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=300&h=300"},{word:"Casa",letter:"C",image:"https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=300&h=300"},{word:"Dedo",letter:"D",image:"https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&h=300"},{word:"Estrella",letter:"E",image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&h=300"}],celebrations:{success:"¡Fantástico! 🎉",letterFound:(t,a)=>`"${t}" es para "${a}"!`}},wordBuilder:{words:[{word:"SOL",image:"https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=200&h=200"},{word:"PAN",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&h=200"},{word:"LUZ",image:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=200&h=200"},{word:"MAR",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=200"}],celebrations:{success:"¡Maravilloso! 🎉",wordBuilt:t=>`¡Has construido la palabra "${t}"!`}},phonetics:[{letter:"B",sound:"be",example:"barco",color:"from-blue-400 to-blue-600"},{letter:"D",sound:"de",example:"dedo",color:"from-green-400 to-green-600"},{letter:"F",sound:"efe",example:"foca",color:"from-yellow-400 to-yellow-600"},{letter:"M",sound:"eme",example:"mesa",color:"from-purple-400 to-purple-600"}],letterPairs:[["b","v","d","p"],["m","n","ñ"],["i","í","y"],["a","á","e","é"]],celebrations:{success:"¡Muy bien! 🎉",tryAgain:"¡Inténtalo de nuevo!",letterSound:(t,a)=>`¡Correcto! ${t} dice ${a}!`}}},us=t=>ce[t].letterMatching.pairs,Re=t=>ce[t].letterMatching.celebrations;function tt({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(null),[j,k]=n.useState([]),[g,f]=n.useState(0),[h,C]=n.useState(0),[v,d]=n.useState(!1),[l,y]=n.useState(!1);n.useEffect(()=>{w()},[]);const w=()=>{const P=us(s),x=P[Math.floor(Math.random()*P.length)];b(x);let N=[x.letter];for(;N.length<3;){const S=P[Math.floor(Math.random()*P.length)];N.includes(S.letter)||N.push(S.letter)}N=N.sort(()=>Math.random()-.5),k(N),C(0),d(!1),o&&c(s==="es"?`¿Qué letra es para ${x.word}?`:`What letter is for ${x.word}?`,s==="es"?"es-ES":"en-US")},p=P=>{if(i)if(P===i.letter){if(m("success"),f(g+1),y(!0),o){const x=Re(s);c(x.letterFound(i.letter,i.word),s==="es"?"es-ES":"en-US")}setTimeout(()=>{y(!1),w()},2e3)}else{m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US");const x=h+1;C(x),x>=3&&d(!0)}};if(!i)return null;const $=Re(s);return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:g})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsxs("div",{className:"relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg",children:[e.jsx("img",{src:i.image,alt:i.word,className:"w-full h-full object-cover"}),e.jsx("div",{className:`
                absolute bottom-0 left-0 right-0
                p-4 text-center
                bg-black/50 backdrop-blur-sm
                text-white text-2xl font-bold font-comic
              `,children:i.word})]})}),e.jsx("div",{className:"flex justify-center gap-6",children:j.map((P,x)=>e.jsx("button",{onClick:()=>p(P),className:`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  transform hover:scale-110
                  transition-all duration-300
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white":t?"bg-gray-700 text-white":"bg-purple-600 text-white"}
                  ${v&&P===i.letter?"animate-pulse ring-4 ring-yellow-400":""}
                  shadow-lg
                `,children:P},x))}),e.jsxs("div",{className:"flex justify-center space-x-4 mt-8",children:[e.jsx("button",{onClick:w,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(V,{className:"w-6 h-6"})}),e.jsx("button",{onClick:u,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),l&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:$.success}),e.jsx("p",{className:"text-2xl text-white mb-4",children:$.letterFound(i.letter,i.word)}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((P,x)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${x*.2}s`}},x))})]})})]})]})})}const hs=t=>ce[t].letterPairs;function st({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(""),[j,k]=n.useState([]),[g,f]=n.useState(0),[h,C]=n.useState(0),[v,d]=n.useState(!1),[l,y]=n.useState(!1),[w,p]=n.useState(!1);n.useEffect(()=>{$()},[]);const $=()=>{const x=hs(s),N=x[Math.floor(Math.random()*x.length)],S=N[Math.floor(Math.random()*N.length)];let L=[...N];const T="abcdefghijklmnopqrstuvwxyz";for(;L.length<12;){const G=T[Math.floor(Math.random()*T.length)];L.includes(G)||L.push(G)}L=L.sort(()=>Math.random()-.5),b(S),k(L),C(0),d(!1),y(!1),o&&c(s==="es"?`Encuentra la letra ${S}`:`Find the letter ${S}`,s==="es"?"es-ES":"en-US")},P=x=>{l||(x===i?(y(!0),p(!0),f(g+1),m("success"),o&&c(s==="es"?"¡Excelente trabajo!":"Great job!",s==="es"?"es-ES":"en-US"),setTimeout(()=>{p(!1),$()},2e3)):(m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US"),C(h+1),h+1>=3&&d(!0)))};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:g})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2",children:s==="es"?"Encuentra la letra:":"Find the letter:"}),e.jsx("div",{className:`
              inline-block px-8 py-4 rounded-2xl
              ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
              shadow-lg
            `,children:e.jsx("span",{className:"text-6xl font-bold text-white font-comic",children:i.toUpperCase()})})]}),e.jsx("div",{className:"grid grid-cols-3 sm:grid-cols-4 gap-4",children:j.map((x,N)=>e.jsxs("button",{onClick:()=>P(x),className:`
                  relative aspect-square
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  rounded-2xl
                  transform hover:scale-105
                  transition-all duration-300
                  ${t?"bg-gray-700":"bg-gray-100"}
                  ${v&&x===i?"animate-pulse ring-4 ring-yellow-400":""}
                  ${x===i&&l?"bg-green-500 text-white":""}
                  disabled:opacity-50
                `,disabled:l,children:[x.toUpperCase(),x===i&&w&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(I,{className:"w-8 h-8 text-yellow-400 animate-spin"})})]},`${x}-${N}`))}),e.jsx("div",{className:"mt-4 flex justify-center",children:e.jsx("button",{onClick:u,className:`
                p-3 rounded-full
                ${t?"bg-gray-800":"bg-white"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})}),w&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((x,N)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${N*.2}s`}},N))})]})})]})]})})}const ms=t=>ce[t].phonetics;function at({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const[o,u]=n.useState(null),[m,c]=n.useState([]),[i,b]=n.useState(0),[j,k]=n.useState(0),[g,f]=n.useState(!1),[h,C]=n.useState(!1),[v,d]=n.useState(!1),[l,y]=n.useState(!0);n.useEffect(()=>{w()},[]);const w=()=>{const x=ms(s),N=x[Math.floor(Math.random()*x.length)];u(N);let S=[N.letter];for(;S.length<3;){const L=x[Math.floor(Math.random()*x.length)];S.includes(L.letter)||S.push(L.letter)}S=S.sort(()=>Math.random()-.5),c(S),k(0),f(!1),d(!1)},p=()=>{if(!o||!l)return;d(!0);const x=new SpeechSynthesisUtterance;x.text=`${o.letter} says ${o.sound}, as in ${o.example}`,x.rate=.8,x.pitch=1.2,x.onend=()=>d(!1),window.speechSynthesis.speak(x)},$=x=>{if(!l)return;const N={success:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_805cb3c75d.mp3",wrong:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73f04.mp3"},S=new Audio(N[x]);S.volume=x==="success"?.3:.2,S.play()},P=x=>{if(o)if(x===o.letter){$("success"),b(i+1),C(!0);const N=new SpeechSynthesisUtterance;N.text=`Correct! ${o.letter} says ${o.sound}!`,N.rate=.8,N.pitch=1.2,window.speechSynthesis.speak(N),setTimeout(()=>{C(!1),w()},2e3)}else{$("wrong");const N=j+1;k(N),N>=3&&f(!0)}};return o?e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:i})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"flex justify-center mb-12",children:e.jsxs("button",{onClick:p,disabled:v,className:`
                relative w-32 h-32 rounded-full
                ${a?`bg-gradient-to-r ${o.color}`:t?"bg-gray-700":"bg-purple-600"}
                transform hover:scale-110
                transition-all duration-300
                disabled:opacity-50
                shadow-lg
              `,children:[e.jsx(le,{className:`
                w-16 h-16 mx-auto text-white
                ${v?"animate-pulse":""}
              `}),v&&e.jsx("div",{className:"absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"})]})}),e.jsx("div",{className:"flex justify-center gap-6",children:m.map((x,N)=>e.jsx("button",{onClick:()=>P(x),className:`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  transform hover:scale-110
                  transition-all duration-300
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white":t?"bg-gray-700 text-white":"bg-purple-600 text-white"}
                  ${g&&x===o.letter?"animate-pulse ring-4 ring-yellow-400":""}
                  shadow-lg
                `,children:x},N))}),e.jsxs("div",{className:"flex justify-center space-x-4 mt-8",children:[e.jsx("button",{onClick:w,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(V,{className:"w-6 h-6"})}),e.jsx("button",{onClick:()=>y(!l),className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${l?"":"opacity-50"}`})})]}),h&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:"Excellent! 🎉"}),e.jsxs("p",{className:"text-2xl text-white mb-4",children:[o.letter,' says "',o.sound,'"!']}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((x,N)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${N*.2}s`}},N))})]})})]})]})}):null}const H=[{word:"CAT",image:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300",translations:{en:"cat",es:"gato"}},{word:"DOG",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300",translations:{en:"dog",es:"perro"}},{word:"SUN",image:"https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=300&h=300",translations:{en:"sun",es:"sol"}}];function rt({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(0),[j,k]=n.useState([]),[g,f]=n.useState([]),[h,C]=n.useState(0),[v,d]=n.useState(!1),[l,y]=n.useState(!1);n.useEffect(()=>{w()},[]);const w=()=>{k([]);let P=H[i].word.split("");const x="ABCDEFGHIJKLMNOPQRSTUVWXYZ",N=new Set(P);for(;P.length<8;){const S=x[Math.floor(Math.random()*x.length)];N.has(S)||(P.push(S),N.add(S))}if(P=P.sort(()=>Math.random()-.5),f(P),o){const S=s==="es"?`¿Puedes deletrear ${H[i].translations.es}?`:`Can you spell ${H[i].translations.en}?`;c(S,s==="es"?"es-ES":"en-US")}},p=($,P)=>{m("click"),k([...j,$]);const x=[...g];x.splice(P,1),f(x);const N=[...j,$].join("");N.length===H[i].word.length&&(N===H[i].word?(m("success"),o&&c(s==="es"?"¡Excelente trabajo!":"Great job!",s==="es"?"es-ES":"en-US"),C(h+1),d(!0),setTimeout(()=>{d(!1),i<H.length-1&&(b(S=>S+1),w())},2e3)):(m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US"),y(!0),setTimeout(()=>{y(!1),k([]),w()},1e3)))};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:h})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsx("div",{className:"relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg",children:e.jsx("img",{src:H[i].image,alt:H[i].translations[s],className:"w-full h-full object-cover"})})}),e.jsx("div",{className:"mb-8",children:e.jsx("div",{className:"flex justify-center space-x-4",children:H[i].word.split("").map(($,P)=>e.jsx("div",{className:`
                    w-16 h-16 rounded-xl
                    flex items-center justify-center
                    text-3xl font-bold font-comic
                    border-4 border-dashed
                    ${t?"border-gray-600":"border-gray-300"}
                    ${j[P]?t?"bg-gray-700":"bg-gray-100":""}
                  `,children:j[P]||""},`slot-${P}`))})}),e.jsx("div",{className:"flex justify-center flex-wrap gap-4",children:g.map(($,P)=>e.jsx("button",{onClick:()=>p($,P),className:`
                  w-16 h-16 rounded-xl
                  flex items-center justify-center
                  text-3xl font-bold font-comic text-white
                  transform hover:scale-110
                  transition-all duration-300
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-gray-700":"bg-purple-600"}
                  shadow-lg
                `,children:$},`letter-${P}`))}),e.jsxs("div",{className:"flex justify-center mt-8",children:[e.jsx("button",{onClick:w,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(V,{className:"w-6 h-6"})}),e.jsx("button",{onClick:u,className:`
                p-3 rounded-full ml-4
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),v&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map(($,P)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${P*.2}s`}},P))})]})}),l&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-3xl",children:e.jsx("div",{className:"text-center",children:e.jsx("h3",{className:"text-2xl font-bold text-white",children:s==="es"?"¡Inténtalo de nuevo!":"Try again!"})})})]})]})})}const Y=[{id:"circle",path:"M50 90a40 40 0 1 0 0-80 40 40 0 0 0 0 80z",name:{en:"circle",es:"círculo"},color:"from-blue-400 to-blue-600"},{id:"square",path:"M10 10h80v80H10z",name:{en:"square",es:"cuadrado"},color:"from-green-400 to-green-600"},{id:"triangle",path:"M50 10L90 90H10z",name:{en:"triangle",es:"triángulo"},color:"from-yellow-400 to-yellow-600"},{id:"star",path:"M50 10l12 24 26 4-19 18 4 26-23-12-23 12 4-26-19-18 26-4z",name:{en:"star",es:"estrella"},color:"from-purple-400 to-purple-600"},{id:"heart",path:"M50 90c30-20 40-38 40-48 0-22-40-22-40 0 0-22-40-22-40 0 0 10 10 28 40 48z",name:{en:"heart",es:"corazón"},color:"from-red-400 to-red-600"}];function ps({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(0),[j,k]=n.useState([]),[g,f]=n.useState(0),[h,C]=n.useState(!1),[v,d]=n.useState(!1);n.useEffect(()=>{o&&!v&&c(s==="es"?"¡Vamos a aprender las formas!":"Let's learn about shapes!",s==="es"?"es-ES":"en-US")},[v]),n.useEffect(()=>{v&&l()},[v]);const l=()=>{const w=Y[i];let p=[w];for(;p.length<3;){const $=Y[Math.floor(Math.random()*Y.length)];p.find(P=>P.id===$.id)||p.push($)}if(p=p.sort(()=>Math.random()-.5),k(p),o){const $=s==="es"?`¿Puedes encontrar el ${w.name.es}?`:`Can you find the ${w.name.en}?`;c($,s==="es"?"es-ES":"en-US")}},y=w=>{w.id===Y[i].id?(m("success"),o&&c(s==="es"?"¡Excelente trabajo!":"Great job!",s==="es"?"es-ES":"en-US"),f(g+1),C(!0),setTimeout(()=>{C(!1),i<Y.length-1&&(b(p=>p+1),l())},2e3)):(m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US"))};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${t?"bg-gray-800":"bg-white"}
            shadow-lg
          `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:g})]}),e.jsx("button",{onClick:u,className:`
              p-3 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[v?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center mb-12",children:e.jsx("div",{className:`
                  w-48 h-48 rounded-2xl
                  ${a?`bg-gradient-to-r ${Y[i].color}`:t?"bg-gray-700":"bg-purple-600"}
                  flex items-center justify-center
                  shadow-lg
                `,children:e.jsx("svg",{viewBox:"0 0 100 100",className:"w-32 h-32 text-white",children:e.jsx("path",{d:Y[i].path,fill:"currentColor"})})})}),e.jsx("div",{className:"grid grid-cols-3 gap-6",children:j.map((w,p)=>e.jsx("button",{onClick:()=>y(w),className:`
                      aspect-square rounded-2xl
                      flex items-center justify-center
                      transform hover:scale-110
                      transition-all duration-300
                      ${a?`bg-gradient-to-r ${w.color}`:t?"bg-gray-700":"bg-purple-600"}
                      shadow-lg
                    `,children:e.jsx("svg",{viewBox:"0 0 100 100",className:"w-24 h-24 text-white",children:e.jsx("path",{d:w.path,fill:"currentColor"})})},p))})]}):e.jsxs("div",{className:"flex flex-col items-center space-y-8",children:[e.jsx("h1",{className:`
                text-4xl font-bold text-center
                ${t?"text-white":"text-gray-900"}
              `,children:s==="es"?"¡Formas Divertidas!":"Fun Shapes!"}),e.jsx("div",{className:"grid grid-cols-3 gap-8",children:Y.slice(0,3).map((w,p)=>e.jsx("div",{className:`
                      aspect-square rounded-2xl
                      ${a?`bg-gradient-to-r ${w.color}`:t?"bg-gray-700":"bg-purple-600"}
                      flex items-center justify-center
                      transform hover:scale-110
                      transition-all duration-300
                      animate-float
                    `,style:{animationDelay:`${p*.2}s`},children:e.jsx("svg",{viewBox:"0 0 100 100",className:"w-24 h-24 text-white",children:e.jsx("path",{d:w.path,fill:"currentColor"})})},p))}),e.jsxs("button",{onClick:()=>d(!0),className:`
                  px-8 py-4 rounded-xl
                  flex items-center gap-2
                  font-bold text-white
                  transform hover:scale-105
                  transition-all duration-300
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"}
                `,children:[e.jsx(le,{className:"w-6 h-6"}),e.jsx("span",{children:s==="es"?"Comenzar":"Start"})]})]}),h&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((w,p)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${p*.2}s`}},p))})]})})]})]})})}const D=[{name:"happy",prompt:"Find the happy face!",seed:"happy&eyes=happy&mouth=smile"},{name:"sad",prompt:"Where is the sad face?",seed:"sad&eyes=cry&mouth=frown"},{name:"surprised",prompt:"Can you find the surprised face?",seed:"surprised&eyes=wide&mouth=open"},{name:"sleepy",prompt:"Who looks sleepy?",seed:"sleepy&eyes=closed&mouth=sleep"},{name:"excited",prompt:"Find the excited face!",seed:"excited&eyes=stars&mouth=laugh"}];function xs({isDarkMode:t,isVibrant:a,onExit:r}){const[s,o]=n.useState(null),[u,m]=n.useState([]),[c,i]=n.useState(0),[b,j]=n.useState(!1),[k,g]=n.useState(!0);n.useEffect(()=>{f()},[]);const f=()=>{const v=D[Math.floor(Math.random()*D.length)];o(v);let d=[v.name];for(;d.length<3;){const l=D[Math.floor(Math.random()*D.length)];d.includes(l.name)||d.push(l.name)}if(d=d.sort(()=>Math.random()-.5),m(d),k){const l=new SpeechSynthesisUtterance(v.prompt);l.rate=.8,l.pitch=1.2,window.speechSynthesis.speak(l)}},h=v=>{if(!k)return;const d={success:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_805cb3c75d.mp3",wrong:"https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73f04.mp3"},l=new Audio(d[v]);l.volume=v==="success"?.3:.2,l.play()},C=v=>{if(s){if(v===s.name){if(h("success"),i(c+1),j(!0),k){const d=new SpeechSynthesisUtterance("Great job! You found the "+s.name+" face!");d.rate=.8,d.pitch=1.2,window.speechSynthesis.speak(d)}setTimeout(()=>{j(!1),f()},2e3)}else if(h("wrong"),k){const d=new SpeechSynthesisUtterance("Try again!");d.rate=.8,d.pitch=1.2,window.speechSynthesis.speak(d)}}};return s?e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsx("button",{onClick:r,className:`
              p-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(Q,{className:"w-6 h-6"})}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsxs("div",{className:`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
            `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:c})]})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"text-center mb-8",children:e.jsx("h2",{className:`text-2xl font-bold ${t?"text-white":"text-gray-900"}`,children:s.prompt})}),e.jsx("div",{className:"grid grid-cols-3 gap-6",children:u.map((v,d)=>{const l=D.find(y=>y.name===v);return e.jsx("button",{onClick:()=>C(v),className:`
                    aspect-square rounded-2xl
                    flex items-center justify-center
                    transform hover:scale-110
                    transition-all duration-300
                    ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-gray-700":"bg-purple-600"}
                    shadow-lg
                    overflow-hidden
                  `,children:e.jsx("img",{src:`https://api.dicebear.com/7.x/bottts/svg?seed=${(l==null?void 0:l.seed)||""}&backgroundColor=transparent`,alt:v,className:"w-full h-full p-4"})},d)})}),e.jsxs("div",{className:"flex justify-center space-x-4 mt-8",children:[e.jsx("button",{onClick:f,className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(V,{className:"w-6 h-6"})}),e.jsx("button",{onClick:()=>g(!k),className:`
                p-3 rounded-full
                ${t?"bg-gray-700":"bg-gray-100"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(F,{className:`w-6 h-6 ${k?"":"opacity-50"}`})})]}),b&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:"Wonderful! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((v,d)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${d*.2}s`}},d))})]})})]})]})}):null}const ue=[{id:"cat",image:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300",sound:{en:"meow",es:"miau"},name:{en:"cat",es:"gato"},responses:{correct:{en:"That's right! Can you meow like a cat?",es:"¡Correcto! ¿Puedes maullar como un gato?"},sound:{en:"Great meowing! You sound just like a cat!",es:"¡Excelente maullido! ¡Suenas igual que un gato!"}}},{id:"dog",image:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300",sound:{en:"woof",es:"guau"},name:{en:"dog",es:"perro"},responses:{correct:{en:"Yes! Can you bark like a dog?",es:"¡Sí! ¿Puedes ladrar como un perro?"},sound:{en:"Wonderful barking! You're a natural!",es:"¡Excelente ladrido! ¡Eres un natural!"}}},{id:"cow",image:"https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&h=300",sound:{en:"moo",es:"mu"},name:{en:"cow",es:"vaca"},responses:{correct:{en:"Correct! Can you moo like a cow?",es:"¡Correcto! ¿Puedes mugir como una vaca?"},sound:{en:"Perfect moo! Just like a real cow!",es:"¡Perfecto mugido! ¡Igual que una vaca de verdad!"}}}];function gs({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(0),[j,k]=n.useState("name"),[g,f]=n.useState(0),[h,C]=n.useState(!1),[v,d]=n.useState([]),[l,y]=n.useState("");n.useEffect(()=>{if(o){const p=s==="es"?"¡Hola! ¿Qué animal es este?":"Hi! What animal is this?";d([{text:p,isUser:!1}]),c(p,s==="es"?"es-ES":"en-US")}},[]);const w=()=>{if(!l.trim())return;const p=ue[i],$={text:l,isUser:!0};d(P=>[...P,$]),y(""),setTimeout(()=>{if(j==="name")if(l.toLowerCase().includes(p.name[s].toLowerCase())){m("success");const x=p.responses.correct[s];d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US"),k("sound")}else{m("error");const x=s==="es"?"¡Inténtalo de nuevo!":"Try again!";d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US")}else if(j==="sound"){const P=p.sound[s];if(l.toLowerCase().includes(P.toLowerCase())){m("success");const N=p.responses.sound[s];d(S=>[...S,{text:N,isUser:!1}]),c(N,s==="es"?"es-ES":"en-US"),f(g+1),C(!0),setTimeout(()=>{if(C(!1),i<ue.length-1){b(L=>L+1),k("name");const S=s==="es"?"¿Qué animal es este?":"What animal is this?";d([{text:S,isUser:!1}]),c(S,s==="es"?"es-ES":"en-US")}else{const S=s==="es"?"¡Felicitaciones! ¡Has completado el juego!":"Congratulations! You've completed the game!";d(L=>[...L,{text:S,isUser:!1}]),c(S,s==="es"?"es-ES":"en-US")}},2e3)}else{m("error");const N=s==="es"?"¡Inténtalo de nuevo!":"Try again!";d(S=>[...S,{text:N,isUser:!1}]),c(N,s==="es"?"es-ES":"en-US")}}},500)};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${t?"bg-gray-800":"bg-white"}
            shadow-lg
          `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:g})]}),e.jsx("button",{onClick:u,className:`
              p-3 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsx("div",{className:"relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg",children:e.jsx("img",{src:ue[i].image,alt:"Animal",className:"w-full h-full object-cover"})})}),e.jsx("div",{className:"mb-8 space-y-4 max-h-60 overflow-y-auto",children:v.map((p,$)=>e.jsx("div",{className:`
                  flex ${p.isUser?"justify-end":"justify-start"}
                `,children:e.jsx("div",{className:`
                  max-w-[80%] px-4 py-2 rounded-xl
                  ${p.isUser?a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white":"bg-purple-600 text-white":t?"bg-gray-700 text-white":"bg-gray-100 text-gray-900"}
                `,children:p.text})},$))}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("input",{type:"text",value:l,onChange:p=>y(p.target.value),onKeyPress:p=>p.key==="Enter"&&w(),placeholder:s==="es"?"Escribe tu respuesta...":"Type your answer...",className:`
                flex-1 px-4 py-3 rounded-xl
                ${t?"bg-gray-700 text-white placeholder-gray-400":"bg-gray-100 text-gray-900 placeholder-gray-500"}
                focus:outline-none focus:ring-2 focus:ring-purple-400
              `}),e.jsx("button",{onClick:w,className:`
                p-3 rounded-xl
                ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
                text-white
                transform hover:scale-105
                transition-all duration-300
              `,children:e.jsx(ie,{className:"w-6 h-6"})})]}),h&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((p,$)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${$*.2}s`}},$))})]})})]})]})})}const he=[{id:"shirt",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&h=300",name:{en:"shirt",es:"camisa"},color:{en:"blue",es:"azul"},responses:{nameCorrect:{en:"That's right! What color is the shirt?",es:"¡Correcto! ¿De qué color es la camisa?"},colorCorrect:{en:"Perfect! It's a blue shirt!",es:"¡Perfecto! ¡Es una camisa azul!"}}},{id:"pants",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&h=300",name:{en:"pants",es:"pantalones"},color:{en:"black",es:"negros"},responses:{nameCorrect:{en:"Yes! What color are the pants?",es:"¡Sí! ¿De qué color son los pantalones?"},colorCorrect:{en:"Great! They're black pants!",es:"¡Genial! ¡Son pantalones negros!"}}},{id:"shoes",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&h=300",name:{en:"shoes",es:"zapatos"},color:{en:"red",es:"rojos"},responses:{nameCorrect:{en:"Correct! What color are the shoes?",es:"¡Correcto! ¿De qué color son los zapatos?"},colorCorrect:{en:"Excellent! They're red shoes!",es:"¡Excelente! ¡Son zapatos rojos!"}}}];function fs({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(0),[j,k]=n.useState("name"),[g,f]=n.useState(0),[h,C]=n.useState(!1),[v,d]=n.useState([]),[l,y]=n.useState("");n.useEffect(()=>{if(o){const p=s==="es"?"¡Hola! ¿Qué prenda de vestir es esta?":"Hi! What clothing item is this?";d([{text:p,isUser:!1}]),c(p,s==="es"?"es-ES":"en-US")}},[]);const w=()=>{if(!l.trim())return;const p=he[i],$={text:l,isUser:!0};d(P=>[...P,$]),y(""),setTimeout(()=>{if(j==="name")if(l.toLowerCase().includes(p.name[s].toLowerCase())){m("success");const x=p.responses.nameCorrect[s];d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US"),k("color")}else{m("error");const x=s==="es"?"¡Inténtalo de nuevo!":"Try again!";d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US")}else if(j==="color")if(l.toLowerCase().includes(p.color[s].toLowerCase())){m("success");const x=p.responses.colorCorrect[s];d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US"),f(g+1),C(!0),setTimeout(()=>{if(C(!1),i<he.length-1){b(S=>S+1),k("name");const N=s==="es"?"¿Qué prenda de vestir es esta?":"What clothing item is this?";d([{text:N,isUser:!1}]),c(N,s==="es"?"es-ES":"en-US")}else{const N=s==="es"?"¡Felicitaciones! ¡Has completado el juego!":"Congratulations! You've completed the game!";d(S=>[...S,{text:N,isUser:!1}]),c(N,s==="es"?"es-ES":"en-US")}},2e3)}else{m("error");const x=s==="es"?"¡Inténtalo de nuevo!":"Try again!";d(N=>[...N,{text:x,isUser:!1}]),c(x,s==="es"?"es-ES":"en-US")}},500)};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${t?"bg-gray-800":"bg-white"}
            shadow-lg
          `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:g})]}),e.jsx("button",{onClick:u,className:`
              p-3 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
        `,children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsx("div",{className:"relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg",children:e.jsx("img",{src:he[i].image,alt:"Clothing item",className:"w-full h-full object-cover"})})}),e.jsx("div",{className:"mb-8 space-y-4 max-h-60 overflow-y-auto",children:v.map((p,$)=>e.jsx("div",{className:`
                  flex ${p.isUser?"justify-end":"justify-start"}
                `,children:e.jsx("div",{className:`
                  max-w-[80%] px-4 py-2 rounded-xl
                  ${p.isUser?a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white":"bg-purple-600 text-white":t?"bg-gray-700 text-white":"bg-gray-100 text-gray-900"}
                `,children:p.text})},$))}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("input",{type:"text",value:l,onChange:p=>y(p.target.value),onKeyPress:p=>p.key==="Enter"&&w(),placeholder:s==="es"?"Escribe tu respuesta...":"Type your answer...",className:`
                flex-1 px-4 py-3 rounded-xl
                ${t?"bg-gray-700 text-white placeholder-gray-400":"bg-gray-100 text-gray-900 placeholder-gray-500"}
                focus:outline-none focus:ring-2 focus:ring-purple-400
              `}),e.jsx("button",{onClick:w,className:`
                p-3 rounded-xl
                ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
                text-white
                transform hover:scale-105
                transition-all duration-300
              `,children:e.jsx(ie,{className:"w-6 h-6"})})]}),h&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((p,$)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${$*.2}s`}},$))})]})})]})]})})}const ee=[{id:"table",name:{en:"on the table",es:"sobre la mesa"},position:{x:50,y:30},zone:{x:40,y:20,width:20,height:20}},{id:"chair",name:{en:"next to the chair",es:"junto a la silla"},position:{x:20,y:50},zone:{x:15,y:40,width:20,height:20}},{id:"bed",name:{en:"under the bed",es:"debajo de la cama"},position:{x:80,y:70},zone:{x:70,y:60,width:20,height:20}}];function ys({isDarkMode:t,isVibrant:a,onExit:r,language:s}){const{soundEnabled:o,toggleSound:u,playGameSound:m,speakText:c}=Z(),[i,b]=n.useState(0),[j,k]=n.useState(0),[g,f]=n.useState(!1),[h,C]=n.useState(!1),[v,d]=n.useState({x:50,y:50}),[l,y]=n.useState("dragging"),[w,p]=n.useState([]);n.useEffect(()=>{o&&$(),P()},[i,l]);const $=()=>{const T=ee[i],G=l==="dragging"?s==="es"?`¿Puedes poner el oso ${T.name.es}?`:`Can you put the bear ${T.name.en}?`:s==="es"?"¿Dónde está el oso?":"Where is the bear?";c(G,s==="es"?"es-ES":"en-US")},P=()=>{let T=ee.map(G=>G.name[s]);T=T.sort(()=>Math.random()-.5),p(T)},x=T=>{if(l!=="dragging")return;C(!0),m("click");const G="touches"in T?{x:T.touches[0].clientX,y:T.touches[0].clientY}:{x:T.clientX,y:T.clientY};d(G)},N=T=>{if(!h)return;const G="touches"in T?{x:T.touches[0].clientX,y:T.touches[0].clientY}:{x:T.clientX,y:T.clientY};d(G)},S=()=>{if(!h)return;C(!1);const T=ee[i].zone;v.x>=T.x&&v.x<=T.x+T.width&&v.y>=T.y&&v.y<=T.y+T.height?(m("success"),o&&c(s==="es"?"¡Muy bien! Ahora dime, ¿dónde está el oso?":"Great job! Now tell me, where is the bear?",s==="es"?"es-ES":"en-US"),y("answering")):(m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US"))},L=T=>{const G=ee[i].name[s];T===G?(m("success"),o&&c(s==="es"?"¡Excelente trabajo!":"Excellent job!",s==="es"?"es-ES":"en-US"),k(j+1),f(!0),setTimeout(()=>{f(!1),i<ee.length-1&&(b(R=>R+1),y("dragging"),d({x:50,y:50}))},2e3)):(m("error"),o&&c(s==="es"?"Inténtalo de nuevo":"Try again",s==="es"?"es-ES":"en-US"))};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${t?"bg-gray-800":"bg-white"}
            shadow-lg
          `,children:[e.jsx(q,{className:"w-5 h-5 text-yellow-400"}),e.jsx("span",{className:"font-bold",children:j})]}),e.jsx("button",{onClick:u,className:`
              p-3 rounded-full
              ${t?"bg-gray-800":"bg-white"}
              shadow-lg
              transition-transform hover:scale-110
            `,children:e.jsx(F,{className:`w-6 h-6 ${o?"":"opacity-50"}`})})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
          min-h-[600px]
        `,onMouseMove:N,onTouchMove:N,onMouseUp:S,onTouchEnd:S,children:[e.jsx("div",{className:"absolute inset-0 rounded-3xl overflow-hidden",children:e.jsxs("div",{className:"w-full h-full bg-gradient-to-b from-blue-100 to-blue-200",children:[e.jsxs("div",{className:"absolute",style:{left:"40%",top:"20%",width:"20%",height:"20%"},children:[e.jsx("div",{className:"w-full h-4 bg-brown-600 rounded-lg"})," "]}),e.jsxs("div",{className:"absolute",style:{left:"15%",top:"40%",width:"10%",height:"30%"},children:[e.jsx("div",{className:"w-full h-full bg-brown-500 rounded-lg"})," "]}),e.jsxs("div",{className:"absolute",style:{left:"70%",top:"60%",width:"25%",height:"10%"},children:[e.jsx("div",{className:"w-full h-full bg-brown-700 rounded-lg"})," "]})]})}),e.jsx("div",{className:`
              absolute w-16 h-16 cursor-move
              transform -translate-x-1/2 -translate-y-1/2
              transition-transform
              ${h?"scale-110":"scale-100"}
            `,style:{left:`${v.x}%`,top:`${v.y}%`},onMouseDown:x,onTouchStart:x,children:e.jsx("div",{className:`
              w-full h-full rounded-full
              ${a?"bg-gradient-to-b from-purple-500 to-pink-500":t?"bg-gray-700":"bg-purple-600"}
            `,children:e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("div",{className:"absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white"}),e.jsx("div",{className:"absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white"}),e.jsx("div",{className:"absolute bottom-1/3 left-1/2 w-4 h-2 rounded-full bg-white transform -translate-x-1/2"})]})})}),l==="answering"&&e.jsx("div",{className:"absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md",children:e.jsx("div",{className:"grid grid-cols-1 gap-4",children:w.map((T,G)=>e.jsx("button",{onClick:()=>L(T),className:`
                      px-6 py-3 rounded-xl
                      font-bold text-white
                      transform hover:scale-105
                      transition-all duration-300
                      ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"}
                    `,children:T},G))})}),g&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-4xl font-bold text-white mb-4",children:s==="es"?"¡Excelente! 🎉":"Great Job! 🎉"}),e.jsx("div",{className:"flex justify-center space-x-4",children:Array.from({length:3}).map((T,G)=>e.jsx(I,{className:"w-12 h-12 text-yellow-400 animate-spin",style:{animationDelay:`${G*.2}s`}},G))})]})})]})]})})}const bs={lettermatching:"teacher&backgroundColor=transparent&eyes=variant09&mouth=smile&hair=long16",counting:"math&backgroundColor=transparent&eyes=variant06&mouth=variant06&hair=long15",findletter:"detective&backgroundColor=transparent&eyes=variant04&mouth=variant04&hair=long14",phoneticsound:"sound&backgroundColor=transparent&eyes=variant07&mouth=variant07&hair=long13",wordbuilder:"writer&backgroundColor=transparent&eyes=variant05&mouth=variant05&hair=long12",shapesorter:"shapes&backgroundColor=transparent&eyes=variant03&mouth=variant03&hair=long11",emotionmatch:"happy&backgroundColor=transparent&eyes=variant02&mouth=variant02&hair=long10",chatwithgpt:"chat&backgroundColor=transparent&eyes=variant01&mouth=variant01&hair=long09",whatamiwearing:"fashion&backgroundColor=transparent&eyes=variant08&mouth=variant08&hair=long08",wheresmytoy:"explorer&backgroundColor=transparent&eyes=variant10&mouth=variant10&hair=long07"},Oe=[{id:"lettermatching",title:"📝 Letter Matching",description:"Match letters with pictures that start with that letter",targetSkills:["letters","phonics","letter-sound-correspondence","vocabulary"],difficultyLevel:"beginner",icon:"letter-matching",component:"LetterMatchingGame"},{id:"counting",title:"🔢 Counting Adventure",description:"Learn to count objects and recognize numbers",targetSkills:["numbers","counting","quantity-recognition","decision-making"],difficultyLevel:"beginner",icon:"counting",component:"CountingGame"}],ws={CountingGame:ds,LetterMatchingGame:tt,FindLetterGame:st,PhoneticSoundGame:at,WordBuilderGame:rt,ShapeSorterGame:ps,EmotionMatchGame:xs,ChatWithGPTGame:gs,WhatAmIWearingGame:fs,WheresMyToyGame:ys};function vs({isDarkMode:t,isVibrant:a,t:r,language:s}){const{user:o}=ne(),[u,m]=n.useState(null),[c,i]=n.useState(Oe),[b,j]=n.useState(!1);n.useEffect(()=>{(async()=>{if(o){const f=await Ve(o.uid);f!=null&&f.lessons&&i(f.lessons.slice(0,2))}else i(Oe)})()},[o]);const k=g=>{i(g.lessons.slice(0,2)),j(!1)};if(u){const g=c.find(f=>f.id===u);if(g!=null&&g.component){const f=ws[g.component];if(f)return e.jsx(f,{isDarkMode:t,isVibrant:a,onExit:()=>m(null),language:s})}}return e.jsx("div",{className:"min-h-[calc(100vh-5rem)] pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-[80%] mx-auto",children:[e.jsx("div",{className:"flex flex-col space-y-12",children:c.map(g=>e.jsx("div",{className:`
                relative transform
                hover:scale-105
                transition-all duration-500
                w-full
                mx-auto
              `,children:e.jsxs("button",{onClick:()=>m(g.id),className:`
                  relative w-full
                  flex flex-col items-center
                  rounded-3xl
                  transition-all duration-500
                  overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  ${t?"bg-gray-800/95":"bg-white/95"}
                  shadow-2xl
                  group
                  aspect-[2/1]
                `,children:[e.jsx("div",{className:`
                  absolute inset-0
                  bg-gradient-to-br from-purple-400 via-pink-500 to-red-500
                  opacity-15
                  group-hover:opacity-30
                  transition-opacity duration-500
                `}),e.jsxs("div",{className:"relative flex w-full h-full",children:[e.jsx("div",{className:"flex-1 flex items-center justify-center p-8",children:e.jsx("div",{className:"w-72 h-72 transform group-hover:scale-110 transition-transform duration-500",children:e.jsx("img",{src:`https://api.dicebear.com/7.x/adventurer/svg?seed=${bs[g.id]}`,alt:g.title,className:"w-full h-full object-contain",onError:f=>{const h=f.target;h.onerror=null,h.src="https://api.dicebear.com/7.x/adventurer/svg?seed=fallback"}})})}),e.jsxs("div",{className:"flex-1 flex flex-col justify-center p-8",children:[e.jsx("h3",{className:`
                      text-3xl font-bold mb-4 font-comic
                      ${t?"text-white":"text-gray-900"}
                    `,children:g.title}),e.jsx("p",{className:`
                      text-lg mb-6
                      ${t?"text-white/75":"text-gray-700/75"}
                    `,children:g.description})]})]}),e.jsx("div",{className:"absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",children:Array.from({length:3}).map((f,h)=>e.jsx(I,{className:`
                        absolute w-6 h-6
                        text-yellow-400
                        animate-pulse
                      `,style:{top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,animationDelay:`${h*.2}s`}},h))})]})},g.id))}),b&&e.jsx(et,{isDarkMode:t,isVibrant:a,onComplete:k})]})})}function js({isDarkMode:t,isVibrant:a,t:r}){const[s,o]=n.useState(""),[u,m]=n.useState("es"),[c,i]=n.useState(!1),b=g=>{const f=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,h=g.match(f);return h&&h[2].length===11?h[2]:null},j=()=>{s&&b(s)&&i(!0)},k=[{title:r.videoPage.featuredVideos.abcSong,thumbnail:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500",color:"from-blue-400 via-purple-400 to-pink-400"},{title:r.videoPage.featuredVideos.numbers,thumbnail:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&h=500",color:"from-green-400 via-teal-400 to-blue-400"}];return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsx("div",{className:"max-w-7xl mx-auto space-y-8",children:c?e.jsx("div",{className:`
            aspect-video rounded-3xl overflow-hidden
            shadow-2xl transition-all duration-500
          `,children:e.jsx("iframe",{src:`https://www.youtube.com/embed/${b(s)}?autoplay=1`,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,className:"w-full h-full"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:k.map((g,f)=>e.jsxs("button",{className:`
                    relative overflow-hidden rounded-3xl aspect-video
                    transform hover:scale-102 transition-all duration-500
                    focus:outline-none focus:ring-4 focus:ring-purple-400
                    group
                  `,children:[e.jsx("div",{className:`
                    absolute inset-0 bg-gradient-to-br ${g.color}
                    opacity-40 group-hover:opacity-60 transition-opacity
                  `}),e.jsx("img",{src:g.thumbnail,alt:g.title,className:"absolute inset-0 w-full h-full object-cover"}),e.jsx("div",{className:"relative flex items-center justify-center h-full",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx("div",{className:`
                        w-16 h-16 rounded-full
                        flex items-center justify-center
                        transform group-hover:scale-110 transition-all duration-300
                        ${a?`bg-gradient-to-r ${g.color}`:"bg-white/90"}
                        shadow-lg
                      `,children:e.jsx(le,{className:`
                          w-8 h-8
                          ${a?"text-white":"text-gray-900"}
                        `})}),e.jsx("h3",{className:"text-2xl font-bold text-white font-comic drop-shadow-lg",children:g.title})]})})]},f))}),e.jsxs("div",{className:`
              rounded-3xl p-8 space-y-6
              ${t?"bg-gray-800":"bg-white"}
              shadow-xl
            `,children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx(Kt,{className:`w-8 h-8 ${a?"text-red-500":t?"text-white":"text-gray-900"}`}),e.jsx("h2",{className:"text-2xl font-bold font-comic",children:r.videos})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("input",{type:"text",value:s,onChange:g=>o(g.target.value),placeholder:r.videoPage.urlPlaceholder,className:`
                    w-full px-6 py-4 text-lg rounded-2xl
                    border-2 border-gray-200 dark:border-gray-700
                    focus:border-purple-400 dark:focus:border-purple-400
                    focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-all duration-300
                  `}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("select",{value:u,onChange:g=>m(g.target.value),className:`
                      px-6 py-4 text-lg rounded-2xl
                      border-2 border-gray-200 dark:border-gray-700
                      focus:border-purple-400 dark:focus:border-purple-400
                      focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white
                      transition-all duration-300
                    `,children:[e.jsx("option",{value:"es",children:r.videoPage.languages.spanish}),e.jsx("option",{value:"fr",children:r.videoPage.languages.french}),e.jsx("option",{value:"de",children:r.videoPage.languages.german}),e.jsx("option",{value:"it",children:r.videoPage.languages.italian})]}),e.jsxs("button",{onClick:j,disabled:!s,className:`
                      flex-1 flex items-center justify-center gap-3
                      px-8 py-4 text-lg font-bold text-white
                      rounded-2xl transition-all duration-300
                      ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-102
                      focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50
                    `,children:[e.jsx(Lt,{className:"w-6 h-6"}),e.jsx("span",{children:r.videoPage.translateAndPlay}),e.jsx(I,{className:"w-6 h-6 animate-pulse"})]})]})]})]})]})})})}function Ns({isDarkMode:t,isVibrant:a,t:r,language:s}){const[o,u]=n.useState(null),m=b=>{console.log(`Playing ${b} sound`)},c=[{id:"letter-matching",title:r.gamesPage.mainGames.letterMatching.title,description:r.gamesPage.mainGames.letterMatching.description,icon:Ft,color:"from-blue-400 via-purple-400 to-pink-400",darkColor:"from-blue-500/30 via-purple-500/30 to-pink-500/30",lightColor:"from-blue-100 via-purple-50 to-pink-50"},{id:"phonics",title:r.gamesPage.mainGames.phonics.title,description:r.gamesPage.mainGames.phonics.description,icon:_t,color:"from-green-400 via-emerald-400 to-teal-400",darkColor:"from-green-500/30 via-emerald-500/30 to-teal-500/30",lightColor:"from-green-100 via-emerald-50 to-teal-50"},{id:"word-builder",title:r.gamesPage.mainGames.wordBuilder.title,description:r.gamesPage.mainGames.wordBuilder.description,icon:zt,color:"from-yellow-400 via-orange-400 to-red-400",darkColor:"from-yellow-500/30 via-orange-500/30 to-red-500/30",lightColor:"from-yellow-100 via-orange-50 to-red-50"},{id:"find-letter",title:r.gamesPage.mainGames.findLetter.title,description:r.gamesPage.mainGames.findLetter.description,icon:qt,color:"from-purple-400 via-indigo-400 to-blue-400",darkColor:"from-purple-500/30 via-indigo-500/30 to-blue-500/30",lightColor:"from-purple-100 via-indigo-50 to-blue-50"}],i=[{title:r.gamesPage.upcomingGames.numberAdventure.title,description:r.gamesPage.upcomingGames.numberAdventure.description,icon:pe,color:"from-pink-400 via-rose-400 to-red-400",darkColor:"from-pink-500/30 via-rose-500/30 to-red-500/30",lightColor:"from-pink-100 via-rose-50 to-red-50"},{title:r.gamesPage.upcomingGames.shapeExplorer.title,description:r.gamesPage.upcomingGames.shapeExplorer.description,icon:pe,color:"from-teal-400 via-cyan-400 to-sky-400",darkColor:"from-teal-500/30 via-cyan-500/30 to-sky-500/30",lightColor:"from-teal-100 via-cyan-50 to-sky-50"}];return o==="letter-matching"?e.jsx(tt,{isDarkMode:t,isVibrant:a,onExit:()=>u(null),language:s}):o==="phonics"?e.jsx(at,{isDarkMode:t,isVibrant:a,onExit:()=>u(null),language:s}):o==="find-letter"?e.jsx(st,{isDarkMode:t,isVibrant:a,onExit:()=>u(null),language:s}):o==="word-builder"?e.jsx(rt,{isDarkMode:t,isVibrant:a,onExit:()=>u(null),language:s}):e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto space-y-12",children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:c.map((b,j)=>e.jsxs("button",{onClick:()=>{m("click"),u(b.id)},className:`
                relative p-8 rounded-3xl
                transform hover:scale-105 transition-all duration-500
                focus:outline-none focus:ring-4 focus:ring-purple-400
                shadow-xl
                group
                cursor-pointer
                overflow-hidden
              `,children:[e.jsx("div",{className:`
                absolute inset-0
                bg-gradient-to-br
                ${t?b.darkColor:b.lightColor}
                group-hover:opacity-80
                transition-opacity
              `}),e.jsx("div",{className:`
                absolute inset-0
                bg-gradient-to-br ${b.color}
                opacity-0 group-hover:opacity-20
                transition-opacity
                blur-xl
              `}),e.jsxs("div",{className:"relative flex flex-col items-center space-y-6",children:[e.jsx(b.icon,{className:`
                  w-24 h-24
                  ${a?`bg-gradient-to-r ${b.color} [background-clip:text] text-transparent`:t?"text-white":"text-gray-900"}
                  animate-float
                `}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:`
                    text-2xl font-bold mb-2 font-comic
                    ${t?"text-white":"text-gray-900"}
                  `,children:b.title}),e.jsx("p",{className:`
                    text-lg
                    ${t?"text-gray-300":"text-gray-600"}
                  `,children:b.description})]}),e.jsx(F,{className:`
                  w-6 h-6
                  ${t?"text-white/50":"text-gray-900/50"}
                  animate-pulse
                `})]})]},j))}),e.jsxs("div",{className:"mt-12",children:[e.jsxs("h2",{className:`
            text-2xl font-bold mb-8 font-comic
            ${t?"text-white":"text-gray-900"}
          `,children:[r.gamesPage.upcomingGames.numberAdventure.description,e.jsx(I,{className:"inline-block w-6 h-6 ml-2 text-yellow-400 animate-pulse"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:i.map((b,j)=>e.jsxs("div",{className:`
                  relative p-8 rounded-3xl
                  transform hover:scale-102 transition-all duration-300
                  shadow-xl
                  group
                  overflow-hidden
                  opacity-75
                `,children:[e.jsx("div",{className:`
                  absolute inset-0
                  bg-gradient-to-br
                  ${t?b.darkColor:b.lightColor}
                  transition-opacity
                `}),e.jsxs("div",{className:"relative flex flex-col items-center space-y-6",children:[e.jsx(b.icon,{className:`
                    w-24 h-24
                    ${a?`bg-gradient-to-r ${b.color} [background-clip:text] text-transparent`:t?"text-white/50":"text-gray-900/50"}
                  `}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:`
                      text-2xl font-bold mb-2 font-comic
                      ${t?"text-white/75":"text-gray-900/75"}
                    `,children:b.title}),e.jsx("p",{className:`
                      text-lg
                      ${t?"text-gray-300/75":"text-gray-600/75"}
                    `,children:b.description})]})]})]},j))})]})]})})}const me=[{name:"Ocean Waves",url:"https://assets.mixkit.co/music/preview/mixkit-ocean-waves-loop-1196.mp3"},{name:"Forest Birds",url:"https://assets.mixkit.co/music/preview/mixkit-forest-birds-loop-1242.mp3"},{name:"Gentle Rain",url:"https://assets.mixkit.co/music/preview/mixkit-rain-and-thunder-loop-1248.mp3"}];function Ss({isDarkMode:t,isVibrant:a,t:r}){const[s,o]=n.useState(null),[u,m]=n.useState(!1),[c,i]=n.useState(0),[b,j]=n.useState(0),[k,g]=n.useState(.5),[f,h]=n.useState(!1),[C,v]=n.useState("#9C27B0"),d=n.useRef(null),l=n.useRef(null),y=n.useRef(null),w=n.useRef(null),[p,$]=n.useState(!1),[P,x]=n.useState(null),N=[{id:"music",title:r.breakPage.activities.music.title,icon:Rt,color:"from-purple-400 via-pink-400 to-red-400",darkColor:"from-purple-500/30 via-pink-500/30 to-red-500/30",lightColor:"from-purple-50 via-pink-50 to-red-50"},{id:"visual",title:r.breakPage.activities.visual.title,icon:Se,color:"from-blue-400 via-cyan-400 to-teal-400",darkColor:"from-blue-500/30 via-cyan-500/30 to-teal-500/30",lightColor:"from-blue-50 via-cyan-50 to-teal-50"},{id:"doodle",title:"Relaxing Doodles",icon:Te,color:"from-pink-400 via-rose-400 to-red-400",darkColor:"from-pink-500/30 via-rose-500/30 to-red-500/30",lightColor:"from-pink-50 via-rose-50 to-red-50"}];n.useEffect(()=>{if(typeof window<"u"){const A=window.AudioContext||window.webkitAudioContext;l.current=new A;const M=l.current.createGain();M.gain.value=k,M.connect(l.current.destination),y.current=M;const O=new Audio;return O.crossOrigin="anonymous",d.current=O,()=>{var z,B;((z=l.current)==null?void 0:z.state)!=="closed"&&((B=l.current)==null||B.close())}}},[]),n.useEffect(()=>{u&&d.current&&S()},[b]),n.useEffect(()=>{y.current&&(y.current.gain.value=k)},[k]);const S=async()=>{if(!(!d.current||!l.current||!y.current))try{h(!0),d.current.src=me[b].url,d.current.onerror=M=>{console.error("Error loading audio:",M),h(!1),m(!1);const O=new SpeechSynthesisUtterance("Sorry, there was a problem playing the music. Please try again.");window.speechSynthesis.speak(O)},l.current.createMediaElementSource(d.current).connect(y.current),d.current.oncanplaythrough=()=>{h(!1)},d.current.onended=()=>{j(M=>(M+1)%me.length)},await d.current.play(),l.current.state==="suspended"&&await l.current.resume()}catch(A){console.error("Error loading audio:",A),h(!1),m(!1);const M=new SpeechSynthesisUtterance("Sorry, there was a problem playing the music. Please try again.");window.speechSynthesis.speak(M)}},L=A=>{const M=w.current;if(!M)return;const O=M.getBoundingClientRect(),z=A.clientX-O.left,B=A.clientY-O.top;$(!0),x({x:z,y:B})},T=A=>{if(!p||!P||!w.current)return;const M=w.current,O=M.getContext("2d");if(!O)return;const z=M.getBoundingClientRect(),B=A.clientX-z.left,_=A.clientY-z.top;O.beginPath(),O.moveTo(P.x,P.y),O.lineTo(B,_),O.strokeStyle=C,O.lineWidth=5,O.lineCap="round",O.stroke(),x({x:B,y:_})},G=()=>{$(!1),x(null)},R=()=>{const A=w.current;if(!A)return;const M=A.getContext("2d");M&&M.clearRect(0,0,A.width,A.height)},W=[{name:"waves",title:r.breakPage.activities.visual.scenes.waves,gradient:"from-blue-400 to-blue-600",elements:[{type:"wave",count:3,baseDelay:0},{type:"cloud",count:2,baseDelay:2}]},{name:"garden",title:r.breakPage.activities.visual.scenes.garden,gradient:"from-green-400 to-emerald-600",elements:[{type:"butterfly",count:5,baseDelay:0},{type:"flower",count:3,baseDelay:1}]},{name:"night",title:r.breakPage.activities.visual.scenes.night,gradient:"from-indigo-900 to-purple-900",elements:[{type:"star",count:20,baseDelay:0},{type:"firefly",count:8,baseDelay:1}]}];return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{className:`
          mb-8 p-4 rounded-xl
          ${t?"bg-gray-800/50":"bg-white/50"}
          backdrop-blur-md
        `,children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx(At,{className:"w-4 h-4"}),e.jsx("p",{className:t?"text-gray-300":"text-gray-600",children:"Taking breaks is important! These activities help your child relax and reset before their next adventure."})]})}),s?e.jsxs("div",{className:"relative min-h-[calc(100vh-12rem)]",children:[e.jsx("button",{onClick:()=>{o(null),d.current&&(d.current.pause(),m(!1))},className:`
                absolute top-4 left-4 z-10
                p-2 rounded-full
                ${t?"bg-gray-800":"bg-white"}
                shadow-lg
                transition-transform hover:scale-110
              `,children:e.jsx(Q,{className:"w-6 h-6"})}),s==="music"&&e.jsxs("div",{className:"flex flex-col items-center justify-center h-full",children:[e.jsxs("div",{className:`
                  w-48 h-48 rounded-full
                  flex items-center justify-center
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-gray-800":"bg-white"}
                  shadow-xl
                  transform hover:scale-105 transition-all duration-300
                  cursor-pointer
                  group
                  relative
                `,children:[e.jsx("button",{onClick:()=>{var A;u?((A=d.current)==null||A.pause(),m(!1)):(S(),m(!0))},disabled:f,className:"w-24 h-24 text-white hover:scale-110 transition-transform relative disabled:opacity-50",children:u?e.jsx(Ot,{className:"w-full h-full"}):e.jsx(le,{className:"w-full h-full"})}),f&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"})})]}),e.jsx("div",{className:"mt-6 text-center",children:e.jsx("h3",{className:`text-xl font-bold ${t?"text-white":"text-gray-900"}`,children:r.breakPage.activities.music.tracks[me[b].name.toLowerCase().replace(" ","")]})}),e.jsx("div",{className:"mt-6 w-64",children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:k,onChange:A=>g(parseFloat(A.target.value)),className:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"})})]}),s==="visual"&&e.jsxs("div",{className:"relative w-full h-full min-h-[500px]",children:[e.jsx("div",{className:`
                  absolute inset-0 transition-opacity duration-1000
                  bg-gradient-to-b ${W[c].gradient}
                `,children:W[c].elements.map((A,M)=>Array.from({length:A.count}).map((O,z)=>{const B=A.baseDelay+z*.5,_={top:`${Math.random()*80+10}%`,left:`${Math.random()*80+10}%`};switch(A.type){case"wave":return e.jsx(Jt,{className:"absolute w-24 h-24 text-white/20 animate-float",style:{..._,animationDelay:`${B}s`}},`wave-${M}-${z}`);case"cloud":return e.jsx(Se,{className:"absolute w-32 h-32 text-white/30 animate-float",style:{..._,animationDelay:`${B}s`}},`cloud-${M}-${z}`);case"star":return e.jsx(I,{className:"absolute w-4 h-4 text-yellow-200 animate-twinkle",style:{..._,animationDelay:`${B}s`}},`star-${M}-${z}`);case"firefly":return e.jsx(I,{className:"absolute w-3 h-3 text-yellow-300/70 animate-float",style:{..._,animationDelay:`${B}s`}},`firefly-${M}-${z}`);case"butterfly":return e.jsx("div",{className:"absolute w-6 h-6 animate-float",style:{..._,animationDelay:`${B}s`},children:e.jsx("span",{className:"block w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-60"})},`butterfly-${M}-${z}`);case"flower":return e.jsx(xe,{className:"absolute w-8 h-8 text-yellow-400/70 animate-spin-slow",style:{..._,animationDelay:`${B}s`}},`flower-${M}-${z}`);default:return null}}))}),e.jsx("div",{className:"absolute bottom-8 left-1/2 transform -translate-x-1/2",children:e.jsx("h3",{className:"text-2xl font-bold text-white text-center drop-shadow-lg",children:W[c].title})})]}),s==="doodle"&&e.jsxs("div",{className:`
                rounded-3xl p-8
                ${t?"bg-gray-800":"bg-white"}
                shadow-xl
              `,children:[e.jsxs("div",{className:"flex justify-center space-x-4 mb-6",children:[["#9C27B0","#2196F3","#4CAF50","#FF9800"].map(A=>e.jsx("button",{onClick:()=>v(A),className:`
                        w-12 h-12 rounded-full
                        ${C===A?"ring-4 ring-purple-400":""}
                        transform hover:scale-110
                        transition-all duration-300
                      `,style:{backgroundColor:A}},A)),e.jsx("button",{onClick:R,className:`
                      p-3 rounded-full
                      ${t?"bg-gray-700":"bg-gray-200"}
                      transform hover:scale-110
                      transition-all duration-300
                    `,children:e.jsx(Te,{className:"w-6 h-6"})})]}),e.jsx("div",{className:`
                    relative w-full aspect-[2/1] rounded-2xl overflow-hidden
                    ${t?"bg-gray-700":"bg-gray-100"}
                  `,children:e.jsx("canvas",{ref:w,width:800,height:400,onMouseDown:L,onMouseMove:T,onMouseUp:G,onMouseLeave:G,className:"absolute inset-0 w-full h-full cursor-crosshair"})})]})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:N.map(A=>e.jsxs("button",{onClick:()=>o(A.id),className:`
                  relative p-8 rounded-3xl
                  transform hover:scale-105 transition-all duration-500
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  shadow-xl
                  group
                  overflow-hidden
                  aspect-square
                `,children:[e.jsx("div",{className:`
                  absolute inset-0
                  bg-gradient-to-br
                  ${t?A.darkColor:A.lightColor}
                  group-hover:opacity-80
                  transition-opacity
                `}),e.jsx("div",{className:`
                  absolute inset-0
                  bg-gradient-to-br ${A.color}
                  opacity-0 group-hover:opacity-20
                  transition-opacity
                  blur-xl
                `}),e.jsxs("div",{className:"relative flex flex-col items-center justify-center h-full space-y-6",children:[e.jsx(A.icon,{className:`
                    w-24 h-24
                    ${a?`text-transparent bg-clip-text bg-gradient-to-r ${A.color}`:t?"text-white":"text-gray-900"}
                    animate-float
                  `}),e.jsx("h3",{className:`
                    text-2xl font-bold text-center font-comic
                    ${t?"text-white":"text-gray-900"}
                  `,children:A.title})]})]},A.id))})]})})}function ks({isDarkMode:t,isVibrant:a,t:r}){const[s,o]=n.useState(!1),[u,m]=n.useState(!1),[c,i]=n.useState(!1),[b,j]=n.useState({name:"",email:"",message:""}),k=async f=>{f.preventDefault(),o(!0),i(!1);try{if((await fetch("https://formspree.io/f/xwpvbpoe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)})).ok)m(!0),j({name:"",email:"",message:""}),setTimeout(()=>m(!1),5e3);else throw new Error("Failed to send message")}catch{i(!0)}finally{o(!1)}},g=f=>{j(h=>({...h,[f.target.name]:f.target.value}))};return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-3xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsxs("h1",{className:`text-4xl font-bold mb-6 font-comic ${a?"bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent":t?"text-white":"text-gray-900"}`,children:["Contact the Creators! ",e.jsx(I,{className:"inline-block w-8 h-8 text-yellow-400 animate-spin"})]}),e.jsx("p",{className:`text-lg ${t?"text-gray-300":"text-gray-600"}`,children:"Have a question, an idea, or just want to say hi? We'd love to hear from you! Send us a message below."})]}),e.jsxs("div",{className:`
          relative p-8 rounded-3xl
          ${t?"bg-gray-800":"bg-white"}
          shadow-xl
          transform hover:scale-102 transition-all duration-500
        `,children:[e.jsx("div",{className:`
            absolute inset-0 rounded-3xl -z-10 blur opacity-50
            ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-purple-500/30":"bg-purple-200"}
          `}),e.jsxs("form",{onSubmit:k,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:`block text-sm font-medium mb-2 ${t?"text-gray-300":"text-gray-700"}`,children:"Your Name"}),e.jsx("input",{type:"text",id:"name",name:"name",required:!0,value:b.name,onChange:g,className:`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${t?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${a?"focus:border-transparent":""}
                `,placeholder:"Enter your name"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:`block text-sm font-medium mb-2 ${t?"text-gray-300":"text-gray-700"}`,children:"Your Email"}),e.jsx("input",{type:"email",id:"email",name:"email",required:!0,value:b.email,onChange:g,className:`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${t?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${a?"focus:border-transparent":""}
                `,placeholder:"Enter your email"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:`block text-sm font-medium mb-2 ${t?"text-gray-300":"text-gray-700"}`,children:"Your Message"}),e.jsx("textarea",{id:"message",name:"message",required:!0,value:b.message,onChange:g,rows:6,className:`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${t?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-200 text-gray-900"}
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${a?"focus:border-transparent":""}
                  resize-none
                `,placeholder:"Type your message here..."})]}),e.jsx("button",{type:"submit",disabled:s,className:`
                w-full py-4 px-6 rounded-xl
                font-bold text-white
                transform hover:scale-105
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"}
                flex items-center justify-center gap-2
              `,children:s?e.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"}):e.jsxs(e.Fragment,{children:[e.jsx(ie,{className:"w-5 h-5"}),"Send Message"]})})]}),u&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl",children:e.jsxs("div",{className:`
                p-6 rounded-2xl
                ${t?"bg-gray-800":"bg-white"}
                shadow-xl text-center
              `,children:[e.jsx(Et,{className:"w-12 h-12 text-green-500 mx-auto mb-4"}),e.jsx("h3",{className:`text-xl font-bold mb-2 ${t?"text-white":"text-gray-900"}`,children:"Message Sent!"}),e.jsx("p",{className:`${t?"text-gray-300":"text-gray-600"}`,children:"Thank you for reaching out. We'll get back to you soon!"})]})}),c&&e.jsxs("div",{className:"mt-4 p-4 rounded-xl bg-red-100 text-red-700 flex items-center gap-2",children:[e.jsx(kt,{className:"w-5 h-5"}),e.jsx("span",{children:"Oops! Something went wrong. Please try again later."})]})]})]})})}function Cs({isDarkMode:t,isVibrant:a,t:r}){const s=[{icon:Bt,title:"General Use Disclaimer",content:["The Learning Realm is an educational platform designed for young children to build literacy skills.","The site is provided as-is, and we do not guarantee uninterrupted or error-free operation."]},{icon:Wt,title:"Parental Responsibility & Supervision",content:["This website is designed for young children, but it is the parent or guardian's responsibility to ensure safe and appropriate usage.","Parents should supervise screen time and ensure content aligns with their child's needs."]},{icon:Fe,title:"AI-Generated Content Warning",content:["Some games, activities, and audio elements are generated using AI. While we strive to provide accurate and appropriate content, AI-generated responses may occasionally produce unexpected results.","We encourage parents to review and engage with the content alongside their children."]},{icon:pe,title:"Privacy & Data Collection",content:["The Learning Realm does not collect personally identifiable information from children.","Contact forms and other features that require input are intended for parents and guardians only."]},{icon:We,title:"Screen Time & Health Considerations",content:["While we encourage fun and engaging learning, we recommend moderation of screen time in accordance with pediatric guidelines.",'We provide "Take a Break" features to help balance digital learning with mindful breaks.']},{icon:Mt,title:"Third-Party Links & External Content",content:["The site may include embedded YouTube videos or links to external resources. We are not responsible for third-party content, and parents should review external sites before allowing children to access them."]},{icon:V,title:"Changes to Terms",content:["These Terms & Conditions may be updated periodically. Continued use of the site constitutes acceptance of any updates."]}];return e.jsx("div",{className:"min-h-screen pt-20 pb-8 px-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h1",{className:`
            text-4xl font-bold mb-6 font-comic
            ${a?"bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent":t?"text-white":"text-gray-900"}
          `,children:"Terms & Conditions"}),e.jsx("p",{className:`text-lg ${t?"text-gray-300":"text-gray-600"}`,children:"Please read these terms carefully before using The Learning Realm"})]}),e.jsx("div",{className:"space-y-8",children:s.map((o,u)=>e.jsx("div",{className:`
                p-6 rounded-2xl
                ${t?"bg-gray-800":"bg-white"}
                shadow-lg
                transform hover:scale-102
                transition-all duration-300
              `,children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:`
                  p-3 rounded-xl
                  ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":t?"bg-gray-700":"bg-purple-100"}
                `,children:e.jsx(o.icon,{className:`
                    w-6 h-6
                    ${a?"text-white":t?"text-purple-400":"text-purple-600"}
                  `})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:`
                    text-xl font-bold mb-4
                    ${t?"text-white":"text-gray-900"}
                  `,children:o.title}),e.jsx("div",{className:"space-y-3",children:o.content.map((m,c)=>e.jsx("p",{className:`
                          text-base leading-relaxed
                          ${t?"text-gray-300":"text-gray-600"}
                        `,children:m},c))})]})]})},u))})]})})}function te({icon:t,tooltip:a,onClick:r}){return e.jsxs("button",{onClick:r,className:"group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",title:a,children:[e.jsx("div",{className:"transform hover:scale-110 transition-transform",children:t}),e.jsx("span",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:a})]})}function se({icon:t,text:a,onClick:r,isDarkMode:s}){return e.jsxs("button",{onClick:r,className:`
        w-full flex items-center px-3 py-2 rounded-lg
        text-base font-medium
        ${s?"text-gray-300 hover:bg-gray-700 hover:text-white":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
        transition-colors duration-200
      `,children:[t,e.jsx("span",{className:"ml-3",children:a})]})}function $s({isDarkMode:t,isVibrant:a,language:r,t:s,showAuthModal:o,onToggleVibrant:u,onToggleLanguage:m,onToggleDarkMode:c,onShowAuthModal:i,onNavigate:b}){const{user:j,signOut:k}=ne(),[g,f]=ve.useState(!1);ve.useEffect(()=>{const l=()=>{window.innerWidth>=768&&f(!1)};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]);const h=l=>{b(l),f(!1)},C=(l="text-gray-900")=>a?"bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent":t?"text-white":l,v=l=>a?l:t?"text-white":"text-gray-900",d=()=>{var l,y,w,p,$;return e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:`
        w-8 h-8 rounded-full
        flex items-center justify-center
        ${a?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600"}
        text-white font-bold
      `,children:((y=(l=j==null?void 0:j.displayName)==null?void 0:l[0])==null?void 0:y.toUpperCase())||((p=(w=j==null?void 0:j.email)==null?void 0:w[0])==null?void 0:p.toUpperCase())||"U"}),e.jsx("div",{className:"hidden sm:block",children:e.jsx("div",{className:`text-sm font-medium ${t?"text-white":"text-gray-900"}`,children:(j==null?void 0:j.displayName)||(($=j==null?void 0:j.email)==null?void 0:$.split("@")[0])})})]})};return e.jsx("nav",{className:`fixed w-full shadow-lg z-50 ${t?"bg-gray-900/70 backdrop-blur-md":a?"bg-white/70 backdrop-blur-md":"bg-white"}`,children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"flex justify-between h-16 items-center",children:[e.jsx("div",{className:"flex-shrink-0 flex items-center",children:e.jsxs("h1",{onClick:()=>h("home"),className:`
                text-2xl md:text-3xl font-extrabold font-comic
                ${C("text-gray-900")}
                transform hover:scale-105 transition-transform cursor-pointer
                flex items-center gap-2
              `,children:[s.title,e.jsx(I,{className:`
                w-6 h-6
                ${a||t?"text-yellow-400":"text-yellow-500"}
                animate-pulse
              `})]})}),e.jsxs("div",{className:"hidden md:flex items-center space-x-8",children:[e.jsx(te,{icon:e.jsx(ke,{className:v("text-blue-500")}),tooltip:s.gamesAndPuzzles,onClick:()=>h("games")}),e.jsx(te,{icon:e.jsx(Le,{className:v("text-purple-500")}),tooltip:s.videos,onClick:()=>h("videos")}),e.jsx(te,{icon:e.jsx(Ce,{className:v("text-green-500")}),tooltip:s.takeABreak,onClick:()=>h("break")}),e.jsx(te,{icon:e.jsx(Ne,{className:v("text-orange-500")}),tooltip:s.parentDashboard,onClick:()=>h("dashboard")}),e.jsx(te,{icon:e.jsx(Pe,{className:v("text-pink-500")}),tooltip:s.learningPath,onClick:()=>h("learning")})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("div",{className:"hidden sm:flex items-center space-x-4",children:[e.jsx("button",{onClick:u,className:`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${a?"bg-gray-100 dark:bg-gray-800":""}`,title:s.toggleColorMode,children:e.jsx(Ae,{className:`w-5 h-5 ${a?"text-purple-500":t?"text-white":"text-gray-900"}`})}),e.jsx("button",{onClick:m,className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold",title:s.switchLanguage,children:e.jsx("span",{className:C("text-gray-900"),children:r==="en"?"ES":"EN"})}),e.jsx("button",{onClick:c,className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",title:s.toggleDarkMode,children:t?e.jsx(xe,{className:"w-5 h-5 text-yellow-400"}):e.jsx(Ee,{className:`w-5 h-5 ${a?"text-purple-600":"text-gray-900"} hover:text-purple-600 transition-colors`})}),j?e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(d,{}),e.jsxs("button",{onClick:k,className:"flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900",children:[e.jsx($e,{className:"w-5 h-5"}),e.jsx("span",{children:"Sign Out"})]})]}):e.jsxs("button",{onClick:i,className:"flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700",children:[e.jsx(ge,{className:"w-5 h-5"}),e.jsx("span",{children:"Sign In"})]})]}),e.jsx("button",{onClick:()=>f(!g),className:"md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",children:g?e.jsx(ye,{className:`w-6 h-6 ${t?"text-white":"text-gray-900"}`}):e.jsx(Ut,{className:`w-6 h-6 ${t?"text-white":"text-gray-900"}`})})]})]}),e.jsx("div",{className:`
          md:hidden
          transition-all duration-300 ease-in-out
          ${g?"max-h-screen opacity-100":"max-h-0 opacity-0"}
          overflow-hidden
        `,children:e.jsxs("div",{className:"px-2 pt-2 pb-3 space-y-1",children:[j&&e.jsx("div",{className:"px-3 py-2 mb-4",children:e.jsx(d,{})}),e.jsx(se,{icon:e.jsx(ke,{className:"w-5 h-5"}),text:s.gamesAndPuzzles,onClick:()=>h("games"),isDarkMode:t}),e.jsx(se,{icon:e.jsx(Le,{className:"w-5 h-5"}),text:s.videos,onClick:()=>h("videos"),isDarkMode:t}),e.jsx(se,{icon:e.jsx(Ce,{className:"w-5 h-5"}),text:s.takeABreak,onClick:()=>h("break"),isDarkMode:t}),e.jsx(se,{icon:e.jsx(Ne,{className:"w-5 h-5"}),text:s.parentDashboard,onClick:()=>h("dashboard"),isDarkMode:t}),e.jsx(se,{icon:e.jsx(Pe,{className:"w-5 h-5"}),text:s.learningPath,onClick:()=>h("learning"),isDarkMode:t}),e.jsxs("div",{className:"flex items-center justify-around py-4 border-t border-gray-200 dark:border-gray-700",children:[e.jsx("button",{onClick:()=>{u(),f(!1)},className:`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${a?"bg-gray-100 dark:bg-gray-800":""}`,children:e.jsx(Ae,{className:`w-5 h-5 ${a?"text-purple-500":t?"text-white":"text-gray-900"}`})}),e.jsx("button",{onClick:()=>{m(),f(!1)},className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold",children:e.jsx("span",{className:C("text-gray-900"),children:r==="en"?"ES":"EN"})}),e.jsx("button",{onClick:()=>{c(),f(!1)},className:"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",children:t?e.jsx(xe,{className:"w-5 h-5 text-yellow-400"}):e.jsx(Ee,{className:`w-5 h-5 ${a?"text-purple-600":"text-gray-900"}`})})]}),e.jsx("div",{className:"px-3 py-2 border-t border-gray-200 dark:border-gray-700",children:j?e.jsxs("button",{onClick:()=>{k(),f(!1)},className:"w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900",children:[e.jsx($e,{className:"w-5 h-5"}),e.jsx("span",{children:"Sign Out"})]}):e.jsxs("button",{onClick:()=>{i(),f(!1)},className:"w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700",children:[e.jsx(ge,{className:"w-5 h-5"}),e.jsx("span",{children:"Sign In"})]})})]})})]})})}function Ps(){const[t,a]=n.useState(()=>localStorage.getItem("language")||"en");return n.useEffect(()=>{localStorage.setItem("language",t)},[t]),[t,a]}function Es(){const[t,a]=n.useState(()=>{const r=localStorage.getItem("rainbowMode");return r?JSON.parse(r):!0});return n.useEffect(()=>{localStorage.setItem("rainbowMode",JSON.stringify(t))},[t]),[t,a]}function Ts(t){n.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[t])}const As=(t,a,r)=>{t(),a("break"),r(!0)},Ls=(t,a,r)=>{t(),a("learning"),r(!0)},Ms=(t,a,r)=>{t(),a("video"),r(!0)},Gs=(t,a,r)=>{t(),a("games"),r(!0)},Is=(t,a)=>{t(),a("home")},Us=(t,a,r)=>{t(),a("dashboard"),r(!0)},Rs=(t,a,r)=>{t(),a("contact"),r(!0)},Os=(t,a,r)=>{t(),a("terms"),r(!0)};function zs(){const[t,a]=n.useState(!1),[r,s]=Es(),[o,u]=Ps(),[m,c]=n.useState("home"),[i,b]=n.useState(!1),[j,k]=n.useState(!1),[g,f]=n.useState(!1),[h,C]=n.useState(!1),[v,d]=n.useState(!1),[l,y]=n.useState(!1),[w,p]=n.useState(!1),[$,P]=n.useState(!1),[x,N]=n.useState(null),S=Me[o]||Me.en;Ts(m),n.useEffect(()=>{const R=W=>{var A;P(!0),(A=W.detail)!=null&&A.returnTo&&N(W.detail.returnTo)};return window.addEventListener("showAuthModal",R),()=>{window.removeEventListener("showAuthModal",R)}},[]);const L=()=>{b(!1),k(!1),f(!1),C(!1),d(!1),y(!1),p(!1)},T=R=>{switch(console.log("Navigating to:",R),R){case"dashboard":Us(L,c,b);break;case"break":As(L,c,d);break;case"learning":Ls(L,c,k);break;case"videos":Ms(L,c,f);break;case"games":Gs(L,c,C);break;case"home":Is(L,c);break;case"contact":Rs(L,c,y);break;case"terms":Os(L,c,p);break}},G=()=>{P(!1),x&&(T(x),N(null))};return e.jsx(Je,{children:e.jsx(Dt,{children:e.jsxs("div",{className:`min-h-screen transition-all duration-150 ${t?"dark bg-gray-900":"bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"}`,children:[e.jsx($s,{isDarkMode:t,isVibrant:r,language:o,t:S,showAuthModal:$,onToggleVibrant:()=>s(!r),onToggleLanguage:()=>{const R=document.documentElement;R.style.opacity="0",setTimeout(()=>{u(o==="en"?"es":"en"),R.style.opacity="1"},150)},onToggleDarkMode:()=>a(!t),onShowAuthModal:()=>P(!0),onNavigate:T}),i&&e.jsx(cs,{language:o,isDarkMode:t,isVibrant:r,t:S}),j&&e.jsx(vs,{isDarkMode:t,isVibrant:r,t:S,language:o}),g&&e.jsx(js,{isDarkMode:t,isVibrant:r,t:S}),h&&e.jsx(Ns,{isDarkMode:t,isVibrant:r,t:S,language:o}),v&&e.jsx(Ss,{isDarkMode:t,isVibrant:r,t:S}),l&&e.jsx(ks,{isDarkMode:t,isVibrant:r,t:S}),w&&e.jsx(Cs,{isDarkMode:t,isVibrant:r,t:S}),!i&&!j&&!g&&!h&&!v&&!l&&!w&&e.jsxs(e.Fragment,{children:[e.jsx("main",{className:"pt-16",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center",children:[e.jsxs("div",{onClick:()=>T("learning"),className:"relative w-48 sm:w-64 h-48 sm:h-64 mb-8 group cursor-pointer transform transition-all duration-300 hover:scale-105",role:"button","aria-label":S.learningPath,tabIndex:0,onKeyPress:R=>{(R.key==="Enter"||R.key===" ")&&T("learning")},children:[e.jsx("div",{className:`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${r?"bg-gradient-to-r from-purple-400 via-pink-400 to-red-400":"bg-blue-200"} animate-pulse`}),e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("img",{src:"https://api.dicebear.com/7.x/bottts/svg?seed=happy&backgroundColor=transparent&eyes=happy&mouth=smile",alt:S.mascotAlt,className:"w-full h-full object-contain rounded-full shadow-2xl border-4 border-white dark:border-gray-800",onError:R=>{const W=R.target;W.onerror=null,W.src="https://api.dicebear.com/7.x/bottts/svg?seed=fallback"}}),e.jsx("div",{className:"absolute top-1/4 right-1/4 w-1/3 h-1/3",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-full h-full text-purple-500 animate-wave",children:[e.jsx("path",{d:"M7 11L12 6L17 11"}),e.jsx("path",{d:"M12 6V18"})]})})]}),e.jsx("div",{className:"absolute inset-0 rounded-full ring-4 ring-transparent hover:ring-purple-400 transition-all duration-300"})]}),e.jsx("div",{className:"relative mb-6",children:e.jsx("h2",{className:"text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 animate-float",children:e.jsx("span",{className:`inline-block transform hover:scale-105 transition-transform curved-text ${r?"bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent":t?"text-white":"text-gray-900"}`,children:S.tagline})})}),e.jsx("p",{className:`text-lg sm:text-xl md:text-2xl mb-12 font-comic animate-float animation-delay-2000 ${r?"bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent":t?"text-white":"text-gray-900"}`,children:S.subTagline}),e.jsxs("button",{onClick:()=>T("learning"),className:`group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 ${r?"bg-gradient-to-r from-purple-500 via-pink-500 to-red-500":"bg-purple-600 hover:bg-purple-700"} rounded-full shadow-lg hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 animate-float animation-delay-4000`,children:[e.jsx("span",{className:"relative z-10 font-comic tracking-wider",children:S.letsPlay}),e.jsx("div",{className:`absolute -inset-1 rounded-full blur ${r?"bg-gradient-to-r from-purple-400 via-pink-400 to-red-400":"bg-purple-400"} opacity-70 group-hover:opacity-100 transition-opacity animate-glow`})]})]})})}),e.jsx("footer",{className:"bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-6 sm:py-8",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8",children:[e.jsx("button",{onClick:()=>T("terms"),className:`${r?"text-gray-700 dark:text-gray-300 hover:text-purple-500":"text-gray-900 dark:text-gray-300 hover:text-purple-500"} transition-colors`,children:S.terms}),e.jsx("button",{onClick:()=>T("contact"),className:`${r?"text-gray-700 dark:text-gray-300 hover:text-pink-500":"text-gray-900 dark:text-gray-300 hover:text-purple-500"} transition-colors`,children:S.contact}),e.jsx("a",{href:"#",className:`${r?"text-gray-700 dark:text-gray-300 hover:text-blue-500":"text-gray-900 dark:text-gray-300 hover:text-purple-500"} transition-colors`,children:S.help})]})})})]}),$&&e.jsx(Zt,{isOpen:$,onClose:G,isDarkMode:t,isVibrant:r})]})})})}qe(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(Je,{children:e.jsx(zs,{})})}));
//# sourceMappingURL=index-CDOSTzHk.js.map
