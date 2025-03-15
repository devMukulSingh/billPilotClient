var gt=e=>{throw TypeError(e)};var dt=(e,t,s)=>t.has(e)||gt("Cannot "+s);var u=(e,t,s)=>(dt(e,t,"read from private field"),s?s.call(e):t.get(e)),b=(e,t,s)=>t.has(e)?gt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),y=(e,t,s,r)=>(dt(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),x=(e,t,s)=>(dt(e,t,"access private method"),s);import{r as p,j as Qt}from"./index-CVfE49ll.js";var Dt=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},lt=typeof window>"u"||"Deno"in globalThis;function wt(){}function Ze(e,t){return typeof e=="function"?e(t):e}function Ht(e){return typeof e=="number"&&e>=0&&e!==1/0}function _t(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Xe(e,t){return typeof e=="function"?e(t):e}function Bt(e,t){return typeof e=="function"?e(t):e}function ts(e,t){const{type:s="all",exact:r,fetchStatus:n,predicate:i,queryKey:o,stale:a}=e;if(o){if(r){if(t.queryHash!==Vt(o,t.options))return!1}else if(!vt(t.queryKey,o))return!1}if(s!=="all"){const l=t.isActive();if(s==="active"&&!l||s==="inactive"&&l)return!1}return!(typeof a=="boolean"&&t.isStale()!==a||n&&n!==t.state.fetchStatus||i&&!i(t))}function es(e,t){const{exact:s,status:r,predicate:n,mutationKey:i}=e;if(i){if(!t.options.mutationKey)return!1;if(s){if(ft(t.options.mutationKey)!==ft(i))return!1}else if(!vt(t.options.mutationKey,i))return!1}return!(r&&t.state.status!==r||n&&!n(t))}function Vt(e,t){return((t==null?void 0:t.queryKeyHashFn)||ft)(e)}function ft(e){return JSON.stringify(e,(t,s)=>pt(s)?Object.keys(s).sort().reduce((r,n)=>(r[n]=s[n],r),{}):s)}function vt(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(s=>!vt(e[s],t[s])):!1}function Rt(e,t){if(e===t)return e;const s=xt(e)&&xt(t);if(s||pt(e)&&pt(t)){const r=s?e:Object.keys(e),n=r.length,i=s?t:Object.keys(t),o=i.length,a=s?[]:{};let l=0;for(let c=0;c<o;c++){const d=s?c:i[c];(!s&&r.includes(d)||s)&&e[d]===void 0&&t[d]===void 0?(a[d]=void 0,l++):(a[d]=Rt(e[d],t[d]),a[d]===e[d]&&e[d]!==void 0&&l++)}return n===o&&l===n?e:a}return t}function ss(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}function xt(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function pt(e){if(!St(e))return!1;const t=e.constructor;if(t===void 0)return!0;const s=t.prototype;return!(!St(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function St(e){return Object.prototype.toString.call(e)==="[object Object]"}function Jt(e){return new Promise(t=>{setTimeout(t,e)})}function Wt(e,t,s){return typeof s.structuralSharing=="function"?s.structuralSharing(e,t):s.structuralSharing!==!1?Rt(e,t):t}function rs(e,t,s=0){const r=[...e,t];return s&&r.length>s?r.slice(1):r}function is(e,t,s=0){const r=[t,...e];return s&&r.length>s?r.slice(0,-1):r}var At=Symbol();function Yt(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===At?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}var K,I,V,Et,Zt=(Et=class extends Dt{constructor(){super();b(this,K);b(this,I);b(this,V);y(this,V,t=>{if(!lt&&window.addEventListener){const s=()=>t();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){u(this,I)||this.setEventListener(u(this,V))}onUnsubscribe(){var t;this.hasListeners()||((t=u(this,I))==null||t.call(this),y(this,I,void 0))}setEventListener(t){var s;y(this,V,t),(s=u(this,I))==null||s.call(this),y(this,I,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){u(this,K)!==t&&(y(this,K,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(s=>{s(t)})}isFocused(){var t;return typeof u(this,K)=="boolean"?u(this,K):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},K=new WeakMap,I=new WeakMap,V=new WeakMap,Et),Xt=new Zt,J,$,W,Ft,te=(Ft=class extends Dt{constructor(){super();b(this,J,!0);b(this,$);b(this,W);y(this,W,t=>{if(!lt&&window.addEventListener){const s=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",r)}}})}onSubscribe(){u(this,$)||this.setEventListener(u(this,W))}onUnsubscribe(){var t;this.hasListeners()||((t=u(this,$))==null||t.call(this),y(this,$,void 0))}setEventListener(t){var s;y(this,W,t),(s=u(this,$))==null||s.call(this),y(this,$,t(this.setOnline.bind(this)))}setOnline(t){u(this,J)!==t&&(y(this,J,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return u(this,J)}},J=new WeakMap,$=new WeakMap,W=new WeakMap,Ft),Mt=new te;function ee(){let e,t;const s=new Promise((n,i)=>{e=n,t=i});s.status="pending",s.catch(()=>{});function r(n){Object.assign(s,n),delete s.resolve,delete s.reject}return s.resolve=n=>{r({status:"fulfilled",value:n}),e(n)},s.reject=n=>{r({status:"rejected",reason:n}),t(n)},s}function se(e){return Math.min(1e3*2**e,3e4)}function kt(e){return(e??"online")==="online"?Mt.isOnline():!0}var Tt=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function ht(e){return e instanceof Tt}function Ut(e){let t=!1,s=0,r=!1,n;const i=ee(),o=m=>{var g;r||(f(new Tt(m)),(g=e.abort)==null||g.call(e))},a=()=>{t=!0},l=()=>{t=!1},c=()=>Xt.isFocused()&&(e.networkMode==="always"||Mt.isOnline())&&e.canRun(),d=()=>kt(e.networkMode)&&e.canRun(),h=m=>{var g;r||(r=!0,(g=e.onSuccess)==null||g.call(e,m),n==null||n(),i.resolve(m))},f=m=>{var g;r||(r=!0,(g=e.onError)==null||g.call(e,m),n==null||n(),i.reject(m))},v=()=>new Promise(m=>{var g;n=O=>{(r||c())&&m(O)},(g=e.onPause)==null||g.call(e)}).then(()=>{var m;n=void 0,r||(m=e.onContinue)==null||m.call(e)}),w=()=>{if(r)return;let m;const g=s===0?e.initialPromise:void 0;try{m=g??e.fn()}catch(O){m=Promise.reject(O)}Promise.resolve(m).then(h).catch(O=>{var X;if(r)return;const T=e.retry??(lt?0:3),B=e.retryDelay??se,rt=typeof B=="function"?B(s,O):B,it=T===!0||typeof T=="number"&&s<T||typeof T=="function"&&T(s,O);if(t||!it){f(O);return}s++,(X=e.onFail)==null||X.call(e,s,O),Jt(rt).then(()=>c()?void 0:v()).then(()=>{t?f(O):w()})})};return{promise:i,cancel:o,continue:()=>(n==null||n(),i),cancelRetry:a,continueRetry:l,canStart:d,start:()=>(d()?w():v().then(w),i)}}function re(){let e=[],t=0,s=a=>{a()},r=a=>{a()},n=a=>setTimeout(a,0);const i=a=>{t?e.push(a):n(()=>{s(a)})},o=()=>{const a=e;e=[],a.length&&n(()=>{r(()=>{a.forEach(l=>{s(l)})})})};return{batch:a=>{let l;t++;try{l=a()}finally{t--,t||o()}return l},batchCalls:a=>(...l)=>{i(()=>{a(...l)})},schedule:i,setNotifyFunction:a=>{s=a},setBatchNotifyFunction:a=>{r=a},setScheduler:a=>{n=a}}}var qt=re(),G,Ot,It=(Ot=class{constructor(){b(this,G)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Ht(this.gcTime)&&y(this,G,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(lt?1/0:5*60*1e3))}clearGcTimeout(){u(this,G)&&(clearTimeout(u(this,G)),y(this,G,void 0))}},G=new WeakMap,Ot),Y,Z,P,z,S,et,Q,j,M,Pt,ns=(Pt=class extends It{constructor(t){super();b(this,j);b(this,Y);b(this,Z);b(this,P);b(this,z);b(this,S);b(this,et);b(this,Q);y(this,Q,!1),y(this,et,t.defaultOptions),this.setOptions(t.options),this.observers=[],y(this,z,t.client),y(this,P,u(this,z).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,y(this,Y,ne(this.options)),this.state=t.state??u(this,Y),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=u(this,S))==null?void 0:t.promise}setOptions(t){this.options={...u(this,et),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&u(this,P).remove(this)}setData(t,s){const r=Wt(this.state.data,t,this.options);return x(this,j,M).call(this,{data:r,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),r}setState(t,s){x(this,j,M).call(this,{type:"setState",state:t,setStateOptions:s})}cancel(t){var r,n;const s=(r=u(this,S))==null?void 0:r.promise;return(n=u(this,S))==null||n.cancel(t),s?s.then(wt).catch(wt):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(u(this,Y))}isActive(){return this.observers.some(t=>Bt(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===At||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!_t(this.state.dataUpdatedAt,t)}onFocus(){var s;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(s=u(this,S))==null||s.continue()}onOnline(){var s;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(s=u(this,S))==null||s.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),u(this,P).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(s=>s!==t),this.observers.length||(u(this,S)&&(u(this,Q)?u(this,S).cancel({revert:!0}):u(this,S).cancelRetry()),this.scheduleGc()),u(this,P).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||x(this,j,M).call(this,{type:"invalidate"})}fetch(t,s){var l,c,d;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(u(this,S))return u(this,S).continueRetry(),u(this,S).promise}if(t&&this.setOptions(t),!this.options.queryFn){const h=this.observers.find(f=>f.options.queryFn);h&&this.setOptions(h.options)}const r=new AbortController,n=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>(y(this,Q,!0),r.signal)})},i=()=>{const h=Yt(this.options,s),f={client:u(this,z),queryKey:this.queryKey,meta:this.meta};return n(f),y(this,Q,!1),this.options.persister?this.options.persister(h,f,this):h(f)},o={fetchOptions:s,options:this.options,queryKey:this.queryKey,client:u(this,z),state:this.state,fetchFn:i};n(o),(l=this.options.behavior)==null||l.onFetch(o,this),y(this,Z,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((c=o.fetchOptions)==null?void 0:c.meta))&&x(this,j,M).call(this,{type:"fetch",meta:(d=o.fetchOptions)==null?void 0:d.meta});const a=h=>{var f,v,w,m;ht(h)&&h.silent||x(this,j,M).call(this,{type:"error",error:h}),ht(h)||((v=(f=u(this,P).config).onError)==null||v.call(f,h,this),(m=(w=u(this,P).config).onSettled)==null||m.call(w,this.state.data,h,this)),this.scheduleGc()};return y(this,S,Ut({initialPromise:s==null?void 0:s.initialPromise,fn:o.fetchFn,abort:r.abort.bind(r),onSuccess:h=>{var f,v,w,m;if(h===void 0){a(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(h)}catch(g){a(g);return}(v=(f=u(this,P).config).onSuccess)==null||v.call(f,h,this),(m=(w=u(this,P).config).onSettled)==null||m.call(w,h,this.state.error,this),this.scheduleGc()},onError:a,onFail:(h,f)=>{x(this,j,M).call(this,{type:"failed",failureCount:h,error:f})},onPause:()=>{x(this,j,M).call(this,{type:"pause"})},onContinue:()=>{x(this,j,M).call(this,{type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0})),u(this,S).start()}},Y=new WeakMap,Z=new WeakMap,P=new WeakMap,z=new WeakMap,S=new WeakMap,et=new WeakMap,Q=new WeakMap,j=new WeakSet,M=function(t){const s=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...ie(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const n=t.error;return ht(n)&&n.revert&&u(this,Z)?{...u(this,Z),fetchStatus:"idle"}:{...r,error:n,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=s(this.state),qt.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),u(this,P).notify({query:this,type:"updated",action:t})})},Pt);function ie(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:kt(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function ne(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,s=t!==void 0,r=s?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:s?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var D,E,H,R,U,jt,as=(jt=class extends It{constructor(t){super();b(this,R);b(this,D);b(this,E);b(this,H);this.mutationId=t.mutationId,y(this,E,t.mutationCache),y(this,D,[]),this.state=t.state||ae(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){u(this,D).includes(t)||(u(this,D).push(t),this.clearGcTimeout(),u(this,E).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){y(this,D,u(this,D).filter(s=>s!==t)),this.scheduleGc(),u(this,E).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){u(this,D).length||(this.state.status==="pending"?this.scheduleGc():u(this,E).remove(this))}continue(){var t;return((t=u(this,H))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,i,o,a,l,c,d,h,f,v,w,m,g,O,T,B,rt,it,X,bt;y(this,H,Ut({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(C,nt)=>{x(this,R,U).call(this,{type:"failed",failureCount:C,error:nt})},onPause:()=>{x(this,R,U).call(this,{type:"pause"})},onContinue:()=>{x(this,R,U).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>u(this,E).canRun(this)}));const s=this.state.status==="pending",r=!u(this,H).canStart();try{if(!s){x(this,R,U).call(this,{type:"pending",variables:t,isPaused:r}),await((i=(n=u(this,E).config).onMutate)==null?void 0:i.call(n,t,this));const nt=await((a=(o=this.options).onMutate)==null?void 0:a.call(o,t));nt!==this.state.context&&x(this,R,U).call(this,{type:"pending",context:nt,variables:t,isPaused:r})}const C=await u(this,H).start();return await((c=(l=u(this,E).config).onSuccess)==null?void 0:c.call(l,C,t,this.state.context,this)),await((h=(d=this.options).onSuccess)==null?void 0:h.call(d,C,t,this.state.context)),await((v=(f=u(this,E).config).onSettled)==null?void 0:v.call(f,C,null,this.state.variables,this.state.context,this)),await((m=(w=this.options).onSettled)==null?void 0:m.call(w,C,null,t,this.state.context)),x(this,R,U).call(this,{type:"success",data:C}),C}catch(C){try{throw await((O=(g=u(this,E).config).onError)==null?void 0:O.call(g,C,t,this.state.context,this)),await((B=(T=this.options).onError)==null?void 0:B.call(T,C,t,this.state.context)),await((it=(rt=u(this,E).config).onSettled)==null?void 0:it.call(rt,void 0,C,this.state.variables,this.state.context,this)),await((bt=(X=this.options).onSettled)==null?void 0:bt.call(X,void 0,C,t,this.state.context)),C}finally{x(this,R,U).call(this,{type:"error",error:C})}}finally{u(this,E).runNext(this)}}},D=new WeakMap,E=new WeakMap,H=new WeakMap,R=new WeakSet,U=function(t){const s=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=s(this.state),qt.batch(()=>{u(this,D).forEach(r=>{r.onMutationUpdate(t)}),u(this,E).notify({mutation:this,type:"updated",action:t})})},jt);function ae(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var $t=p.createContext(void 0),os=e=>{const t=p.useContext($t);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},us=({client:e,children:t})=>(p.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),Qt.jsx($t.Provider,{value:e,children:t})),Lt=p.createContext(!1),ls=()=>p.useContext(Lt),cs=Lt.Provider;let oe={data:""},ue=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||oe,le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ce=/\/\*[^]*?\*\/|  +/g,Ct=/\n+/g,q=(e,t)=>{let s="",r="",n="";for(let i in e){let o=e[i];i[0]=="@"?i[1]=="i"?s=i+" "+o+";":r+=i[1]=="f"?q(o,i):i+"{"+q(o,i[1]=="k"?"":t)+"}":typeof o=="object"?r+=q(o,t?t.replace(/([^,])+/g,a=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,a):a?a+" "+l:l)):i):o!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=q.p?q.p(i,o):i+":"+o+";")}return s+(t&&n?t+"{"+n+"}":n)+r},A={},Nt=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+Nt(e[s]);return t}return e},de=(e,t,s,r,n)=>{let i=Nt(e),o=A[i]||(A[i]=(l=>{let c=0,d=11;for(;c<l.length;)d=101*d+l.charCodeAt(c++)>>>0;return"go"+d})(i));if(!A[o]){let l=i!==e?e:(c=>{let d,h,f=[{}];for(;d=le.exec(c.replace(ce,""));)d[4]?f.shift():d[3]?(h=d[3].replace(Ct," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][d[1]]=d[2].replace(Ct," ").trim();return f[0]})(e);A[o]=q(n?{["@keyframes "+o]:l}:l,s?"":"."+o)}let a=s&&A.g?A.g:null;return s&&(A.g=A[o]),((l,c,d,h)=>{h?c.data=c.data.replace(h,l):c.data.indexOf(l)===-1&&(c.data=d?l+c.data:c.data+l)})(A[o],t,r,a),o},he=(e,t,s)=>e.reduce((r,n,i)=>{let o=t[i];if(o&&o.call){let a=o(s),l=a&&a.props&&a.props.className||/^go/.test(a)&&a;o=l?"."+l:a&&typeof a=="object"?a.props?"":q(a,""):a===!1?"":a}return r+n+(o??"")},"");function ct(e){let t=this||{},s=e.call?e(t.p):e;return de(s.unshift?s.raw?he(s,[].slice.call(arguments,1),t.p):s.reduce((r,n)=>Object.assign(r,n&&n.call?n(t.p):n),{}):s,ue(t.target),t.g,t.o,t.k)}let Kt,yt,mt;ct.bind({g:1});let k=ct.bind({k:1});function fe(e,t,s,r){q.p=t,Kt=e,yt=s,mt=r}function L(e,t){let s=this||{};return function(){let r=arguments;function n(i,o){let a=Object.assign({},i),l=a.className||n.className;s.p=Object.assign({theme:yt&&yt()},a),s.o=/ *go\d+/.test(l),a.className=ct.apply(s,r)+(l?" "+l:"");let c=e;return e[0]&&(c=a.as||e,delete a.as),mt&&c[0]&&mt(a),Kt(c,a)}return t?t(n):n}}var pe=e=>typeof e=="function",ut=(e,t)=>pe(e)?e(t):e,ye=(()=>{let e=0;return()=>(++e).toString()})(),Gt=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),me=20,zt=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,me)};case 1:return{...e,toasts:e.toasts.map(i=>i.id===t.toast.id?{...i,...t.toast}:i)};case 2:let{toast:s}=t;return zt(e,{type:e.toasts.find(i=>i.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(i=>i.id===r||r===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+n}))}}},ot=[],N={toasts:[],pausedAt:void 0},_=e=>{N=zt(N,e),ot.forEach(t=>{t(N)})},ve={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},be=(e={})=>{let[t,s]=p.useState(N),r=p.useRef(N);p.useEffect(()=>(r.current!==N&&s(N),ot.push(s),()=>{let i=ot.indexOf(s);i>-1&&ot.splice(i,1)}),[]);let n=t.toasts.map(i=>{var o,a,l;return{...e,...e[i.type],...i,removeDelay:i.removeDelay||((o=e[i.type])==null?void 0:o.removeDelay)||(e==null?void 0:e.removeDelay),duration:i.duration||((a=e[i.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||ve[i.type],style:{...e.style,...(l=e[i.type])==null?void 0:l.style,...i.style}}});return{...t,toasts:n}},ge=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||ye()}),st=e=>(t,s)=>{let r=ge(t,e,s);return _({type:2,toast:r}),r.id},F=(e,t)=>st("blank")(e,t);F.error=st("error");F.success=st("success");F.loading=st("loading");F.custom=st("custom");F.dismiss=e=>{_({type:3,toastId:e})};F.remove=e=>_({type:4,toastId:e});F.promise=(e,t,s)=>{let r=F.loading(t.loading,{...s,...s==null?void 0:s.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let i=t.success?ut(t.success,n):void 0;return i?F.success(i,{id:r,...s,...s==null?void 0:s.success}):F.dismiss(r),n}).catch(n=>{let i=t.error?ut(t.error,n):void 0;i?F.error(i,{id:r,...s,...s==null?void 0:s.error}):F.dismiss(r)}),e};var we=(e,t)=>{_({type:1,toast:{id:e,height:t}})},xe=()=>{_({type:5,time:Date.now()})},tt=new Map,Se=1e3,Ce=(e,t=Se)=>{if(tt.has(e))return;let s=setTimeout(()=>{tt.delete(e),_({type:4,toastId:e})},t);tt.set(e,s)},Ee=e=>{let{toasts:t,pausedAt:s}=be(e);p.useEffect(()=>{if(s)return;let i=Date.now(),o=t.map(a=>{if(a.duration===1/0)return;let l=(a.duration||0)+a.pauseDuration-(i-a.createdAt);if(l<0){a.visible&&F.dismiss(a.id);return}return setTimeout(()=>F.dismiss(a.id),l)});return()=>{o.forEach(a=>a&&clearTimeout(a))}},[t,s]);let r=p.useCallback(()=>{s&&_({type:6,time:Date.now()})},[s]),n=p.useCallback((i,o)=>{let{reverseOrder:a=!1,gutter:l=8,defaultPosition:c}=o||{},d=t.filter(v=>(v.position||c)===(i.position||c)&&v.height),h=d.findIndex(v=>v.id===i.id),f=d.filter((v,w)=>w<h&&v.visible).length;return d.filter(v=>v.visible).slice(...a?[f+1]:[0,f]).reduce((v,w)=>v+(w.height||0)+l,0)},[t]);return p.useEffect(()=>{t.forEach(i=>{if(i.dismissed)Ce(i.id,i.removeDelay);else{let o=tt.get(i.id);o&&(clearTimeout(o),tt.delete(i.id))}})},[t]),{toasts:t,handlers:{updateHeight:we,startPause:xe,endPause:r,calculateOffset:n}}},Fe=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Oe=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Pe=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,je=L("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Oe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Pe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,De=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Re=L("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${De} 1s linear infinite;
`,Ae=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Me=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ke=L("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ae} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Me} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Te=L("div")`
  position: absolute;
`,Ue=L("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,qe=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ie=L("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${qe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$e=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return t!==void 0?typeof t=="string"?p.createElement(Ie,null,t):t:s==="blank"?null:p.createElement(Ue,null,p.createElement(Re,{...r}),s!=="loading"&&p.createElement(Te,null,s==="error"?p.createElement(je,{...r}):p.createElement(ke,{...r})))},Le=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ne=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ke="0%{opacity:0;} 100%{opacity:1;}",Ge="0%{opacity:1;} 100%{opacity:0;}",ze=L("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Qe=L("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,He=(e,t)=>{let s=e.includes("top")?1:-1,[r,n]=Gt()?[Ke,Ge]:[Le(s),Ne(s)];return{animation:t?`${k(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},_e=p.memo(({toast:e,position:t,style:s,children:r})=>{let n=e.height?He(e.position||t||"top-center",e.visible):{opacity:0},i=p.createElement($e,{toast:e}),o=p.createElement(Qe,{...e.ariaProps},ut(e.message,e));return p.createElement(ze,{className:e.className,style:{...n,...s,...e.style}},typeof r=="function"?r({icon:i,message:o}):p.createElement(p.Fragment,null,i,o))});fe(p.createElement);var Be=({id:e,className:t,style:s,onHeightUpdate:r,children:n})=>{let i=p.useCallback(o=>{if(o){let a=()=>{let l=o.getBoundingClientRect().height;r(e,l)};a(),new MutationObserver(a).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return p.createElement("div",{ref:i,className:t,style:s},n)},Ve=(e,t)=>{let s=e.includes("top"),r=s?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Gt()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...r,...n}},Je=ct`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,at=16,ds=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:n,containerStyle:i,containerClassName:o})=>{let{toasts:a,handlers:l}=Ee(s);return p.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:at,left:at,right:at,bottom:at,pointerEvents:"none",...i},className:o,onMouseEnter:l.startPause,onMouseLeave:l.endPause},a.map(c=>{let d=c.position||t,h=l.calculateOffset(c,{reverseOrder:e,gutter:r,defaultPosition:t}),f=Ve(d,h);return p.createElement(Be,{id:c.id,key:c.id,onHeightUpdate:l.updateHeight,className:c.visible?Je:"",style:f},c.type==="custom"?ut(c.message,c):n?n(c):p.createElement(_e,{toast:c,position:d}))}))},hs=F;export{ae as A,ls as B,cs as I,as as M,ds as O,ns as Q,Dt as S,hs as V,es as a,wt as b,is as c,rs as d,Yt as e,Xt as f,Ze as g,Vt as h,ft as i,us as j,F as k,ee as l,ts as m,qt as n,Mt as o,vt as p,Bt as q,Xe as r,At as s,ss as t,os as u,lt as v,Ht as w,_t as x,ie as y,Wt as z};
