import{u as c,j as n,a as o}from"./index-CVfE49ll.js";import{d as t}from"./index-oZfdXCXz.js";import{B as r}from"./button-CSuLezZL.js";import"./browser-DrVg5YfN.js";import"./utils-DgjiVB1k.js";function l({}){const e=c(),s=[{title:"HOME",isActive:e.pathname==="/home"},{title:"FEATURES",isActive:e.pathname==="/features"},{title:"CONTACT",isActive:e.pathname==="/contact"}];return n.jsx("div",{className:"flex gap-5",children:s.map((i,a)=>n.jsx("h1",{className:"cursor-pointer font-medium",children:i.title},a))})}function m({}){const{openSignIn:e,openSignUp:s}=t.useClerk(),i=o();return n.jsxs("div",{className:`\r
    flex \r
    items-center \r
    justify-between\r
    h-20\r
    w-screen\r
    bg-violet-600\r
    sticky\r
    top-0\r
    p-5\r
    text-white\r
    `,children:[n.jsx("img",{className:"h-32 w-32 object-contain",src:"/logo-dark.png"}),n.jsx(l,{}),n.jsxs("div",{className:"flex items-center gap-5",children:[n.jsxs(t.SignedIn,{children:[n.jsx(r,{onClick:()=>i("/create-bill"),children:"Open the App"}),n.jsx(t.UserButton,{})]}),n.jsxs(t.SignedOut,{children:[n.jsx(r,{onClick:()=>e(),children:"Login"}),n.jsx(r,{className:"text-black",variant:"outline",onClick:()=>s(),children:"SignUp"})]})]})]})}function j({children:e}){return n.jsx("div",{className:"font-sans bg-obcPrimary ",children:n.jsx(m,{})})}export{j as default};
