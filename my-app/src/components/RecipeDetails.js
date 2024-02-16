// RecipeDetails.js
import React from 'react';

function RecipeDetails({ recipe }) {
  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      {/* Display detailed information about the recipe */}
      <p>{recipe.instructions}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default RecipeDetails;
