class UserCard extends HTMLElement {
  static get observedAttributes() { return ['name','role','avatar']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.setHTMLUnsafe(`
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
    `);
    this.$img = this.shadowRoot.querySelector('img');
    this.$name = this.shadowRoot.querySelector('h3');
    this.$role = this.shadowRoot.querySelector('p');
    this.$btn = this.shadowRoot.querySelector('button');
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() { this._render(); this.$btn.addEventListener('click', this._onClick); }
  disconnectedCallback() { this.$btn.removeEventListener('click', this._onClick); }
  attributeChangedCallback() { this._render(); }

  _render() {
    this.$img.src = this.getAttribute('avatar') ?? '';
    this.$name.textContent = this.getAttribute('name') ?? '';
    this.$role.textContent = this.getAttribute('role') ?? '';
  }

  _onClick() {
    this.dispatchEvent(new CustomEvent('user:greet', {
      detail: { name: this.getAttribute('name') },
      bubbles: true,
      composed: true
    }));
  }
}
customElements.define('user-card', UserCard);
