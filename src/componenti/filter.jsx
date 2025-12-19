import React, { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";

export default function Filters({ type, onFilterChange, filters }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      const data = await getGenres(type);
      setGenres(data);
    }
    loadGenres();
  }, [type]);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Genere:</label>
        <select 
          value={filters.genre || ""} 
          onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
          className="filter-select"
        >
          <option value="">Tutti i generi</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Anno da:</label>
        <select 
          value={filters.yearFrom || ""} 
          onChange={(e) => onFilterChange({ ...filters, yearFrom: e.target.value })}
          className="filter-select"
        >
          <option value="">Qualsiasi</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Anno a:</label>
        <select 
          value={filters.yearTo || ""} 
          onChange={(e) => onFilterChange({ ...filters, yearTo: e.target.value })}
          className="filter-select"
        >
          <option value="">Qualsiasi</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}