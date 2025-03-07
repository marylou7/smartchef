import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom"; 

const filters = ["Quick & Easy", "Dietary Requirements", "Another Filter"];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]); // store recipes 
  const [loading, setLoading] = useState(false); // tracks loading state
  const [error, setError] = useState(""); // tracks errors

  // fetch recipes from TheMealDB API
  useEffect(() => {
    if (search.trim() === "") {
      setRecipes([]);
      return;
    }

    // function to fetch data from the API
    const fetchRecipes = async () => {
      setLoading(true);
      setError(""); // reset error before new request

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );

        // handle response
        const data = await response.json();
        
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setError("Error fetching recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [search]); // trigger whenever the search input changes

  return (
    <div className="p-4">
      {/* search bar with filter button*/}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <TextField
          variant="outlined"
          placeholder="Search for a Recipe"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white rounded-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-500" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch("")}>
                  <X className="text-gray-500" />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              height: "40px",
              borderRadius: "9999px",
              padding: "0 12px",
            },
          }}
          sx={{
            width: "100%",
            maxWidth: "270px",
            marginTop: "16px",
          }}
        />
        {/* filter button */}
        <IconButton
          className="rounded-full"
          sx={{
            height: "40px",
            width: "40px",
            borderRadius: "9999px",
            marginTop: "16px",
          }}
        >
          <Filter className="text-gray-500" />
        </IconButton>
      </div>

      {/* display loading, error, or recipes */}
      {loading && (
        <div className="mt-4 text-center text-gray-500">Loading recipes...</div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}

      {recipes.length > 0 ? (
        <div className="mt-4 flex flex-col items-center">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="text-center">
               <Link to={`/recipe/${recipe.idMeal}`}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-img"
              />
              </Link>
              <h3 className="mt-2 text-lg font-semibold">{recipe.strMeal}</h3>
            </div>
          ))}
        </div>
      ) : (
        search && !loading && (
          <div className="mt-4 text-center text-gray-500">
            No recipes found for "{search}"
          </div>
        )
      )}

      {/* CSS Styling for images */}
      <style>{`
        .recipe-img {
          width: 100%;
          height: auto;
          max-width: 50rem; 
          height: 50rem;
          object-fit: cover; 
          border-radius: 0.5rem;
          margin-top: 20px; 
          margin-bottom: 20px; 
        }

        /* Media queries for responsiveness */
        @media screen and (max-width: 768px) {
          .recipe-img {
            max-width: 20rem; /* Adjust the size for smaller screens */
            height: 20rem;
          }
        }

        @media screen and (max-width: 480px) {
          .recipe-img {
            max-width: 20rem; /* Adjust the size for very small screens */
            height: 20rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
