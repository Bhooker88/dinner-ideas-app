import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { fetchRecipes, fetchRecipeDetails } from './api';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (ingredients, intolerances) => {
        setIsLoading(true);
        const results = await fetchRecipes(ingredients, intolerances);
        setRecipes(results);
        setSelectedRecipe(null); 
        setIsLoading(false);
    };

    const handleSelectRecipe = async (id) => {
        const details = await fetchRecipeDetails(id);
        setSelectedRecipe(details);
    };

    const handleBackToResults = () => {
        setSelectedRecipe(null); 
    };

    return (
        <div className="App">
            <header className="header"><h1>Lets Get Cooking</h1></header>
            <div className="container">
                <section className="app-description">
                    <h2>Welcome to Dinner Ideas!</h2>
                    <p>
                    Struggling to decide what to cook? Use this app to find recipes based on ingredients you already have or specify the type of dish you're craving, like "slow cooker", "instant pot", "dessert", or "pancakes". Just enter your ingredients or dish type into the search box, and you can even specify intolerances to tailor the recipes to your dietary needs. Discover a variety of recipes to try, complete with ingredients you'll need to make the perfect dish. Let's find your next favorite meal!
                    </p>
                </section>
                <SearchForm onSearch={handleSearch} />
                {isLoading && <div className="loading-icon">
                <div className="spinner"></div></div>}
                {selectedRecipe ? (
                    <>
                        <button className='back-to-results' onClick={handleBackToResults}>Back to Results</button>
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
