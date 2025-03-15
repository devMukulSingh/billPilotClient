import{j as a,b as I}from"./index-CVfE49ll.js";import{u as C,t as U,a as F,F as A}from"./form-BKpDzj8W.js";import{b as E}from"./schema-Dy7N3xTd.js";import{c as P,t as j,m as b,d as w,S as y,b as R,u as z,a as k,B,X as Y,I as M}from"./index-DOh0zPzq.js";import{u as O,V as $}from"./index-ZiYbebhz.js";import{d as q}from"./index-oZfdXCXz.js";import{D as V,a as Z,b as W,I as L,P as Q,c as H,d as K,e as J}from"./Domain-BKbDTKpk.js";import{B as g}from"./button-CSuLezZL.js";import{S as X}from"./square-pen-DMC-qW8D.js";import{C as G}from"./circle-plus-NuuZ6w6j.js";import"./utils-DgjiVB1k.js";import"./createLucideIcon-DtXzPAI9.js";import"./browser-DrVg5YfN.js";import"./AddDistributorDialog-DHilJ0vC.js";import"./input-DzGSjn4M.js";import"./chevron-up-Zz_Bt0yl.js";import"./AddProductDialog-BJw-AUYz.js";import"./AddDomainDialog-C8iWH7sR.js";function ee(n,e){const t=()=>P(e==null?void 0:e.in,NaN),r=ae(n);let c;if(r.date){const l=re(r.date,2);c=ie(l.restDateString,l.year)}if(!c||isNaN(+c))return t();const m=+c;let d=0,i;if(r.time&&(d=oe(r.time),isNaN(d)))return t();if(r.timezone){if(i=le(r.timezone),isNaN(i))return t()}else{const l=new Date(m+d),f=j(0,e==null?void 0:e.in);return f.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),f.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),f}return j(m+d+i,e==null?void 0:e.in)}const x={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},te=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ne=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,se=/^([+-])(\d{2})(?::?(\d{2}))?$/;function ae(n){const e={},t=n.split(x.dateTimeDelimiter);let s;if(t.length>2)return e;if(/:/.test(t[0])?s=t[0]:(e.date=t[0],s=t[1],x.timeZoneDelimiter.test(e.date)&&(e.date=n.split(x.timeZoneDelimiter)[0],s=n.substr(e.date.length,n.length))),s){const r=x.timezone.exec(s);r?(e.time=s.replace(r[1],""),e.timezone=r[1]):e.time=s}return e}function re(n,e){const t=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),s=n.match(t);if(!s)return{year:NaN,restDateString:""};const r=s[1]?parseInt(s[1]):null,c=s[2]?parseInt(s[2]):null;return{year:c===null?r:c*100,restDateString:n.slice((s[1]||s[2]).length)}}function ie(n,e){if(e===null)return new Date(NaN);const t=n.match(te);if(!t)return new Date(NaN);const s=!!t[4],r=p(t[1]),c=p(t[2])-1,m=p(t[3]),d=p(t[4]),i=p(t[5])-1;if(s)return fe(e,d,i)?ce(e,d,i):new Date(NaN);{const l=new Date(0);return!de(e,c,m)||!me(e,r)?new Date(NaN):(l.setUTCFullYear(e,c,Math.max(r,m)),l)}}function p(n){return n?parseInt(n):1}function oe(n){const e=n.match(ne);if(!e)return NaN;const t=h(e[1]),s=h(e[2]),r=h(e[3]);return pe(t,s,r)?t*b+s*w+r*1e3:NaN}function h(n){return n&&parseFloat(n.replace(",","."))||0}function le(n){if(n==="Z")return 0;const e=n.match(se);if(!e)return 0;const t=e[1]==="+"?-1:1,s=parseInt(e[2]),r=e[3]&&parseInt(e[3])||0;return xe(s,r)?t*(s*b+r*w):NaN}function ce(n,e,t){const s=new Date(0);s.setUTCFullYear(n,0,4);const r=s.getUTCDay()||7,c=(e-1)*7+t+1-r;return s.setUTCDate(s.getUTCDate()+c),s}const ue=[31,null,31,30,31,30,31,31,30,31,30,31];function v(n){return n%400===0||n%4===0&&n%100!==0}function de(n,e,t){return e>=0&&e<=11&&t>=1&&t<=(ue[e]||(v(n)?29:28))}function me(n,e){return e>=1&&e<=(v(n)?366:365)}function fe(n,e,t){return e>=1&&e<=53&&t>=0&&t<=6}function pe(n,e,t){return n===24?e===0&&t===0:t>=0&&t<60&&e>=0&&e<60&&n>=0&&n<25}function xe(n,e){return e>=0&&e<=59}function Re({}){return a.jsxs("div",{className:`
    h-screen 
    w-[calc(100vw-15rem)] 
    bg-slate-200
    flex
    flex-col
    relative
    `,children:[a.jsxs("header",{className:"flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5",children:[a.jsxs("h1",{className:`text-2xl gap-2 sm:text-3xl font-medium flex items-center
        `,children:[a.jsx(X,{})," Edit Bill"]}),a.jsx(y,{className:"w-full  bg-slate-300"})]}),a.jsx(ge,{})]})}function ge({}){const{billId:n}=I(),{data:e}=R({queryKey:["get_bills"]}),t=e==null?void 0:e.data.find(o=>o.id===n),s=E.omit({distributor_name:!0,domain_name:!0});console.log(e);const{userId:r}=q.useAuth(),c=O(),{mutate:m,isPending:d}=z({mutationKey:["put_bill"],mutationFn:async o=>(await k.put(`${B}/${r}/bill/${n}`,o)).data,onSuccess:()=>{$.success("Bill edited"),c.invalidateQueries({queryKey:["get_bills"]})}}),i=C({resolver:U(s),defaultValues:{distributor_id:t==null?void 0:t.distributor.id,domain_id:t==null?void 0:t.domain.id,date:ee((t==null?void 0:t.date)||new Date().toISOString()),is_paid:t==null?void 0:t.is_paid,bill_items:t==null?void 0:t.bill_items.map(o=>({amount:o.amount,quantity:o.quantity,product_id:o.product.id,id:o.id,product:{id:o.product.id,rate:o.product.rate}}))}}),l=F({name:"bill_items",control:i.control}),f=i.watch("bill_items"),N=l.fields.map((o,u)=>({...o,...f[u]}));function S(){l.append(M)}function T(o){l.remove(o)}const D=i.getValues().bill_items.reduce((o,u)=>o+u.amount,0);function _(o){m({...o,totalAmount:D,date:o.date.toISOString()})}return a.jsx(a.Fragment,{children:a.jsxs("form",{onSubmit:i.handleSubmit(_),children:[a.jsx("div",{className:" flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto",children:a.jsxs(A,{...i,children:[a.jsxs("div",{className:`
              lg:w-3/4 
              w-full 
              grid 
              border-2 
              lg:grid-cols-3 
              md:grid-cols-2 
              grid-cols-1 
              gap-x-2 
              gap-y-5
              border-white
              p-5
        `,children:[a.jsx(V,{form:i}),a.jsx(Z,{form:i}),a.jsx(W,{form:i}),a.jsx(L,{form:i})]}),a.jsxs("div",{className:`
              flex
              border-2 
              flex-col
              gap-3
              p-5
              lg:w-2/3 
              border-white
        `,children:[a.jsx("h1",{className:"text-2xl",children:"Items"}),a.jsx(y,{className:"bg-slate-300"}),N.map((o,u)=>a.jsxs("div",{className:` 
                  flex
                  gap-x-1
                  gap-y-5
        `,children:[a.jsx(Q,{form:i,index:u}),a.jsx(H,{form:i,index:u}),a.jsx(K,{form:i,index:u}),a.jsx(J,{form:i,index:u}),a.jsx(g,{variant:"destructive",className:"rounded-full  size-9 self-end ml-auto",disabled:N.length===1,size:"icon",onClick:()=>T(u),children:a.jsx(Y,{})})]},u)),a.jsxs(g,{variant:"outline",onClick:S,type:"button",className:"items-center w-fit  ",children:[a.jsx(G,{}),"Add Product"]})]})]})}),a.jsx("footer",{className:`
          bottom-0 
          bg-slate-100 
          px-5 py-3 
          md:w-[calc(100vw-15rem)]
          w-[calc(100vw-5rem)]
          absolute  
        `,children:a.jsxs("div",{className:"w-full md:w-2/3 flex justify-between",children:[a.jsx(g,{disabled:d,type:"submit",children:"Submit"}),a.jsxs("h1",{className:"text-xl font-semibold",children:["Total ",": ₹",D]})]})})]})})}export{Re as default};
