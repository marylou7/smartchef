import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import './HomePage.css'; 

const filters = ["Quick & Easy", "Dietary Requirements", "Another Filter"];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch multiple random meals
  const fetchRandomMeals = async (count = 5) => {
    setLoading(true);
    setError("");
    try {
      const requests = Array.from({ length: count }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
          res.json()
        )
      );

      const responses = await Promise.all(requests);
      const meals = responses
        .map((response) => response.meals?.[0])
        .filter(Boolean);

      setRecipes(meals);
    } catch (err) {
      setError("Error fetching recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      fetchRandomMeals(5); // fetch 5 random meals when no search term is given
    } else {
      const fetchSearchedRecipes = async () => {
        setLoading(true);
        setError("");

        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          );
          const data = await response.json();

          setRecipes(data.meals || []);
        } catch (err) {
          setError("Error fetching recipes. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchSearchedRecipes();
    }
  }, [search]);

  return (
    <div className="p-4">
      {/* search bar with filter button */}
      <div className="search-container">
        <TextField
          variant="outlined"
          placeholder="Search for a Recipe"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="search-icon" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch("")}>
                  <X className="search-icon" />
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
          <IconButton className="filter-btn">
            <Filter className="filter-icon" />
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
    </div>
  );
};

export default HomePage;