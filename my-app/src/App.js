import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { fetchRecipes, fetchRecipeDetails } from './api';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Update the handleSearch function to accept intolerances as a parameter
    const handleSearch = async (ingredients, intolerances) => {
        const results = await fetchRecipes(ingredients, intolerances);
        setRecipes(results);
        setSelectedRecipe(null); // Reset selection when searching
    };

    const handleSelectRecipe = async (id) => {
        const details = await fetchRecipeDetails(id);
        setSelectedRecipe(details);
    };

    const handleBackToResults = () => {
        setSelectedRecipe(null); // Return to search results
    };

    return (
        <div className="App">
            <header className="header"><h1>Lets Get Cooking</h1></header>
            <div className="container">
                <section className="app-description">
                    <h2>Welcome to Dinner Ideas!</h2>
                    <p>
                        Struggling to decide what to cook? Use this app to find recipes based on ingredients you already have. Simply enter the ingredients you want to use, separated by commas, in the search box below and discover a variety of recipes to try. Whether you have chicken, rice, vegetables, or any other ingredients, we'll help you find the perfect recipe to match your pantry.
                    </p>
                </section>
                {/* SearchForm now needs to handle the collection and submission of multiple intolerances */}
                <SearchForm onSearch={handleSearch} />
                {selectedRecipe ? (
                    <>
                        <button onClick={handleBackToResults}>Back to Results</button>
                        <RecipeDetails recipe={selectedRecipe} />
                    </>
                ) : (
                    <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />
                )}
            </div>
        </div>
    );
}

export default App;
