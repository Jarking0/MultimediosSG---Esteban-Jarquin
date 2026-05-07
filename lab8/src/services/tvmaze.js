const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

// Función 1: Obtener la info principal de la serie [cite: 30, 31]
export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then(res => res.json());

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  };
};

// Función 2: Obtener los episodios y agruparlos por temporada [cite: 32, 33]
export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then(res => res.json());
  
  const episodeList = episodes.map(episode => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating?.average || 0
  }));

  // Agrupa los episodios por temporada (Feature moderna de JS) [cite: 33]
  const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
  return episodesBySeason;
};