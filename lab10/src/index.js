import './components/poster.js';

document.addEventListener('poster:action', (ev) => {
  console.log('CTA del cartel:', ev.detail);
});
