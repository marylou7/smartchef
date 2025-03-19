import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import { BookmarkBorder } from "@mui/icons-material";
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savedIngredients, setSavedIngredients] = useState([]); 
  const [savedIngredientCount, setSavedIngredientCount] = useState(0);
  const [savedIngredientNames, setSavedIngredientNames] = useState([]); 
  

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          console.log("Full Recipe Details:", data.meals[0]); // log full details for debugging
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);




  useEffect(() => {

    const savedIngredientsList = JSON.parse(localStorage.getItem("mySavedIngredients")) || [];
    setSavedIngredients(savedIngredientsList); 
  }, []);

  useEffect(() => {

    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setIsSaved(savedRecipes.includes(id));
  }, [id]);

  useEffect(() => {

  if (recipe && savedIngredients.length > 0) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient !== "") {
        ingredients.push(ingredient);
      }
    }

    // find matching ingredients from savedIngredients where the name is a substring of the ingredient
    const matchingIngredients = ingredients.filter(ingredient =>
      savedIngredients.some(saved => ingredient.toLowerCase().includes(saved.name.toLowerCase()))
    );

    // Debug statements
    console.log("All Ingredients:", ingredients);
    console.log("Matching Ingredients:", matchingIngredients);

    setSavedIngredientNames(matchingIngredients);
    setSavedIngredientCount(matchingIngredients.length);
  }
}, [recipe, savedIngredients]);



  const toggleSaveRecipe = () => {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    if (isSaved) {
      savedRecipes = savedRecipes.filter(recipeId => recipeId !== id);
    } else {
      savedRecipes.push(id);
    }
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    setIsSaved(!isSaved);
  };

  const cleanIngredient = (ingredient) => {
    const cleaned = ingredient.replace(/(\d+|\s*(cup|tsp|tbsp|ml|l|g|kg|oz|lb|cl|fl|pt)\s*)/gi, '').trim();
    return cleaned.toLowerCase();  
  };
  

  if (loading) {
    return <div>Loading recipe...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  const instructionsSteps = recipe.strInstructions.split(/[.\n]+/).map(step => step.trim()).filter(step => step);
  const ingredientCounter = `${savedIngredientCount}/${ingredients.length}`;

  return (
    <div className="recipe-container">
      <div>
        <div className="recipe-img">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="save-icon" onClick={toggleSaveRecipe}>
            {isSaved ?   <FaBookmark style={{ color: 'rgb(255, 252, 162)' }} /> :   <BookmarkBorder style={{ fontSize: '40px' }} />}
          </div>
          <div className="cart-icon">
            <FaShoppingCart onClick={() => console.log("Missing Ingredients added to List!")} />
          </div>
          <div className="ingredient-counter">
            {ingredientCounter}
          </div>
        </div>

        <h2 className="recipe-title">{recipe.strMeal}</h2>
        <h4>Ingredients:</h4>
        <div>
        {ingredients.map((ingredient, index) => (
          <div className="ingredient-item" key={index}>
          <input
             type="checkbox"
             className="colored-checkbox"  
             defaultChecked={savedIngredients.some(saved => {
            const savedName = saved.name ? saved.name : ""; // handle missing names
            return ingredient.toLowerCase().includes(savedName.toLowerCase()); // check if saved ingredient is part of the ingredient 
      })}
    />
    <span>{ingredient}</span>
  </div>
))}

        </div>

        {recipe.strYoutube && (
          <div className="youtube-container">
            <h4>Watch Recipe Video:</h4>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
              title="Recipe Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <h4>Instructions:</h4>
        <div>
          {instructionsSteps.map((step, index) => (
            <div className="instruction-step" key={index}>
              <strong>Step {index + 1}:</strong> {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
