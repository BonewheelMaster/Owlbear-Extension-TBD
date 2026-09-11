import{a as e,i as t,l as n,n as r,o as i,r as a,s as o,t as s}from"./util-CtbqfFtU.js";async function c(){let i=await n.scene.items.getItems(),a=r(i),o=await n.scene.grid.getDpi(),c={};for(let r of a){c[r.id]=await n.scene.grid.snapPosition(r.position,1,!1,!0);let a=t(i,r.meta.target);if(a===null)continue;let l=0;for(;l<r.meta.speed&&s(c[r.id],a.position)>5;){let t=Math.atan2(c[r.id].y-a.position.y,c[r.id].x-a.position.x);c[r.id].x-=e(o*Math.cos(t),o),c[r.id].y-=e(o*Math.sin(t),o),l+=5}}n.scene.items.updateItems(a,e=>{for(let n of e)t(i,n.meta.target)!==null&&(n.position=c[n.id])})}var l=e=>{let n=r(e),s=[];for(let r of n){let n=document.createElement(`li`),c=a(r),l=r.meta,u=t(e,l.target),d=u==null?`No target`:`Target: ${a(u)}`;switch(l.kind){case i:n.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case o:n.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}s.push(n)}document.querySelector(`#list`)?.replaceChildren(...s)};document.querySelector(`#button`)?.addEventListener(`click`,c);var u=document.querySelector(`#panel`);u!=null&&(u.innerHTML=`<ul id="list"></ul>`),n.onReady(()=>{n.scene.items.onChange(l)});