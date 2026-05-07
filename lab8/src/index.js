import './index.css'; // Vite lo inyectará
import { getShowData, getEpisodeList } from "./services/tvmaze.js";

// ID de la serie (ejemplo: 2993 es Stranger Things) [cite: 29]
const ID = "2993"; 

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

// 1. Obtener datos asíncronamente (con await) [cite: 35]
const show = await getShowData(ID);
const seasons = await getEpisodeList(ID);

// 2. Renderizar Header [cite: 42]
$header.setHTMLUnsafe(`
  <img class="poster" src="${show.image}" alt="${show.name}">
  <h1>${show.name}</h1>
`);

// 3. Crear HTML para episodios individualmente [cite: 42]
const createEpisodeHTML = (episode) => {
  // Redondeamos el rating para que calce con las clases del CSS de 0 a 10
  const ratingValue = Math.round(episode.rating);
  return `<div class="episode episode-${episode.number} rating-${ratingValue}">${episode.number}</div>`;
};

// 4. Crear HTML para la temporada completa [cite: 43]
const createSeasonHTML = (data, number) => {
  const episodesHTML = data.map(createEpisodeHTML).join("");
  return `
    <article class="season">
      <header class="season-header">T${number}</header>
      ${episodesHTML}
    </article>
  `;
};

// 5. Recorrer y renderizar la lista completa en el DOM [cite: 44, 45]
const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));
$episodes.setHTMLUnsafe(list.join(""));