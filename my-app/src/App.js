// App.js
import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import { fetchRecipes, fetchRecipeDetails } from './api'; // Ensure you have a function to fetch details
import RecipeDetails from './components/RecipeDetails'; // Assume you create this component

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (ingredients) => {
    const results = await fetchRecipes(ingredients);
    setRecipes(results);
  };

  const handleSelectRecipe = async (id) => {
    const recipeDetails = await fetchRecipeDetails(id); // Fetch details based on the selected recipe's ID
    setSelectedRecipe(recipeDetails);
  };

  return (
    <div className="App">
      <header className="header"><h1>Dinner Ideas</h1></header>
      <div className="container">
        <SearchForm onSearch={handleSearch} />
        {!selectedRecipe && <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />}
        {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
      </div>
    </div>
  );
}

export default App;
