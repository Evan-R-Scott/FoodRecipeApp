document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "62be059ec95f424c944b2d097a34ead4";
  const form = document.getElementById("searchForm");
  const results = document.getElementById("search-results");
  const resultBoxContainer = document.querySelector(".result-box-container");

  const query1 = document.getElementById("recipe-search-box");
  const exclude_ingredients1 = document.getElementById("ingredient-search-box");
  const diet1 = document.getElementById("search-box");

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get input values from the form
      const query = document.getElementById("recipe-search-box").value;
      const exclude_ingredients = document.getElementById("ingredient-search-box").value;
      const diet = document.getElementById("search-box").value;

      // Construct the API request URL with query parameters
      let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3`;

      if(query != "") {
        apiUrl += `&query=${query}`;
      }
      if(exclude_ingredients != ""){
        apiUrl += `&exclude_ingredients=${exclude_ingredients}`;
      }
      if(diet != ""){
        apiUrl += `&diet=${diet}`;
      }

      // Make the API call
      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              // Handle the API response here by displaying results
              displayResults(data.results);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  });

  const noRecipesMessage = document.getElementById("noRecipesMessage");

  function displayResults(recipes) {
      resultBoxContainer.innerHTML = ""; // Clear previous results
      const numberOfBoxes = 3;

      if (recipes.length === 0) {
        noRecipesMessage.style.display = "block";
      } 
      else {
          noRecipesMessage.style.display = "none";

          for (let i = 0; i < Math.min(numberOfBoxes, recipes.length); i++) {
            const boxContainer = document.createElement("div");
            boxContainer.classList.add("result-box");

            const recipe = recipes[i];
            const recipeElement = document.createElement("div");
            recipeElement.innerHTML = `
                <h2>${recipe.title}</h2>
            `;
            boxContainer.appendChild(recipeElement);

            resultBoxContainer.appendChild(boxContainer);
            
            // clear elements after submission
            query1.value = "";
            exclude_ingredients1.value = "";
            diet1.value = "";

            results.scrollIntoView({ behavior: "smooth" });
          }
      }
  }
});






