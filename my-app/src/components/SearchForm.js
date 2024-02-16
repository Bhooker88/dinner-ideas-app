// SearchForm.js
import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(ingredients);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input" // Add className if you have specific styles
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
      />
      <button className="search-button" type="submit">Search For Recipes</button> {/* Add className for button */}
    </form>
  );
}

export default SearchForm;
