export class RecipeCard extends HTMLElement {
    constructor() {
      super();
      // No shadow root used
    }
  
    set data(data) {
      this.innerHTML = `
        <article class="recipe-card">
          <img src="${data.imgSrc}" alt="${data.imgAlt}">
          <p class="title"><a href="${data.titleLnk}">${data.titleTxt}</a></p>
          <p class="organization">${data.organization}</p>
          <div class="rating">
            <span>${data.rating}</span>
            <img src="assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
            <span>(${data.numRatings})</span>
          </div>
          <time>${data.lengthTime}</time>
          <p class="ingredients">${data.ingredients}</p>
        </article>
      `;
    }
  }
  
  customElements.define('recipe-card', RecipeCard);
  