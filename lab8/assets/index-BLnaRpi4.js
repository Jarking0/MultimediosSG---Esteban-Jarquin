(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const d="https://placehold.co/210x295",u=async o=>{const s=`https://api.tvmaze.com/shows/${o}`,n=await fetch(s).then(r=>r.json());return{name:n.name,rating:n.rating,image:n.image?.medium??d}},l=async o=>{const s=`https://api.tvmaze.com/shows/${o}/episodes`,r=(await fetch(s).then(e=>e.json())).map(e=>({number:e.number,season:e.season,rating:e.rating?.average||0}));return Object.groupBy(r,e=>e.season)},i="2993",m=document.querySelector("header"),p=document.querySelector(".episodes"),c=await u(i),f=await l(i);m.setHTMLUnsafe(`
  <img class="poster" src="${c.image}" alt="${c.name}">
  <h1>${c.name}</h1>
`);const h=o=>{const s=Math.round(o.rating);return`<div class="episode episode-${o.number} rating-${s}">${o.number}</div>`},g=(o,s)=>{const n=o.map(h).join("");return`
    <article class="season">
      <header class="season-header">T${s}</header>
      ${n}
    </article>
  `},y=Object.values(f).map((o,s)=>g(o,s+1));p.setHTMLUnsafe(y.join(""));
