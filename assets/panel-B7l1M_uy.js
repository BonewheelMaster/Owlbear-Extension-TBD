import{a as e,i as t,n,r,s as i,t as a}from"./util-DSV7c2X_.js";async function o(){let e=await i.scene.items.getItems(),t=a(e),n={};for(let e of t)n[e.id]=await i.scene.grid.snapPosition(e.position,1,!1,!0);i.scene.items.updateItems(t,e=>{for(let t of e)t.position=n[t.id]})}var s=i=>{let o=a(i),s=[];for(let a of o){let o=document.createElement(`li`),c=n(a),l=a.meta,u=r(i,l.target),d=u==null?`No target`:`Target: ${n(u)}`;switch(l.kind){case t:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case e:o.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}s.push(o)}document.querySelector(`#list`)?.replaceChildren(...s)};document.querySelector(`#button`)?.addEventListener(`click`,o);var c=document.querySelector(`#panel`);c!=null&&(c.innerHTML=`<ul id="list"></ul>`),i.onReady(()=>{i.scene.items.onChange(s)});