import{d as V,r as d,aH as m,c as _,e as E,h,f as t,w as e,j as w,q as S,s as C,A as v,z as f,i as r,m as D,ag as N,ap as z,_ as R}from"./index-CUpUbVCy.js";/* empty css                 *//* empty css                   *//* empty css                 *//* empty css                  */const U=a=>(S("data-v-a1b1f967"),a=a(),C(),a),g={class:"card content-box"},j=U(()=>h("span",{class:"text"},"复制指令",-1)),q={class:"content-main"},A=V({name:"copy"}),H=V({...A,setup(a){const s=d("我是被复制的内容 🍒 🍉 🍊"),l=d(""),c=d(),x=i=>{l.value=i},b=()=>{c.value&&c.value.clear()};return(i,o)=>{const n=D,u=w,y=N,I=z,k=m("copy"),B=m("paste");return _(),E("div",g,[j,h("div",q,[t(u,{modelValue:s.value,"onUpdate:modelValue":o[0]||(o[0]=p=>s.value=p),clearable:""},{append:e(()=>[v((_(),f(n,null,{default:e(()=>[r(" 复制 ")]),_:1})),[[k,s.value]])]),_:1},8,["modelValue"]),t(u,{ref_key:"pasterRef",ref:c,modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=p=>l.value=p),disabled:"",placeholder:"可以将复制内容粘贴给我"},{append:e(()=>[t(I,{size:12},{default:e(()=>[v((_(),f(n,null,{default:e(()=>[r("粘贴")]),_:1})),[[B,x]]),t(y,{direction:"vertical"}),t(n,{onClick:b},{default:e(()=>[r("清空")]),_:1})]),_:1})]),_:1},8,["modelValue"])])])}}}),K=R(H,[["__scopeId","data-v-a1b1f967"]]);export{K as default};