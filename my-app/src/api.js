const API_BASE_URL = "https://api.spoonacular.com/recipes";
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

export const fetchRecipes = async (ingredients, intolerances = '') => {
  const url = `${API_BASE_URL}/complexSearch?query=${encodeURIComponent(ingredients)}&number=10&intolerances=${encodeURIComponent(intolerances)}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || []; 
  } catch (error) {
    console.error("Could not fetch recipes: ", error);
    return [];
  }
};

export const fetchRecipeDetails = async (id) => {
  const url = `${API_BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not fetch recipe details for ID ${id}: `, error);
    return null;
  }
};
