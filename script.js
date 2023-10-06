document.addEventListener("DOMContentLoaded", () => {
  //api key, html form with inputs and result initialized
  const apiKey = "<ENTER API KEY HERE>";
  const form = document.getElementById("searchForm");
  const results = document.getElementById("search-results");
  const resultBoxContainer = document.querySelector(".result-box-container");

  //inputs textboxes to be reset after submission
  const query1 = document.getElementById("recipe-search-box");
  const exclude_ingredients1 = document.getElementById("ingredient-search-box");
  const diet1 = document.getElementById("search-box");

  //execute on submit button click
  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get input values from the form
      const query = document.getElementById("recipe-search-box").value;
      const exclude_ingredients = document.getElementById("ingredient-search-box").value;
      const diet = document.getElementById("search-box").value;

      // Construct the API request URL with query parameters
      let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3`;

      //check if the input is empty meaning the user didnt input any value thus don't include in apiUrl
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

  //Recipes have yet to be displayed so inform user
  const noRecipesMessage = document.getElementById("noRecipesMessage");

  function displayResults(recipes) {
    
    // Clear previous results and initialize boxes for result display
    resultBoxContainer.innerHTML = "";
    const numberOfBoxes = 3;

    if (recipes.length === 0) {
      noRecipesMessage.style.display = "block";
    } 
    else {
      noRecipesMessage.style.display = "none";

      //generate 3 boxes
      for (let i = 0; i < Math.min(numberOfBoxes, recipes.length); i++) {
        const boxContainer = document.createElement("div");
        boxContainer.classList.add("result-box");

        //place the recipe results into the boxes
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

        //scroll to the recipe results after user submits their preferences
        results.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});






