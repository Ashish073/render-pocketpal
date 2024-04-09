import{r as L,R as C,a as T}from"./router-DoZ8UY0K.js";var R={exports:{}},k={};/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=L;function U(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var j=typeof Object.is=="function"?Object.is:U,W=y.useSyncExternalStore,H=y.useRef,P=y.useEffect,z=y.useMemo,_=y.useDebugValue;k.useSyncExternalStoreWithSelector=function(e,n,t,r,u){var o=H(null);if(o.current===null){var i={hasValue:!1,value:null};o.current=i}else i=o.current;o=z(function(){function d(c){if(!s){if(s=!0,S=c,c=r(c),u!==void 0&&i.hasValue){var f=i.value;if(u(f,c))return v=f}return v=c}if(f=v,j(S,c))return f;var x=r(c);return u!==void 0&&u(f,x)?f:(S=c,v=x)}var s=!1,S,v,p=t===void 0?null:t;return[function(){return d(n())},p===null?void 0:function(){return d(p())}]},[n,t,r,u]);var l=W(e,o[0],o[1]);return P(function(){i.hasValue=!0,i.value=l},[l]),_(l),l};R.exports=k;var q=R.exports,a="default"in C?T:C,m=Symbol.for("react-redux-context"),w=typeof globalThis<"u"?globalThis:{};function I(){if(!a.createContext)return{};const e=w[m]??(w[m]=new Map);let n=e.get(a.createContext);return n||(n=a.createContext(null),e.set(a.createContext,n)),n}var b=I(),O=()=>{throw new Error("uSES not initialized!")};function h(e=b){return function(){return a.useContext(e)}}var V=h(),M=O,$=e=>{M=e},A=(e,n)=>e===n;function B(e=b){const n=e===b?V:h(e),t=(r,u={})=>{const{equalityFn:o=A,devModeChecks:i={}}=typeof u=="function"?{equalityFn:u}:u,{store:l,subscription:d,getServerState:s,stabilityCheck:S,identityFunctionCheck:v}=n();a.useRef(!0);const p=a.useCallback({[r.name](f){return r(f)}}[r.name],[r,S,i.stabilityCheck]),c=M(d.addNestedSub,l.getState,s||l.getState,p,o);return a.useDebugValue(c),c};return Object.assign(t,{withTypes:()=>t}),t}var te=B();function K(e){e()}function F(){let e=null,n=null;return{clear(){e=null,n=null},notify(){K(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){const t=[];let r=e;for(;r;)t.push(r),r=r.next;return t},subscribe(t){let r=!0;const u=n={callback:t,next:null,prev:n};return u.prev?u.prev.next=u:e=u,function(){!r||e===null||(r=!1,u.next?u.next.prev=u.prev:n=u.prev,u.prev?u.prev.next=u.next:e=u.next)}}}}var E={notify(){},get:()=>[]};function G(e,n){let t,r=E,u=0,o=!1;function i(x){S();const D=r.subscribe(x);let g=!1;return()=>{g||(g=!0,D(),v())}}function l(){r.notify()}function d(){f.onStateChange&&f.onStateChange()}function s(){return o}function S(){u++,t||(t=n?n.addNestedSub(d):e.subscribe(d),r=F())}function v(){u--,t&&u===0&&(t(),t=void 0,r.clear(),r=E)}function p(){o||(o=!0,S())}function c(){o&&(o=!1,v())}const f={addNestedSub:i,notifyNestedSubs:l,handleChangeWrapper:d,isSubscribed:s,trySubscribe:p,tryUnsubscribe:c,getListeners:()=>r};return f}var J=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Q=J?a.useLayoutEffect:a.useEffect;function X({store:e,context:n,children:t,serverState:r,stabilityCheck:u="once",identityFunctionCheck:o="once"}){const i=a.useMemo(()=>{const s=G(e);return{store:e,subscription:s,getServerState:r?()=>r:void 0,stabilityCheck:u,identityFunctionCheck:o}},[e,r,u,o]),l=a.useMemo(()=>e.getState(),[e]);Q(()=>{const{subscription:s}=i;return s.onStateChange=s.notifyNestedSubs,s.trySubscribe(),l!==e.getState()&&s.notifyNestedSubs(),()=>{s.tryUnsubscribe(),s.onStateChange=void 0}},[i,l]);const d=n||b;return a.createElement(d.Provider,{value:i},t)}var ne=X;function N(e=b){const n=e===b?V:h(e),t=()=>{const{store:r}=n();return r};return Object.assign(t,{withTypes:()=>t}),t}var Y=N();function Z(e=b){const n=e===b?Y:N(e),t=()=>n().dispatch;return Object.assign(t,{withTypes:()=>t}),t}var re=Z();$(q.useSyncExternalStoreWithSelector);export{ne as P,re as a,te as u};
