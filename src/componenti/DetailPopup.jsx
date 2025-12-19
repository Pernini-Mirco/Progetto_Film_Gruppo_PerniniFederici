import React from "react";
import { IMG_URL } from "../api/tmdb";

export default function DetailPopup({ detail, onClose, type }) {
  if (!detail) return null;

  const title = detail.title || detail.name;
  const releaseDate = detail.release_date || detail.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  
  const backdropPath = detail.backdrop_path
    ? `${IMG_URL}${detail.backdrop_path}`
    : detail.poster_path 
    ? `${IMG_URL}${detail.poster_path}`
    : "https://via.placeholder.com/1280x720/333/fff?text=Nessuna+Immagine";
  
  const genres = detail.genres ? detail.genres.map(g => g.name).join(", ") : "N/A";
  const voteAverage = detail.vote_average ? detail.vote_average.toFixed(1) : "N/A";
  
  // Cast principale (primi 5 attori)
  const cast = detail.credits?.cast?.slice(0, 5).map(actor => actor.name).join(", ") || "Non disponibile";

  const handleBackdropClick = (e) => {
    if (e.target.className === "popup-backdrop") {
      onClose();
    }
  };

  return (
    <div className="popup-backdrop" onClick={handleBackdropClick}>
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="popup-image">
          <img src={backdropPath} alt={title} />
        </div>
        
        <div className="popup-info">
          <h2 className="popup-title">{title}</h2>
          
          <div className="popup-meta">
            <span className="popup-year">📅 {year}</span>
            <span className="popup-rating">⭐ {voteAverage}</span>
            <span className="popup-type">{type === "movie" ? "🎬 Film" : "📺 Serie TV"}</span>
          </div>
          
          <div className="popup-genres">
            <strong>Generi:</strong> {genres}
          </div>
          
          <div className="popup-overview">
            <h3>Trama</h3>
            <p>{detail.overview || "Trama non disponibile"}</p>
          </div>
          
          <div className="popup-cast">
            <h3>Cast principale</h3>
            <p>{cast}</p>
          </div>
        </div>
      </div>
    </div>
  );
}