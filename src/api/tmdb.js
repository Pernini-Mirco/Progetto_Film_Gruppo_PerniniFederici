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
