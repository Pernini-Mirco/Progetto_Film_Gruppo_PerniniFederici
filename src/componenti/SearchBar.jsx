import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Cerca un film o una serie TV..."
        className="search-input"
      />
      <button onClick={onSearch} className="search-button">
        🔍 Cerca
      </button>
    </div>
  );
}