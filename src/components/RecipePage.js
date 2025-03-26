import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import { BookmarkBorder } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savedIngredients, setSavedIngredients] = useState([]);
  const [savedIngredientCount, setSavedIngredientCount] = useState(0);
  const [savedIngredientNames, setSavedIngredientNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [showTick, setShowTick] = useState(false);  // State to show tick animation


  const ingredients = [];
  if (recipe) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  }
  
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      //await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay to test loading animation

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

  useEffect(() => {
    setCheckedIngredients(prevChecked => {
      const updatedChecked = { ...prevChecked };

      let hasChanges = false; // flag to check if we need to update

      ingredients.forEach(ingredient => {
        if (!(ingredient in updatedChecked)) {
          updatedChecked[ingredient] = savedIngredients.some(saved => {
            const savedName = saved.name ? saved.name : "";
            return ingredient.toLowerCase().includes(savedName.toLowerCase());
          });
          hasChanges = true;
        }
      });


      if (hasChanges) {
        return updatedChecked;
      }

      return prevChecked;
    });
  }, [ingredients, savedIngredients]);


  // handle ingredient check/uncheck
  const handleIngredientCheck = (ingredient, isChecked) => {
    setCheckedIngredients(prev => ({ ...prev, [ingredient]: isChecked }));
  };

  // filter missing ingredients (ie. unchecked ones)
  const getMissingIngredients = () => {
    return ingredients.filter(ingredient => !checkedIngredients[ingredient]);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <ClipLoader size={50} color={"#36d7b7"} loading={loading} />
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <p>Recipe not found. Please check your internet connection and try again.</p>
      </div>
    );
  }

  const instructionsSteps = recipe.strInstructions.split(/[.\n]+/).map(step => step.trim()).filter(step => step);

  // calculate the number of checked ingredients
  const checkedIngredientCount = Object.values(checkedIngredients).filter(Boolean).length;
  const ingredientCounter = `${checkedIngredientCount}/${ingredients.length}`;


  // get shopping lists from localStorage
  const getShoppingLists = () => {
    return JSON.parse(localStorage.getItem('shoppingLists')) || [];
  };

  const handleAddToShoppingList = (listId, missingIngredients) => {

    const shoppingListKey = `shoppingList-${listId}`;
    const shoppingList = JSON.parse(localStorage.getItem(shoppingListKey)) || [];
    const existingIngredients = new Set(shoppingList.map(item => item.name));

    // Filter out any duplicate ingredients
    const uniqueIngredients = missingIngredients.filter(ingredient => !existingIngredients.has(ingredient));

    // adds only unique ingredients to the shopping list
    uniqueIngredients.forEach(ingredient => {
      shoppingList.push({ id: shoppingList.length + 1, name: ingredient, checked: false });
    });

    // saves the updated shopping list back to localStorage
    localStorage.setItem(shoppingListKey, JSON.stringify(shoppingList));

    setShowTick(true); //animation

    setTimeout(() => {
      setShowModal(false);  
      setShowTick(false);  
    }, 1000);  
  };


  // Display the shopping lists as buttons
  const displayShoppingLists = () => {
    const shoppingLists = getShoppingLists();
    return shoppingLists.map((list, index) => (
      <button
        key={index}
        className="shopping-list-btn"
        onClick={() => handleAddToShoppingList(list.id, getMissingIngredients())}
      >
        {list.name}
      </button>
    ));
  };

  return (
    <div className="recipe-container">
      <div>
        <div className="recipe-img">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="save-icon" onClick={toggleSaveRecipe}>
            {isSaved ? <FaBookmark style={{ color: 'rgb(255, 252, 162)' }} /> : <BookmarkBorder style={{ fontSize: '40px' }} />}
          </div>
          <div className="cart-icon">
            <FaShoppingCart onClick={() => setShowModal(true)} />
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
                checked={checkedIngredients[ingredient] || false}
                onChange={(e) => handleIngredientCheck(ingredient, e.target.checked)}

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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Missing Ingredients to a Shopping List?</h3>
            {getMissingIngredients().length > 0 ? (
              <ul>
                {getMissingIngredients().map((missingIngredient, index) => (
                  <li key={index}>{missingIngredient}</li>
                ))}
              </ul>
            ) : (
              <p>All ingredients are checked!</p>
            )}

            {/* display Shopping List Buttons only if there are missing ingredients */}
            {getMissingIngredients().length > 0 && (
              <>
                {getShoppingLists().length > 0 ? (
                  <div className="shopping-list-buttons-container">
                    {displayShoppingLists()}
                  </div>
                ) : (
                  <strong className="error-message">No shopping lists available. Please create one first.</strong>
                )}
              </>
            )}

            <div className="close-btn-container">
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Tick animation */}
      {showTick && (
        <div className="tick-animation">
          <span>✔</span>
        </div>
      )}
    </div>
  );

};

export default RecipePage;
