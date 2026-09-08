import{i as e,n as t,r as n,t as r}from"./state-CPUARrQy.js";var i=n((e=>{var t=e&&e.__assign||function(){return t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},t.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.STATE=e.ID=void 0,e.allNPCS=i;var n=r();e.ID=`Owlbear-Extension-TBD/io.github.bonewheelmaster`,e.STATE=`${e.ID}/state`;function i(e){for(var r=[],i=0,a=e;i<a.length;i++){var o=a[i];n.validMetadata(o.metadata)&&r.push(t(t({},o),{meta:o.metadata}))}return r}console.log(i([{enabled:!0,kind:`MELEE`,speed:30,target:``}]))})),a=e(r()),o=e(i());function s(e){return`text`in e&&typeof e.text==`object`&&e.text!=null&&`plainText`in e.text&&typeof e.text.plainText==`string`?e.text.plainText:``}function c(e){let t=s(e);return t==``?`${e.name}`:`${t}`}var l=document.querySelector(`#panel`);l!=null&&(l.innerHTML=`<ul id="list"></ul>`);var u=e=>{let t=o.filterNPCs(e),n=[];for(let e of t){let t=document.createElement(`li`),r=c(e),i=e.meta;switch(i.kind){case a.MELEE:t.innerHTML=`
                    <p>${r}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${i.speed}</li>
                        <li>target id: ${i.target}</li>
                    </ul>
                `;break;case a.RANGED:t.innerHTML=`
                    <p>${r}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${i.speed}</li>
                        <li>target id: ${i.target}</li>
                        <li>range: ${i.range}</li>
                    </ul>
                `}n.push(t)}document.querySelector(`#list`)?.replaceChildren(...n)};t.onReady(()=>{t.scene.items.onChange(u)});