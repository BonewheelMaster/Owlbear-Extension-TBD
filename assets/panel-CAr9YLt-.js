import{a as e,i as t,n,t as r}from"./state-B2PLU1B4.js";var i=`Owlbear-Extension-TBD/io.github.bonewheelmaster/state`;function a(e){let n=[];for(let r of e)t(r.metadata[i])&&n.push({...r,meta:r.metadata[i]});return n}function o(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}function s(e){let t=o(e);return t==``?`${e.name}`:`${t}`}var c=document.querySelector(`#panel`);c!=null&&(c.innerHTML=`<ul id="list"></ul>`);var l=e=>{let t=a(e),i=[];for(let e of t){let t=document.createElement(`li`),a=s(e),o=e.meta;switch(o.kind){case r:t.innerHTML=`
                    <p>${a}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${o.speed}</li>
                        <li>target id: ${o.target}</li>
                    </ul>
                `;break;case n:t.innerHTML=`
                    <p>${a}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${o.speed}</li>
                        <li>target id: ${o.target}</li>
                        <li>range: ${o.range}</li>
                    </ul>
                `}i.push(t)}document.querySelector(`#list`)?.replaceChildren(...i)};e.onReady(()=>{e.scene.items.onChange(l)});