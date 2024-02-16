// RecipeDetails.js
import React from 'react';

function RecipeDetails({ recipe }) {
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>Servings: {recipe.servings}</p>
      <p>Ready in: {recipe.readyInMinutes} minutes</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      {/* Ensure the instructions are rendered as HTML */}
      <div dangerouslySetInnerHTML={createMarkup(recipe.instructions)} />
    </div>
  );
}

export default RecipeDetails;
