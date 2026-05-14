class PosterCard extends HTMLElement {
  static get observedAttributes() {
    return ['title','subtitle','img','cta-text','cta-href','theme'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.setHTMLUnsafe(`
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
    `);
    this.$img = this.shadowRoot.querySelector('img');
    this.$title = this.shadowRoot.querySelector('h3');
    this.$subtitle = this.shadowRoot.querySelector('p');
    this.$cta = this.shadowRoot.querySelector('.cta');
    this.$article = this.shadowRoot.querySelector('article');
    this._onCta = this._onCta.bind(this);
  }

  connectedCallback() {
    this._upgradeProperties();
    this._render();
    this.$cta.addEventListener('click', this._onCta);
  }

  disconnectedCallback() {
    this.$cta.removeEventListener('click', this._onCta);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    this._render();
  }

  _upgradeProperties() {
    ['title','subtitle','img','cta-text','cta-href','theme'].forEach(prop => {
      if (this.hasOwnProperty(prop)) {
        const val = this[prop];
        delete this[prop];
        this[prop] = val;
      }
    });
  }

  _render() {
    const title = this.getAttribute('title') ?? '';
    const subtitle = this.getAttribute('subtitle') ?? '';
    const img = this.getAttribute('img') ?? '';
    const ctaText = this.getAttribute('cta-text') ?? 'Leer más';
    const ctaHref = this.getAttribute('cta-href') ?? '';
    this.$title.textContent = title;
    this.$subtitle.textContent = subtitle;
    this.$img.src = img;
    this.$img.alt = title || 'Imagen del cartel';
    this.$cta.textContent = ctaText;
    this.$article.setAttribute('aria-label', title || 'Cartel');
    if (this.hasAttribute('theme')) {
      this.style.setProperty('--accent', this.getAttribute('theme'));
    }
    if (ctaHref) this.$cta.dataset.href = ctaHref;
    else this.$cta.removeAttribute('data-href');
  }

  _onCta(ev) {
    const href = ev.currentTarget.dataset.href ?? null;
    this.dispatchEvent(new CustomEvent('poster:action', {
      detail: { href, title: this.getAttribute('title') },
      bubbles: true,
      composed: true
    }));
    if (href) window.open(href, '_blank', 'noopener');
  }
}

customElements.define('poster-card', PosterCard);
