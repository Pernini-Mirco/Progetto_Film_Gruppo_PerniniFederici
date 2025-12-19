import React, { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";

export default function Filters({ type, onFilterChange, filters, onApplyFilters }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      const data = await getGenres(type);
      setGenres(data);
    }
    loadGenres();
  }, [type]);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  const handleYearFromChange = (e) => {
    const value = e.target.value;
    onFilterChange({ ...filters, yearFrom: value });
  };

  const handleYearToChange = (e) => {
    const value = e.target.value;
    onFilterChange({ ...filters, yearTo: value });
  };

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
        <label>
          Anno da: {filters.yearFrom || minYear}
        </label>
        <input
          type="range"
          min={minYear}
          max={currentYear}
          value={filters.yearFrom || minYear}
          onChange={handleYearFromChange}
          className="year-slider"
        />
      </div>

      <div className="filter-group">
        <label>
          Anno a: {filters.yearTo || currentYear}
        </label>
        <input
          type="range"
          min={minYear}
          max={currentYear}
          value={filters.yearTo || currentYear}
          onChange={handleYearToChange}
          className="year-slider"
        />
      </div>
    </div>
  );
}