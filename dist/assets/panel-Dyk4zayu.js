import{a as e,i as t,n,t as r}from"./state-B2PLU1B4.js";function i(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}var a=document.querySelector(`#panel`);a!=null&&(a.innerHTML=`<ul id="list"></ul>`);var o=`Owlbear-Extension-TBD/io.github.bonewheelmaster/state`,s=e=>{let a=[];for(let t of e){let e=t.metadata[o];typeof e==`object`&&e&&`enabled`in e&&e.enabled==1&&a.push(t)}let s=[];for(let e of a){let a=document.createElement(`li`),l=i(e);var c=``;if(l==``)var c=`${e.name}`;else var c=`${l}`;let u=e.metadata[o];if(t(u)){switch(u.kind){case r:a.innerHTML=`
                    <p>${c}</p>

                    <ol>
                        <li>speed: ${u.speed}</li>
                        <li>target id: ${u.target}</li>
                    </ol>
                `;break;case n:a.innerHTML=`
                    <p>${c}</p>

                    <ol>
                        <li>speed: ${u.speed}</li>
                        <li>target id: ${u.target}</li>
                        <li>range: ${u.range}</li>
                    </ol>
                `}s.push(a)}}document.querySelector(`#list`)?.replaceChildren(...s)};e.onReady(()=>{e.scene.items.onChange(s)});