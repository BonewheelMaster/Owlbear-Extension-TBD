import{a as e,c as t,i as n,n as r,o as i,r as a,t as o}from"./util-BQIaYKzq.js";async function s(){let e=await t.scene.items.getItems(),r=o(e),i=await t.scene.grid.getDpi(),s={};for(let o of r){s[o.id]=await t.scene.grid.snapPosition(o.position,1,!1,!0);let r=a(e,o.meta.target);if(r===null)continue;let c=0;for(;c<o.meta.speed;){let e=Math.atan2(s[o.id].y-r.position.y,s[o.id].x-r.position.x);s[o.id].x-=n(i*Math.cos(e),i),s[o.id].y-=n(i*Math.sin(e),i),c+=5}}t.scene.items.updateItems(r,t=>{for(let n of t)a(e,n.meta.target)!==null&&(n.position=s[n.id])})}var c=t=>{let n=o(t),s=[];for(let o of n){let n=document.createElement(`li`),c=r(o),l=o.meta,u=a(t,l.target),d=u==null?`No target`:`Target: ${r(u)}`;switch(l.kind){case e:n.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case i:n.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}s.push(n)}document.querySelector(`#list`)?.replaceChildren(...s)};document.querySelector(`#button`)?.addEventListener(`click`,s);var l=document.querySelector(`#panel`);l!=null&&(l.innerHTML=`<ul id="list"></ul>`),t.onReady(()=>{t.scene.items.onChange(c)});