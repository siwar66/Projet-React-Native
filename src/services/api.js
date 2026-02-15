
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Recherche des recettes par nom
 * @param {string} query - Terme de recherche (vide = toutes les recettes)
 * @returns {Promise<Array>} Liste des recettes
 */
export const searchRecipes = async (query = 'chicken') => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    
    if (!data.meals) {
      return [];
    }
    
    
    return data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strCategory,
      image: meal.strMealThumb,
      duration: '30 min', 
      difficulty: 'Moyen',
      category: meal.strCategory,
      area: meal.strArea,
      tags: meal.strTags ? meal.strTags.split(',') : [],
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche de recettes:', error);
    throw new Error('Impossible de charger les recettes. Vérifiez votre connexion.');
  }
};

/**
 * Récupère le détail d'une recette par son ID
 * @param {string} id - ID de la recette
 * @returns {Promise<Object>} Détails de la recette
 */
export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Recette introuvable');
    }
    
    const meal = data.meals[0];
    
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || '',
        });
      }
    }
    
    
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strCategory,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      ingredients: ingredients,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      youtubeUrl: meal.strYoutube,
      sourceUrl: meal.strSource,
      duration: '30 min',
      difficulty: 'Moyen',
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette:', error);
    throw new Error('Impossible de charger les détails de la recette.');
  }
};

/**
 * Récupère une recette aléatoire
 * @returns {Promise<Object>} Une recette aléatoire
 */
export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.meals || data.meals.length === 0) {
      throw new Error('Aucune recette trouvée');
    }
    
    const meal = data.meals[0];
    
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strCategory,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de recette aléatoire:', error);
    throw new Error('Impossible de charger une recette aléatoire.');
  }
};

/**
 * Liste les catégories disponibles
 * @returns {Promise<Array>} Liste des catégories
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.categories || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw new Error('Impossible de charger les catégories.');
  }
};
