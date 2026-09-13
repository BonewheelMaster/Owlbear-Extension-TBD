import{i as e,n as t,o as n,r,s as i,t as a,u as o}from"./util-BTmjMW0N.js";async function s(){let n=await o.scene.items.getItems(),r=t(n),i=await o.scene.grid.getDpi(),a={};for(let t of r){a[t.id]=await o.scene.grid.snapPosition(t.position,1,!1,!0);let r=e(n,t.meta.target);if(r===null)continue;let s=0;for(;s<t.meta.speed;){let e=await c(a[t.id],r.position);if(e.gridType==`Square`&&e.movement==`Stand`)break;a[t.id]=l(i,a[t.id],e),s+=5}}o.scene.items.updateItems(r,t=>{for(let r of t)e(n,r.meta.target)!==null&&(r.position=a[r.id])})}async function c(e,t){let n=await o.scene.grid.snapPosition(t,1,!1,!0),r=await o.scene.grid.getDpi();return a(e,n)<2*r?{gridType:`Square`,movement:`Stand`}:u(Math.atan2(n.y-e.y,n.x-e.x),`Square`)}function l(e,t,n){let r=t;if(n.gridType===`Square`)switch(n.movement){case`Stand`:break;case`N`:r={...t,y:t.y-=e};break;case`NW`:r={...t,y:t.y-=e,x:t.x-=e};break;case`W`:r={...t,x:t.x-=e};break;case`SW`:r={...t,y:t.y+=e,x:t.x-=e};break;case`S`:r={...t,y:t.y+=e};break;case`SE`:r={...t,y:t.y+=e,x:t.x+=e};break;case`E`:r={...t,x:t.x+=e};break;case`NE`:r={...t,y:t.y-=e,x:t.x+=e}}return r}function u(e,t){let n=Math.round(Math.cos(e)),r=-Math.round(Math.sin(e)),i=``;switch(r){case 1:i+=`N`;break;case 0:break;case-1:i+=`S`}switch(n){case-1:i+=`W`;break;case 0:break;case 1:i+=`E`}return i==``?{gridType:t,movement:`Stand`}:{gridType:t,movement:i}}var d=a=>{let o=t(a),s=[];for(let t of o){let o=document.createElement(`li`),c=r(t),l=t.meta,u=e(a,l.target),d=u==null?`No target`:`Target: ${r(u)}`;switch(l.kind){case n:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case i:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}s.push(o)}document.querySelector(`#list`)?.replaceChildren(...s)};document.querySelector(`#button`)?.addEventListener(`click`,s);var f=document.querySelector(`#panel`);f!=null&&(f.innerHTML=`<ul id="list"></ul>`),o.onReady(()=>{o.scene.items.onChange(d)});