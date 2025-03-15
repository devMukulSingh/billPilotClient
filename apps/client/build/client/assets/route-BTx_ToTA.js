import{j as e}from"./index-CVfE49ll.js";import{u as g,a as w,F as v,t as N}from"./form-BKpDzj8W.js";import{b as y}from"./schema-Dy7N3xTd.js";import{D as _,a as S,b as I,I as A,P as C,c as B,d as F,e as P}from"./Domain-BKbDTKpk.js";import{u as E,S as m,X as R,I as o,a as V,B as D}from"./index-DOh0zPzq.js";import{B as i}from"./button-CSuLezZL.js";import{u as k,V as z}from"./index-ZiYbebhz.js";import{d as L}from"./index-oZfdXCXz.js";import{C as c}from"./circle-plus-NuuZ6w6j.js";import"./utils-DgjiVB1k.js";import"./AddDistributorDialog-DHilJ0vC.js";import"./input-DzGSjn4M.js";import"./browser-DrVg5YfN.js";import"./chevron-up-Zz_Bt0yl.js";import"./createLucideIcon-DtXzPAI9.js";import"./AddProductDialog-BJw-AUYz.js";import"./AddDomainDialog-C8iWH7sR.js";const Q=y.omit({distributor_name:!0,domain_name:!0});function T({}){const{userId:d}=L.useAuth(),u=k(),{mutate:x,isPending:f}=E({mutationKey:["post_bill"],mutationFn:async t=>(await V.post(`${D}/${d}/bill`,t)).data,onSuccess:()=>{z.success("Bill added"),u.invalidateQueries({queryKey:["get_bills"]})}}),s=g({resolver:N(Q),defaultValues:{is_paid:!1,date:new Date,distributor_id:"",domain_id:"",bill_items:[o]}}),l=w({name:"bill_items",control:s.control}),p=s.watch("bill_items"),r=l.fields.map((t,a)=>({...t,...p[a]}));function b(){l.append(o)}function h(t){l.remove(t)}const n=s.getValues().bill_items.reduce((t,a)=>t+a.amount,0);function j(t){x({...t,date:t.date.toISOString(),totalAmount:n})}return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:s.handleSubmit(j),children:[e.jsx("div",{className:" flex max-h-[85vh]  border-black  flex-col gap-5 px-5 pb-20 overflow-auto",children:e.jsxs(v,{...s,children:[e.jsxs("div",{className:`
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
        `,children:[e.jsx(_,{form:s}),e.jsx(S,{form:s}),e.jsx(I,{form:s}),e.jsx(A,{form:s})]}),e.jsxs("div",{className:`
              flex
              border-2 
              flex-col
              gap-3
              p-5
              lg:w-2/3 
              border-white
        `,children:[e.jsx("h1",{className:"text-2xl",children:"Items"}),e.jsx(m,{className:"bg-slate-300"}),r.map((t,a)=>e.jsxs("div",{className:` 
                  flex
                  gap-x-1
                  gap-y-5
        `,children:[e.jsx(C,{form:s,index:a}),e.jsx(B,{form:s,index:a}),e.jsx(F,{form:s,index:a}),e.jsx(P,{form:s,index:a}),e.jsx(i,{variant:"destructive",className:"rounded-full  size-9 self-end ml-auto",disabled:r.length===1,size:"icon",onClick:()=>h(a),children:e.jsx(R,{})})]},a)),e.jsxs(i,{variant:"outline",onClick:b,type:"button",className:"items-center w-fit  ",children:[e.jsx(c,{}),"Add Product"]})]})]})}),e.jsx("footer",{className:`
          bottom-0 
          bg-slate-100 
          px-5 py-3 
          md:w-[calc(100vw-15rem)]
          w-[calc(100vw-5rem)]
          absolute  
        `,children:e.jsxs("div",{className:"w-full md:w-2/3 flex justify-between",children:[e.jsx(i,{disabled:f,type:"submit",children:"Submit"}),e.jsxs("h1",{className:"text-xl font-semibold",children:["Total ",": ₹",n]})]})})]})})}function le({}){return e.jsxs("div",{className:`
      h-full
      w-full
      flex
      flex-col
      relative
    `,children:[e.jsxs("header",{className:"flex flex-col sticky top-0 bg-inherit z-50 gap-2 p-5",children:[e.jsxs("h1",{className:`text-2xl gap-2 sm:text-3xl font-medium flex items-center
        `,children:[e.jsx(c,{})," Create Bill"]}),e.jsx(m,{className:"w-full  bg-slate-300"})]}),e.jsx(T,{})]})}export{le as default};
