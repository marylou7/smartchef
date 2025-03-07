import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
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
  const ingredientCounter = `0/${ingredients.length}`;

  return (
    <div className="recipe-container">
    <div>
      <div className="recipe-img">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="save-icon">
        <FaBookmark onClick={() => console.log("Recipe saved!")} />
        </div>
        <div className="cart-icon">
        <FaShoppingCart onClick={() => console.log("Missing Ingredients added to List!")} />
        </div>
         <div className="ingredient-counter">
            {ingredientCounter}
          </div>
      </div>
      
      <h2>{recipe.strMeal}</h2>
      <h4>Ingredients:</h4>
      <div>
        {ingredients.map((ingredient, index) => (
          <div className="ingredient-item" key={index}>
            <input type="checkbox" disabled />
            <span>{ingredient}</span>
          </div>
        ))}
      </div>
      <h4>Instructions:</h4>
      <div>
        {instructionsSteps.map((step, index) => (
          <div className="instruction-step" key={index}>
            <p>
              <strong>Step {index + 1}:</strong> {step}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default RecipePage;
