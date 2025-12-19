import React from "react";
import { IMG_URL } from "../api/tmdb";

export default function DetailPopup({ detail, onClose, type }) {
  if (!detail) return null;

  const title = detail.title || detail.name;
  const releaseDate = detail.release_date || detail.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const duration = detail.runtime ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}min` : detail.episode_run_time?.[0] ? `${detail.episode_run_time[0]}min` : "N/A";
  
  const posterPath = detail.poster_path
    ? `${IMG_URL}${detail.poster_path}`
    : "https://via.placeholder.com/300x450/333/fff?text=Nessuna+Immagine";
  
  const genres = detail.genres ? detail.genres.map(g => g.name) : [];
  const voteAverage = detail.vote_average ? detail.vote_average.toFixed(1) : "N/A";
  
  // Cast principale (primi attori)
  const cast = detail.credits?.cast?.slice(0, 3) || [];
  
  // Regista
  const director = detail.credits?.crew?.find(person => person.job === "Director")?.name || "Non disponibile";

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
        
        <div className="popup-header">
          <div className="popup-poster">
            <img src={posterPath} alt={title} />
          </div>
          
          <div className="popup-main-info">
            <div className="popup-type-badge">
              {type === "movie" ? "🎬 Film" : "📺 Serie TV"}
            </div>
            
            <h2 className="popup-title">{title}</h2>
            
            <div className="popup-meta-row">
              <span className="popup-rating">⭐ {voteAverage}/10</span>
            </div>
            
            <div className="popup-meta-row">
              <span>📅 {year}</span>
              <span>⏱️ {duration}</span>
            </div>
            
            <div className="popup-genres-row">
              {genres.map((genre, index) => (
                <span key={index} className="genre-badge">{genre}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="popup-body">
          <div className="popup-section">
            <h3>Trama</h3>
            <p>{detail.overview || "Trama non disponibile"}</p>
          </div>
          
          {type === "movie" && director && (
            <div className="popup-section">
              <h3>🎬 Regista</h3>
              <p>{director}</p>
            </div>
          )}
          
          <div className="popup-section">
            <h3>👥 Cast</h3>
            <div className="cast-grid">
              {cast.map(actor => (
                <div key={actor.id} className="cast-member">
                  <div className="cast-photo">
                    {actor.profile_path ? (
                      <img src={`${IMG_URL}${actor.profile_path}`} alt={actor.name} />
                    ) : (
                      <div className="cast-placeholder">👤</div>
                    )}
                  </div>
                  <div className="cast-info">
                    <p className="cast-name">{actor.name}</p>
                    <p className="cast-character">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}