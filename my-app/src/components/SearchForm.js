import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [ingredients, setIngredients] = useState('');
  const [intolerances, setIntolerances] = useState({
    dairy: false,
    egg: false,
    gluten: false,
    grain: false,
    peanut: false,
    seafood: false,
    sesame: false,
    shellfish: false,
    soy: false,
    sulfite: false,
    treeNut: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedIntolerances = Object.keys(intolerances).filter(intolerance => intolerances[intolerance]).join(',');
    onSearch(ingredients, selectedIntolerances);
  };

  const handleIntoleranceChange = (event) => {
    const { name, checked } = event.target;
    setIntolerances(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
      />
      <div className="intolerances">
        {Object.keys(intolerances).map((intolerance) => (
          <label key={intolerance}>
            <input
              type="checkbox"
              name={intolerance}
              checked={intolerances[intolerance]}
              onChange={handleIntoleranceChange}
            /> {intolerance.charAt(0).toUpperCase() + intolerance.slice(1)}
          </label>
        ))}
      </div>
      <button type="submit">Search For Recipes</button>
    </form>
  );
}

export default SearchForm;
