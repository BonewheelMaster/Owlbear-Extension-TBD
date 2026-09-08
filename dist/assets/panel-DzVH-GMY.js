import{a as e,i as t,n,t as r}from"./state-B2PLU1B4.js";async function i(){let n=await e.scene.items.getItems();var r=[];for(let e of n)t(e.metadata)&&r.push({...e,meta:e.metadata});return r}function a(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}function o(e){let t=a(e);return t==``?`${e.name}`:`${t}`}var s=document.querySelector(`#panel`);s!=null&&(s.innerHTML=`<ul id="list"></ul>`);var c=async e=>{let t=await i(),a=[];for(let e of t){let t=document.createElement(`li`),i=o(e),s=e.meta;switch(s.kind){case r:t.innerHTML=`
                    <p>${i}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${s.speed}</li>
                        <li>target id: ${s.target}</li>
                    </ul>
                `;break;case n:t.innerHTML=`
                    <p>${i}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${s.speed}</li>
                        <li>target id: ${s.target}</li>
                        <li>range: ${s.range}</li>
                    </ul>
                `}a.push(t)}document.querySelector(`#list`)?.replaceChildren(...a)};e.onReady(()=>{e.scene.items.onChange(c)});