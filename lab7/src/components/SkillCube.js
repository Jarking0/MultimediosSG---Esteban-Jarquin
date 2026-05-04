export class SkillCube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Tema';
    const color = this.getAttribute('color') || '#ff1493'; 

    this.shadowRoot.innerHTML = `
      <style>
        .cube {
          width: 65px;
          height: 65px;
          background-color: #1e1e1e;
          border: 3px solid ${color};
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
          box-shadow: 0 8px 15px ${color}66;
          background-color: ${color}22;
        }
        .cube.active {
          background-color: ${color};
          border-color: #fff;
          box-shadow: 0 0 20px ${color};
        }
        .abbr {
          color: #f5f5f5;
          font-weight: bold;
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px #000;
        }
        .cube.active .abbr { color: #fff; text-shadow: none; }
      </style>
      <div class="cube" title="${title}">
        <span class="abbr">${title.substring(0, 3).toUpperCase()}</span>
      </div>
    `;

    this.addEventListener('click', () => {
      // Ocultar activos previos
      document.querySelectorAll('skill-cube').forEach(c => {
        c.shadowRoot.querySelector('.cube').classList.remove('active');
      });
      // Activar el actual
      this.shadowRoot.querySelector('.cube').classList.add('active');
      
      // Emitir evento al main.js
      this.dispatchEvent(new CustomEvent('skill-selected', {
        bubbles: true,
        composed: true,
        detail: { id: this.getAttribute('data-id') }
      }));
    });
  }
}