import{a as e,i as t,n,t as r}from"./state-B2PLU1B4.js";var i=`Owlbear-Extension-TBD/io.github.bonewheelmaster/state`;function a(e){let n=[];for(let r of e)t(r.metadata[i])&&n.push({...r,meta:r.metadata[i]});return n}function o(e,t){let n=e.filter(e=>e.id==t);return n.length==1?n[0]:null}function s(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}function c(e){let t=s(e);return t==``?`${e.name}`:`${t}`}async function l(){let t=a(await e.scene.items.getItems());console.log(t)}var u=e=>{let t=a(e),i=[];for(let a of t){let t=document.createElement(`li`),s=c(a),l=a.meta,u=o(e,l.target),d=u==null?`No target`:`Target: ${c(u)}`;switch(l.kind){case r:t.innerHTML=`
                    <p>${s}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                    </ul>
                `;break;case n:t.innerHTML=`
                    <p>${s}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${l.speed}</li>
                        <li>${d}</li>
                        <li>range: ${l.range}</li>
                    </ul>
                `}i.push(t)}document.querySelector(`#list`)?.replaceChildren(...i)};document.querySelector(`#button`)?.addEventListener(`click`,l);var d=document.querySelector(`#panel`);d!=null&&(d.innerHTML=`<ul id="list"></ul>`),e.onReady(()=>{e.scene.items.onChange(u)});