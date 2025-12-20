import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./componenti/SearchBar";
import Card from "./componenti/Card";
import FilterPopup from "./componenti/FilterPopup";
import DetailPopup from "./componenti/DetailPopup";
import { searchContent, getDetails, discoverContent, getTrendingContent, searchMulti } from "./api/tmdb";

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");
  const [results, setResults] = useState([]);
  const [detail, setDetail] = useState(null);
  const [detailType, setDetailType] = useState("movie");
  const [loading, setLoading] = useState(false);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    yearFrom: "",
    yearTo: ""
  });

  // Carica i film popolari all'avvio
  useEffect(() => {
    loadTrendingContent();
  }, []);

  async function loadTrendingContent() {
    setLoading(true);
    try {
      const data = await getTrendingContent("movie");
      setResults(data.map(item => ({ ...item, media_type: "movie" })));
    } catch (error) {
      console.error("Errore durante il caricamento dei contenuti:", error);
    }
    setLoading(false);
  }

  async function handleSearch() {
    if (!query.trim()) {
      alert("Inserisci un termine di ricerca");
      return;
    }

    setLoading(true);
    try {
      // Cerca sia film che serie TV
      const data = await searchMulti(query);
      setResults(data);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
      alert("Errore durante la ricerca");
    }
    setLoading(false);
  }

  async function handleFilterSearch() {
    // Verifica se almeno un filtro è impostato
    if (!filters.genre && !filters.yearFrom && !filters.yearTo) {
      alert("Imposta almeno un filtro prima di cercare");
      return;
    }

    setLoading(true);
    try {
      const data = await discoverContent(type, filters);
      setResults(data.map(item => ({ ...item, media_type: type })));
    } catch (error) {
      console.error("Errore durante la ricerca filtrata:", error);
      alert("Errore durante la ricerca filtrata");
    }
    setLoading(false);
  }

  async function openDetail(id, mediaType) {
    setLoading(true);
    try {
      const data = await getDetails(id, mediaType);
      setDetail(data);
      setDetailType(mediaType);
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
    setQuery("");
    loadTrendingContent();
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">🎬 FP Catalog</h1>
        <p className="app-subtitle">Il tuo catalogo di film e serie TV</p>
      </header>

      <div className="controls">
        <div className="search-and-filter">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
          <button 
            className="filter-toggle-btn"
            onClick={() => setFilterPopupOpen(true)}
          >
            🔍 Filtri
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Caricamento...</p>
        </div>
      )}

      <div className="results-info">
        <p>{results.length} risultati trovati</p>
      </div>

      <div className="results-grid">
        {results.map(item => {
          const itemType = item.media_type || type;
          return (
            <Card 
              key={`${itemType}-${item.id}`}
              item={item} 
              type={itemType}
              onClick={() => openDetail(item.id, itemType)} 
            />
          );
        })}
      </div>

      <FilterPopup 
        isOpen={filterPopupOpen}
        onClose={() => setFilterPopupOpen(false)}
        type={type}
        filters={filters}
        onFilterChange={setFilters}
        onApplyFilters={handleFilterSearch}
      />

      {detail && (
        <DetailPopup 
          detail={detail} 
          type={detailType}
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