import{a as e,i as t,n,t as r}from"./state-B2PLU1B4.js";function i(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}function a(e){let t=i(e);return t==``?`${e.name}`:`${t}`}var o=document.querySelector(`#panel`);o!=null&&(o.innerHTML=`<ul id="list"></ul>`);var s=`Owlbear-Extension-TBD/io.github.bonewheelmaster/state`,c=e=>{let i=[];for(let t of e){let e=t.metadata[s];typeof e==`object`&&e&&`enabled`in e&&e.enabled==1&&i.push(t)}let o=[];for(let e of i){let i=document.createElement(`li`),c=a(e),l=e.metadata[s];if(t(l)){switch(l.kind){case r:i.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>target id: ${l.target}</li>
                    </ul>
                `;break;case n:i.innerHTML=`
                    <p>${c}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>target id: ${l.target}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}o.push(i)}}document.querySelector(`#list`)?.replaceChildren(...o)};e.onReady(()=>{e.scene.items.onChange(c)});