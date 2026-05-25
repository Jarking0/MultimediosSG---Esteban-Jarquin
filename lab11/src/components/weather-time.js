class WeatherTime extends HTMLElement {
  static get observedAttributes() { return ['city','temp','status']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.setHTMLUnsafe(`
      <style>
        .weather { display:flex; gap:0.5rem; padding:0.5rem 1rem; background:#f6f8fb; border-radius:6px; font-weight:600; }
      </style>
      <div class="weather">
        <span part="city"></span>
        <span part="temp"></span>
        <span part="status"></span>
      </div>
    `);
    this.$city = this.shadowRoot.querySelector('[part="city"]');
    this.$temp = this.shadowRoot.querySelector('[part="temp"]');
    this.$status = this.shadowRoot.querySelector('[part="status"]');
  }

  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }

  _render() {
    this.$city.textContent = this.getAttribute('city') ?? '';
    this.$temp.textContent = this.getAttribute('temp') ?? '';
    this.$status.textContent = this.getAttribute('status') ?? '';
  }
}
customElements.define('weather-time', WeatherTime);
