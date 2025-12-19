import React from "react";
export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Cerca un film o una serie TV..."
      />
      <button onClick={onSearch}>Cerca</button>
    </div>
  );
}
