const appId = 'dc36a5f3';
const appKey = 'f80e9e792751861c2b58f13cb2113115';

const searchInput = document.getElementById('recipeSearch');
const searchButton = document.getElementById('searchButton');
const recipeList = document.getElementById('recipeList');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        const apiEndpoint = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;

        fetch(apiEndpoint)
            .then(function (response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data.hits);
                displayRecipes(data.hits);
            })
            .catch(function(error) {
                console.error('Error fetching data:', error)
            });
    }
}

function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipeCard');
        recipeCard.innerHTML = `
        <div class="recipeTop">
                <div class="recipe-image">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                </div>
                <div class="recipe-details">
                    <h3>${recipe.recipe.label}</h3>
                    <div class="recipe-cautions">${recipe.recipe.cautions}</div>
                    <a href="${recipe.recipe.url}" class="view-details">View Details</a>
                </div>
            </div>
            <div class="recipeBottom">
                <ul class="recipe-ingredients">
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        `;
        recipeList.appendChild(recipeCard);
    });
}