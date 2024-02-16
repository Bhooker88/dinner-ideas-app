// RecipeList.js
import React from 'react';

function RecipeList({ recipes, onSelect }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item" onClick={() => onSelect(recipe.id)}>
          <h3 className="recipe-item-title">{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
