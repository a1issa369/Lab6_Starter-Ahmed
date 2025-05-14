import { RecipeCard } from './recipe-card.js';

window.addEventListener('DOMContentLoaded', init);

function init() {
  const recipes = getRecipesFromStorage();
  addRecipesToDocument(recipes);
  initFormHandler();
}

function getRecipesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('recipes')) || [];
  } catch (e) {
    console.error("Error reading recipes from localStorage", e);
    return [];
  }
}

function saveRecipesToStorage(recipes) {
  try {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  } catch (e) {
    console.error("Error saving recipes to localStorage", e);
  }
}

function addRecipesToDocument(recipes) {
  const main = document.querySelector('main');
  recipes.forEach(data => {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = data;
    main.appendChild(recipeCard);
  });
}

function initFormHandler() {
  const form = document.getElementById('new-recipe');
  const clearBtn = form.querySelector('.danger');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      imgSrc: formData.get('imgSrc'),
      imgAlt: formData.get('imgAlt'),
      titleTxt: formData.get('titleTxt'),
      titleLnk: formData.get('titleLnk'),
      organization: formData.get('organization'),
      rating: formData.get('rating'),
      numRatings: formData.get('numRatings'),
      lengthTime: formData.get('lengthTime'),
      ingredients: formData.get('ingredients')
    };

    if (!data.rating) {
      alert("Please select a rating!");
      return;
    }

    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = data;

    document.querySelector('main').appendChild(recipeCard);

    const recipes = getRecipesFromStorage();
    recipes.push(data);
    saveRecipesToStorage(recipes);

    form.reset();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all recipes?")) {
      localStorage.clear();
      document.querySelector('main').innerHTML = '';
    }
  });
}
