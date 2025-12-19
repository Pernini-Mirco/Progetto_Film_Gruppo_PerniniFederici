export const API_KEY = "80c644ead04172781483062c8214a982";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_URL = "https://image.tmdb.org/t/p/w500";

export async function searchContent(query, type) {
  const res = await fetch(
    `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=it-IT&query=${query}`
  );
  const data = await res.json();
  return data.results;
}

export async function getDetails(id, type) {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=it-IT&append_to_response=credits`
  );
  return await res.json();
}

// Funzione per ottenere i generi disponibili
export async function getGenres(type) {
  try {
    const res = await fetch(
      `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=it-IT`
    );
    const data = await res.json();
    return data.genres || [];
  } catch (error) {
    console.error("Errore nel recupero generi:", error);
    return [];
  }
}

// Funzione per cercare con filtri avanzati (genere e anno)
export async function discoverContent(type, filters = {}) {
  const { genre, yearFrom, yearTo } = filters;
  
  let url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=it-IT`;
  
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  
  if (yearFrom) {
    url += `&primary_release_date.gte=${yearFrom}-01-01`;
  }
  
  if (yearTo) {
    url += `&primary_release_date.lte=${yearTo}-12-31`;
  }
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Errore nella ricerca filtrata:", error);
    return [];
  }
}

// Funzione per ottenere i contenuti di tendenza
export async function getTrendingContent(type = "movie") {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=it-IT`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Errore nel recupero trending:", error);
    return [];
  }
}