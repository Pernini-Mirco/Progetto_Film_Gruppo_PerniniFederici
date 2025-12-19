import React from "react";
import { IMG_URL } from "../api/tmdb";

export default function Card({ item, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {item.poster_path && (
        <img src={IMG_URL + item.poster_path} alt="" />
      )}
      <h3>{item.title || item.name}</h3>
      <p>⭐ {item.vote_average}</p>
    </div>
  );
}