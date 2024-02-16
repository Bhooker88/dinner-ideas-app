const API_BASE_URL = "https://api.spoonacular.com/recipes";
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

export const fetchRecipes = async (ingredients) => {
  const url = `${API_BASE_URL}/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // This will be an array of recipe objects
  } catch (error) {
    console.error("Could not fetch recipes: ", error);
    return []; // Return an empty array in case of error
  }
};

export const fetchRecipeDetails = async (id) => {
  const url = `${API_BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // This will be the detailed recipe object, including ingredients and nutrition data
  } catch (error) {
    console.error(`Could not fetch recipe details for ID ${id}: `, error);
    return null; // Return null in case of error
  }
};
