import React, { useState } from 'react';

function RecipeDetails({ recipe }) {
  const [servings, setServings] = useState(recipe.servings);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };


  // Simplified and corrected fraction conversion function
  const decimalToCommonFraction = (decimal) => {
    if (decimal === 0) return '';
    if (decimal <= 1/8) return '1/8';
    if (decimal <= 1/4) return '1/4';
    if (decimal <= 1/3) return '1/3';
    if (decimal <= 1/2) return '1/2';
    if (decimal <= 2/3) return '2/3';
    if (decimal <= 3/4) return '3/4';
    return '1';
  };

  const formatIngredientAmount = (amount) => {
    const wholeNumber = Math.floor(amount);
    const fractionPart = amount - wholeNumber;
    const commonFraction = decimalToCommonFraction(fractionPart);

    return `${wholeNumber > 0 ? `${wholeNumber} ` : ''}${commonFraction}`.trim();
  };

  const adjustIngredientAmounts = (ingredient) => {
    const amountPerServing = ingredient.amount / recipe.servings;
    const adjustedAmount = amountPerServing * servings;
    return `${formatIngredientAmount(adjustedAmount)} ${ingredient.unit ? ingredient.unit + ' ' : ''}${ingredient.name}`;
  };

  const downloadRecipe = () => {
    let recipeContent = `
Recipe Name: ${recipe.title}
Servings: ${servings}
Ready in: ${recipe.readyInMinutes} minutes

Ingredients:
`;
    recipe.extendedIngredients.forEach(ingredient => {
      recipeContent += `- ${adjustIngredientAmounts(ingredient)}\n`;
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
      <div>
        <label htmlFor="servings">Servings:</label>
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={e => setServings(parseInt(e.target.value, 10))}
          min="1"
        />
      </div>
      <p>Ready in: {recipe.readyInMinutes} minutes</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{adjustIngredientAmounts(ingredient)}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <div dangerouslySetInnerHTML={createMarkup(recipe.instructions)} />
      <button onClick={downloadRecipe} className="download-button">Download Recipe</button>
    </div>
  );
}

export default RecipeDetails;