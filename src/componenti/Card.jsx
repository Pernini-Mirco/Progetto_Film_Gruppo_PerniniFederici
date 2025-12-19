import React from "react";
import { IMG_URL } from "../api/tmdb";

export default function Card({ item, onClick, type }) {
  const title = item.title || item.name;
  const posterPath = item.poster_path 
    ? `${IMG_URL}${item.poster_path}` 
    : "https://via.placeholder.com/300x450/333/fff?text=Nessuna+Immagine";
  
  const voteAverage = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const contentType = type === "movie" ? "Film" : "Serie TV";

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img src={posterPath} alt={title} />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        
        <div className="card-info">
          <span className="card-type">{contentType}</span>
          <div className="card-rating">
            <span className="star">⭐</span>
            <span className="rating-value">{voteAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}