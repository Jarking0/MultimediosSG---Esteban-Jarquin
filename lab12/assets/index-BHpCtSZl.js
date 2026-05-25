(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();class n extends HTMLElement{static get observedAttributes(){return["name","role","avatar"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
            .card { display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid #ccc; border-radius:8px; background:#fff; }
            img { width:64px; height:64px; border-radius:50%; object-fit:cover; }
            .info { flex:1; }
            h3 { margin:0; font-size:1rem; }
            p { margin:0; color:#555; }
            button { background:#4fc3f7; border:none; padding:0.5rem 1rem; border-radius:6px; cursor:pointer; font-weight:600; }
        </style>
        <div class="card">
            <img part="avatar" />
            <div class="info">
            <h3 part="name"></h3>
            <p part="role"></p>
            </div>
            <button part="button">Saludar</button>
        </div>
    `,this.$img=this.shadowRoot.querySelector("img"),this.$name=this.shadowRoot.querySelector("h3"),this.$role=this.shadowRoot.querySelector("p"),this.$btn=this.shadowRoot.querySelector("button"),this._onClick=this._onClick.bind(this)}connectedCallback(){this._render(),this.$btn.addEventListener("click",this._onClick)}disconnectedCallback(){this.$btn.removeEventListener("click",this._onClick)}attributeChangedCallback(){this._render()}_render(){this.$img.src=this.getAttribute("avatar")??"",this.$name.textContent=this.getAttribute("name")??"",this.$role.textContent=this.getAttribute("role")??""}_onClick(){this.dispatchEvent(new CustomEvent("user:greet",{detail:{name:this.getAttribute("name")},bubbles:!0,composed:!0}))}}customElements.define("user-card",n);class d extends HTMLElement{static get observedAttributes(){return["city","temp","status"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.setHTMLUnsafe(`
      <style>
        .weather { display:flex; gap:0.5rem; padding:0.5rem 1rem; background:#f6f8fb; border-radius:6px; font-weight:600; }
      </style>
      <div class="weather">
        <span part="city"></span>
        <span part="temp"></span>
        <span part="status"></span>
      </div>
    `),this.$city=this.shadowRoot.querySelector('[part="city"]'),this.$temp=this.shadowRoot.querySelector('[part="temp"]'),this.$status=this.shadowRoot.querySelector('[part="status"]')}connectedCallback(){this._render()}attributeChangedCallback(){this._render()}_render(){this.$city.textContent=this.getAttribute("city")??"",this.$temp.textContent=this.getAttribute("temp")??"",this.$status.textContent=this.getAttribute("status")??""}}customElements.define("weather-time",d);class c extends HTMLElement{static get observedAttributes(){return["pulsing"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.setHTMLUnsafe(`
      <style>
        .badge { padding:0.5rem 1rem; border-radius:6px; background:#ff9800; color:#fff; font-weight:700; animation:none; }
        .badge[pulsing] { animation:pulse 1s infinite alternate; }
        @keyframes pulse { from{opacity:0.6;} to{opacity:1;} }
      </style>
      <div class="badge"><slot></slot></div>
    `),this.$badge=this.shadowRoot.querySelector(".badge")}connectedCallback(){this._render()}attributeChangedCallback(){this._render()}_render(){this.hasAttribute("pulsing")?this.$badge.setAttribute("pulsing",""):this.$badge.removeAttribute("pulsing")}}customElements.define("warning-badge",c);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.setHTMLUnsafe(`
      <style>
        .dashboard { display:grid; gap:1rem; padding:1rem; background:#eee; border-radius:8px; }
      </style>
      <div class="dashboard"><slot></slot></div>
    `)}connectedCallback(){this.addEventListener("user:greet",r=>{const s=this.querySelector("warning-badge");s&&(s.setAttribute("pulsing",""),s.textContent=`Hola ${r.detail.name}, sesión por expirar`)})}}customElements.define("user-dashboard",l);
