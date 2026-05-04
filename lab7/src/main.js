import './css/styles.css';
import { SkillCube } from './components/SkillCube.js';
import { courseData } from './data/courseData.js';

// 1. Registrar el Web Component
customElements.define('skill-cube', SkillCube);

// 2. Renderizar el menú lateral
const treeContainer = document.getElementById('tree-container');

courseData.phases.forEach(phase => {
  const phaseDiv = document.createElement('div');
  phaseDiv.className = 'skill-phase';
  phaseDiv.innerHTML = `<h3>${phase.name}</h3><div class="skill-grid"></div>`;
  
  const grid = phaseDiv.querySelector('.skill-grid');
  
  phase.topics.forEach(topic => {
    const cube = document.createElement('skill-cube');
    cube.setAttribute('data-id', topic.id);
    cube.setAttribute('title', topic.title);
    cube.setAttribute('color', topic.color);
    grid.appendChild(cube);
  });
  
  treeContainer.appendChild(phaseDiv);
});

// 3. Escuchar las selecciones del usuario
document.addEventListener('skill-selected', (e) => {
  const topicId = e.detail.id;
  let selectedTopic;
  
  courseData.phases.forEach(p => {
    const found = p.topics.find(t => t.id === topicId);
    if(found) selectedTopic = found;
  });

  if(selectedTopic) {
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('content-area').classList.add('active');
    
    document.getElementById('course-title').textContent = selectedTopic.title;
    document.getElementById('course-desc').textContent = selectedTopic.desc;
    document.getElementById('youtube-video').src = selectedTopic.video;
    
    const hlContainer = document.getElementById('highlights-list');
    hlContainer.innerHTML = '';
    selectedTopic.highlights.forEach(hl => {
      const li = document.createElement('li');
      li.textContent = hl;
      hlContainer.appendChild(li);
    });
  }
});