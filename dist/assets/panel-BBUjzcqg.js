import{t as e}from"./lib-DDC6bRlI.js";var t=`Owlbear-Extension-TBD/io.github.bonewheelmaster/state`;document.documentElement.innerHTML=`
    <div>
        <ul id="list"></ul>
    </div>
`;var n=e=>{let n=[];for(let r of e){let e=r.metadata[t];typeof e==`object`&&e&&`enabled`in e&&n.push({name:r.name})}let r=[];for(let e of n){let t=document.createElement(`li`);t.innerHTML=`${e.name}`,r.push(t)}document.querySelector(`#list`)?.replaceChildren(...r)};e.onReady(()=>{e.scene.items.onChange(n)});