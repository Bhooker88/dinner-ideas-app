// RecipeDetails.js
import React from 'react';

function RecipeDetails({ recipe }) {
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const downloadRecipe = () => {
    let recipeContent = `
      Recipe Name: ${recipe.title}
      Servings: ${recipe.servings}
      Ready in: ${recipe.readyInMinutes} minutes

      Ingredients:
    `;
    recipe.extendedIngredients.forEach(ingredient => {
      recipeContent += `- ${ingredient.original}\n`;
    });

    recipeContent += "\nInstructions:\n";
    const instructionsText = recipe.instructions.replace(/<[^>]+>/g, ''); // Strip HTML tags
    recipeContent += instructionsText;

    const element = document.createElement("a");
    const file = new Blob([recipeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${recipe.title.replace(/ /g, "_")}.txt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element); // Clean-up
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
      <div dangerouslySetInnerHTML={createMarkup(recipe.instructions)} />
      <button onClick={downloadRecipe} className="download-button">Download Recipe</button>
    </div>
  );
}

export default RecipeDetails;
