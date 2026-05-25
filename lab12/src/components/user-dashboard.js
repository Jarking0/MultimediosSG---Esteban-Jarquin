class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.setHTMLUnsafe(`
      <style>
        .dashboard { display:grid; gap:1rem; padding:1rem; background:#eee; border-radius:8px; }
      </style>
      <div class="dashboard"><slot></slot></div>
    `);
  }

  connectedCallback() {
    this.addEventListener('user:greet', (ev) => {
      const badge = this.querySelector('warning-badge');
      if (badge) {
        badge.setAttribute('pulsing','');
        badge.textContent = `Hola ${ev.detail.name}, sesión por expirar`;
      }
    });
  }
}
customElements.define('user-dashboard', UserDashboard);
