(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const s=this.getAttribute("title")||"Tema",t=this.getAttribute("color")||"#ff1493";this.shadowRoot.innerHTML=`
      <style>
        .cube {
          width: 65px;
          height: 65px;
          background-color: #1e1e1e;
          border: 3px solid ${t};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }
        .cube:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 15px ${t}66;
          background-color: ${t}22;
        }
        .cube.active {
          background-color: ${t};
          border-color: #fff;
          box-shadow: 0 0 20px ${t};
        }
        .abbr {
          color: #f5f5f5;
          font-weight: bold;
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px #000;
        }
        .cube.active .abbr { color: #fff; text-shadow: none; }
      </style>
      <div class="cube" title="${s}">
        <span class="abbr">${s.substring(0,3).toUpperCase()}</span>
      </div>
    `,this.addEventListener("click",()=>{document.querySelectorAll("skill-cube").forEach(i=>{i.shadowRoot.querySelector(".cube").classList.remove("active")}),this.shadowRoot.querySelector(".cube").classList.add("active"),this.dispatchEvent(new CustomEvent("skill-selected",{bubbles:!0,composed:!0,detail:{id:this.getAttribute("data-id")}}))})}}const n={phases:[{name:"Fundamentos",topics:[{id:"t1",title:"Ritmo",color:"#4b0082",desc:"Comprende el groove, tempo y compases. La base de cualquier beat.",video:"https://www.youtube.com/embed/dQw4w9WgXcQ",highlights:["00:00 - Intro","15:30 - Creando tu primer beat"]},{id:"t2",title:"Síntesis",color:"#4b0082",desc:"Diseño sonoro básico con osciladores.",video:"https://www.youtube.com/embed/dQw4w9WgXcQ",highlights:["05:10 - Tipos de onda","45:00 - Modulación"]}]},{name:"Producción Avanzada",topics:[{id:"t3",title:"Mezcla",color:"#ff1493",desc:"Ecualización, compresión y balance espacial.",video:"https://www.youtube.com/embed/dQw4w9WgXcQ",highlights:["10:00 - EQ Sustractiva","01:20:00 - Sidechain compresion"]},{id:"t4",title:"Mastering",color:"#ff1493",desc:"Da el volumen y brillo final comercial a tu track.",video:"https://www.youtube.com/embed/dQw4w9WgXcQ",highlights:["00:00 - Limitadores","30:00 - Loudness Penalty"]}]}]};customElements.define("skill-cube",d);const l=document.getElementById("tree-container");n.phases.forEach(c=>{const s=document.createElement("div");s.className="skill-phase",s.innerHTML=`<h3>${c.name}</h3><div class="skill-grid"></div>`;const t=s.querySelector(".skill-grid");c.topics.forEach(i=>{const e=document.createElement("skill-cube");e.setAttribute("data-id",i.id),e.setAttribute("title",i.title),e.setAttribute("color",i.color),t.appendChild(e)}),l.appendChild(s)});document.addEventListener("skill-selected",c=>{const s=c.detail.id;let t;if(n.phases.forEach(i=>{const e=i.topics.find(o=>o.id===s);e&&(t=e)}),t){document.getElementById("welcome-message").style.display="none",document.getElementById("content-area").classList.add("active"),document.getElementById("course-title").textContent=t.title,document.getElementById("course-desc").textContent=t.desc,document.getElementById("youtube-video").src=t.video;const i=document.getElementById("highlights-list");i.innerHTML="",t.highlights.forEach(e=>{const o=document.createElement("li");o.textContent=e,i.appendChild(o)})}});
