class WarningBadge extends HTMLElement {
  static get observedAttributes() { return ['pulsing']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.setHTMLUnsafe(`
      <style>
        .badge { padding:0.5rem 1rem; border-radius:6px; background:#ff9800; color:#fff; font-weight:700; animation:none; }
        .badge[pulsing] { animation:pulse 1s infinite alternate; }
        @keyframes pulse { from{opacity:0.6;} to{opacity:1;} }
      </style>
      <div class="badge"><slot></slot></div>
    `);
    this.$badge = this.shadowRoot.querySelector('.badge');
  }

  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }

  _render() {
    if (this.hasAttribute('pulsing')) this.$badge.setAttribute('pulsing','');
    else this.$badge.removeAttribute('pulsing');
  }
}
customElements.define('warning-badge', WarningBadge);
