import{a as e,c as t,d as n,i as r,r as i,s as a,t as o}from"./util-eD5njD03.js";async function s(){let t=await n.scene.items.getItems(),r=i(t),a=await n.scene.grid.getDpi(),o={};for(let i of r){o[i.id]=await n.scene.grid.snapPosition(i.position,1,!1,!0);let r=e(t,i.meta.target);if(r===null)continue;let s=0;for(;s<i.meta.speed;){let e=await c(o[i.id],r.position);if(e.gridType==`Square`&&e.movement==`Stand`)break;o[i.id]=l(a,o[i.id],e),s+=5}}n.scene.items.updateItems(r,n=>{for(let r of n)e(t,r.meta.target)!==null&&(r.position=o[r.id])})}async function c(e,t){let r=await n.scene.grid.snapPosition(t,1,!1,!0),i=await n.scene.grid.getDpi();return o(e,r)<2*i?{gridType:`Square`,movement:`Stand`}:u(Math.atan2(r.y-e.y,r.x-e.x),`Square`)}function l(e,t,n){let r=t;if(n.gridType===`Square`)switch(n.movement){case`Stand`:break;case`N`:r={...t,y:t.y-=e};break;case`NW`:r={...t,y:t.y-=e,x:t.x-=e};break;case`W`:r={...t,x:t.x-=e};break;case`SW`:r={...t,y:t.y+=e,x:t.x-=e};break;case`S`:r={...t,y:t.y+=e};break;case`SE`:r={...t,y:t.y+=e,x:t.x+=e};break;case`E`:r={...t,x:t.x+=e};break;case`NE`:r={...t,y:t.y-=e,x:t.x+=e}}return r}function u(e,t){let n=Math.round(Math.cos(e)),r=-Math.round(Math.sin(e)),i=``;switch(r){case 1:i+=`N`;break;case 0:break;case-1:i+=`S`}switch(n){case-1:i+=`W`;break;case 0:break;case 1:i+=`E`}return i==``?{gridType:t,movement:`Stand`}:{gridType:t,movement:i}}var d=n=>{let o=i(n),s=[];for(let i of o){let o=document.createElement(`li`),c=r(i),l=i.meta,u=e(n,l.target),d=u==null?`No target`:`Target: ${r(u)}`;switch(l.kind){case a:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case t:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}s.push(o)}document.querySelector(`#list`)?.replaceChildren(...s)};document.querySelector(`#button`)?.addEventListener(`click`,s);var f=document.querySelector(`#panel`);f!=null&&(f.innerHTML=`<ul id="list"></ul>`),n.onReady(()=>{n.scene.items.onChange(d)});