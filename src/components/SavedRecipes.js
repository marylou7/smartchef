import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedRecipes.css";
import { Bookmark } from "@mui/icons-material";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecipesFromStorage = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipesFromStorage);
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const cachedRecipes = JSON.parse(localStorage.getItem("recipesData")) || {};
      const recipesToFetch = savedRecipes.filter((id) => !cachedRecipes[id]); // fetch missing recipes only

      if (recipesToFetch.length > 0) {
        try {
          const responses = await Promise.all(
            recipesToFetch.map((id) =>
              fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            )
          );
          const data = await Promise.all(responses.map((res) => res.json()));

          const newRecipes = {};
          const fetchedRecipes = data
            .filter((meal) => meal.meals) // filter out failed fetches
            .map((meal) => {
              const recipe = meal.meals[0];
              newRecipes[recipe.idMeal] = {
                id: recipe.idMeal,
                name: recipe.strMeal,
                image: recipe.strMealThumb,
              };
              return newRecipes[recipe.idMeal];
            });

          // merge new data with cached data
          const updatedCache = { ...cachedRecipes, ...newRecipes };
          localStorage.setItem("recipesData", JSON.stringify(updatedCache));
          setRecipesData(Object.values(updatedCache).filter((r) => savedRecipes.includes(r.id)));
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        setRecipesData(Object.values(cachedRecipes).filter((r) => savedRecipes.includes(r.id)));
      }
    };

    if (savedRecipes.length > 0) {
      fetchRecipes();
    }
  }, [savedRecipes]);

  const handleUnsave = (id) => {
    const updatedRecipes = savedRecipes.filter((recipeId) => recipeId !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));

    // update localStorage cache as well
    const cachedRecipes = JSON.parse(localStorage.getItem("recipesData")) || {};
    delete cachedRecipes[id];
    localStorage.setItem("recipesData", JSON.stringify(cachedRecipes));

    setRecipesData(recipesData.filter((recipe) => recipe.id !== id));
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="saved-recipes-container">
      {recipesData.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        recipesData.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3 className="recipe-name">{recipe.name}</h3>
            <Bookmark  className="bookmark-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleUnsave(recipe.id);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SavedRecipes;
