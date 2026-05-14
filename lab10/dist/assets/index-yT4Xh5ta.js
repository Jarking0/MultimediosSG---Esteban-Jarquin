(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();class n extends HTMLElement{static get observedAttributes(){return["title","subtitle","img","cta-text","cta-href","theme"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.setHTMLUnsafe(`
      <style>
        :host {
          --card-bg: #fff;
          --accent: #ffd54f;
          --text: #111;
          --radius: 12px;
          display: block;
          max-width: 420px;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .card {
          background: var(--card-bg);
          color: var(--text);
          border-radius: var(--radius);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          overflow: hidden;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }
        .media {
          position: relative;
          width: 100%;
          height: 220px;
          background: linear-gradient(180deg, #f3f6fb, #e9eef8);
          display: grid;
          place-items: center;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        ::slotted([slot="badge"]) {
          position: absolute;
          left: 12px;
          top: 12px;
          background: rgba(0,0,0,0.6);
          color: white;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        h3 { margin: 0; font-size: 1.05rem; font-weight: 800; }
        p { margin: 0; color: #444; font-size: 0.95rem; }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: linear-gradient(180deg, rgba(0,0,0,0.01), transparent);
        }
        .cta {
          background: var(--accent);
          color: #111;
          border: none;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 800;
        }
        ::part(image) { display: block; }
        ::part(title) { font-weight: 800; }
        ::part(cta) { background: var(--accent); }
        @media (max-width: 420px) {
          :host { max-width: 100%; }
          .media { height: 160px; }
        }
      </style>

      <article class="card" role="article" aria-label="">
        <div class="media">
          <slot name="badge"></slot>
          <img part="image" alt="" />
        </div>

        <div class="content">
          <h3 part="title"></h3>
          <p part="subtitle"></p>
          <slot></slot>
        </div>

        <div class="footer">
          <small part="meta"></small>
          <button part="cta" class="cta"></button>
        </div>
      </article>
    `),this.$img=this.shadowRoot.querySelector("img"),this.$title=this.shadowRoot.querySelector("h3"),this.$subtitle=this.shadowRoot.querySelector("p"),this.$cta=this.shadowRoot.querySelector(".cta"),this.$article=this.shadowRoot.querySelector("article"),this._onCta=this._onCta.bind(this)}connectedCallback(){this._upgradeProperties(),this._render(),this.$cta.addEventListener("click",this._onCta)}disconnectedCallback(){this.$cta.removeEventListener("click",this._onCta)}attributeChangedCallback(e,r,a){r!==a&&this._render()}_upgradeProperties(){["title","subtitle","img","cta-text","cta-href","theme"].forEach(e=>{if(this.hasOwnProperty(e)){const r=this[e];delete this[e],this[e]=r}})}_render(){const e=this.getAttribute("title")??"",r=this.getAttribute("subtitle")??"",a=this.getAttribute("img")??"",t=this.getAttribute("cta-text")??"Leer más",i=this.getAttribute("cta-href")??"";this.$title.textContent=e,this.$subtitle.textContent=r,this.$img.src=a,this.$img.alt=e||"Imagen del cartel",this.$cta.textContent=t,this.$article.setAttribute("aria-label",e||"Cartel"),this.hasAttribute("theme")&&this.style.setProperty("--accent",this.getAttribute("theme")),i?this.$cta.dataset.href=i:this.$cta.removeAttribute("data-href")}_onCta(e){const r=e.currentTarget.dataset.href??null;this.dispatchEvent(new CustomEvent("poster:action",{detail:{href:r,title:this.getAttribute("title")},bubbles:!0,composed:!0})),r&&window.open(r,"_blank","noopener")}}customElements.define("poster-card",n);document.addEventListener("poster:action",s=>{console.log("CTA del cartel:",s.detail)});
