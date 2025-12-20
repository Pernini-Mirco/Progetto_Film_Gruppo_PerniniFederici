import React, { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";

export default function FilterPopup({ isOpen, onClose, type, filters, onFilterChange, onApplyFilters }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (isOpen) {
      async function loadGenres() {
        const data = await getGenres(type);
        setGenres(data);
      }
      loadGenres();
    }
  }, [type, isOpen]);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.className === "filter-popup-backdrop") {
      onClose();
    }
  };

  const handleApply = () => {
    onApplyFilters();
    onClose();
  };

  return (
    <div className="filter-popup-backdrop" onClick={handleBackdropClick}>
      <div className="filter-popup-content">
        <div className="filter-popup-header">
          <h2>🔍 Filtri di Ricerca</h2>
          <button className="filter-popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="filter-popup-body">
          <div className="filter-popup-group">
            <label>Genere:</label>
            <select 
              value={filters.genre || ""} 
              onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
              className="filter-popup-select"
            >
              <option value="">Tutti i generi</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-popup-group">
            <label>
              Anno da: <strong>{filters.yearFrom || minYear}</strong>
            </label>
            <input
              type="range"
              min={minYear}
              max={currentYear}
              value={filters.yearFrom || minYear}
              onChange={(e) => onFilterChange({ ...filters, yearFrom: e.target.value })}
              className="filter-popup-slider"
            />
          </div>

          <div className="filter-popup-group">
            <label>
              Anno a: <strong>{filters.yearTo || currentYear}</strong>
            </label>
            <input
              type="range"
              min={minYear}
              max={currentYear}
              value={filters.yearTo || currentYear}
              onChange={(e) => onFilterChange({ ...filters, yearTo: e.target.value })}
              className="filter-popup-slider"
            />
          </div>
        </div>

        <div className="filter-popup-actions">
          <button onClick={handleApply} className="filter-apply-btn">
            Applica Filtri
          </button>
          <button onClick={onClose} className="filter-cancel-btn">
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}