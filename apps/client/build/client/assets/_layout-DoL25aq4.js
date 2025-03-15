import{u as c,j as e,O as o}from"./index-CVfE49ll.js";import{C as r}from"./circle-plus-NuuZ6w6j.js";import{c as m}from"./createLucideIcon-DtXzPAI9.js";import{S as d}from"./shopping-bag-BNWG7lHb.js";import{P as s}from"./package-DBjgMSOw.js";import{a as n}from"./browser-DrVg5YfN.js";import{d as p}from"./index-oZfdXCXz.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]],x=m("ScrollText",h);function u({}){const t=c(),a=[{title:"Create bill",link:"/create-bill",isActive:t.pathname==="/create-bill",icon:r},{title:"All bills",link:"/bills",isActive:t.pathname==="/bills",icon:x},{title:"Products",link:"/products",isActive:t.pathname==="/products",icon:d},{title:"Domains",link:"/domain",isActive:t.pathname==="/domain",icon:s},{title:"Distributors",link:"/distributor",isActive:t.pathname==="/distributor",icon:s}];return e.jsx("div",{className:"flex w-full flex-col gap-2",children:a.map((i,l)=>e.jsxs(n,{className:`
            flex
            px-5
            py-2
            gap-2
            md:justify-normal
            justify-center
            hover:bg-violet-400
            ${i.isActive?"bg-violet-400":""}
           `,to:i.link,children:[e.jsx(i.icon,{}),e.jsx("h1",{className:"md:block hidden",children:i.title})]},l))})}function f({}){return e.jsxs("div",{className:`
    flex 
    bg-violet-500 
    text-white 
    flex-col 
    gap-5 
    h-screen 
    sticky 
    left-0 
    top-0
    w-[5rem]  
    items-center
    md:items-stretch
    md:w-[15rem]
    `,children:[e.jsxs("header",{className:`flex
       gap-2 
       items-center 
       justify-between  
      px-5
      py-5
      `,children:[e.jsx(n,{className:"md:block hidden",to:"/",children:e.jsx("img",{className:"h-20  w-20 object-contain",src:"/logo-dark.png",alt:"logo"})}),e.jsx(p.UserButton,{})]}),e.jsx(u,{})]})}function w({}){return e.jsxs("div",{className:"flex max-h-screen ",children:[e.jsx(f,{}),e.jsx("div",{className:`     
        w-[calc(100vw-5rem)] 
        bg-slate-200
        md:w-[calc(100vw-15rem)] 

      `,children:e.jsx(o,{})})]})}export{w as default};
