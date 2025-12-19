import React, { useState } from "react";
import SearchBar from "./componenti/SearchBar";
import Card from "./componenti/Card";
import Filters from "./componenti/Filters";
import DetailPopup from "./componenti/DetailPopup";
import { searchContent, getDetails, discoverContent } from "./api/tmdb";

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");
  const [results, setResults] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    yearFrom: "",
    yearTo: ""
  });

  async function handleSearch() {
    if (!query.trim()) {
      alert("Inserisci un termine di ricerca");
      return;
    }

    setLoading(true);
    try {
      const data = await searchContent(query, type);
      setResults(data);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
      alert("Errore durante la ricerca");
    }
    setLoading(false);
  }

  async function handleFilterSearch() {
    setLoading(true);
    try {
      const data = await discoverContent(type, filters);
      setResults(data);
    } catch (error) {
      console.error("Errore durante la ricerca filtrata:", error);
      alert("Errore durante la ricerca filtrata");
    }
    setLoading(false);
  }

  async function openDetail(id) {
    setLoading(true);
    try {
      const data = await getDetails(id, type);
      setDetail(data);
    } catch (error) {
      console.error("Errore durante il caricamento dei dettagli:", error);
      alert("Errore durante il caricamento dei dettagli");
    }
    setLoading(false);
  }

  function closeDetail() {
    setDetail(null);
  }

  function resetFilters() {
    setFilters({ genre: "", yearFrom: "", yearTo: "" });
    setResults([]);
    setQuery("");
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">🎬 FP Catalog</h1>
        <p className="app-subtitle">Il tuo catalogo di film e serie TV</p>
      </header>

      <div className="controls">
        <div className="type-selector">
          <label>Tipo di contenuto:</label>
          <select 
            value={type} 
            onChange={e => {
              setType(e.target.value);
              setResults([]);
            }}
            className="type-select"
          >
            <option value="movie">🎬 Film</option>
            <option value="tv">📺 Serie TV</option>
          </select>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />
      </div>

      <Filters 
        type={type}
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="filter-actions">
        <button onClick={handleFilterSearch} className="apply-filters-btn">
          Applica Filtri
        </button>
        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filtri
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Caricamento...</p>
        </div>
      )}

      <div className="results-grid">
        {results.length === 0 && !loading && (
          <div className="no-results">
            <p>🔍 Usa la barra di ricerca o i filtri per trovare contenuti</p>
          </div>
        )}

        {results.map(item => (
          <Card 
            key={item.id} 
            item={item} 
            type={type}
            onClick={() => openDetail(item.id)} 
          />
        ))}
      </div>

      {detail && (
        <DetailPopup 
          detail={detail} 
          type={type}
          onClose={closeDetail} 
        />
      )}

      <footer className="footer">
        <p>Progetto realizzato da Pernini Mirco e Federici Cristian - Classe 5AIA</p>
        <p>Dati forniti da TMDb</p>
      </footer>
    </div>
  );
}