import React from "react";
import { useState } from "react";
import SearchBar from "./componenti/SearchBar";
import Card from "./componenti/Card";
import { searchContent, getDetails } from "./api/tmdb";

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");
  const [results, setResults] = useState([]);
  const [detail, setDetail] = useState(null);

  async function handleSearch() {
    const data = await searchContent(query, type);
    setResults(data);
  }

  async function openDetail(id) {
    const data = await getDetails(id, type);
    setDetail(data);
  }

  return (
    <div className="app">
      <h1>FP Catalog</h1>

      <select onChange={e => setType(e.target.value)}>
        <option value="movie">Film</option>
        <option value="tv">Serie TV</option>
      </select>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      <div className="grid">
        {results.map(item => (
          <Card key={item.id} item={item} onClick={() => openDetail(item.id)} />
        ))}
      </div>

      {detail && (
        <div className="modal" onClick={() => setDetail(null)}>
          <div className="modal-content">
            <h2>{detail.title || detail.name}</h2>
            <p>{detail.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}