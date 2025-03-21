import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import './HomePage.css';

const filtersList = ["MainMeal", "Dessert", "Soup", "Breakfast", "Vegetarian"];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // function to fetch multiple random meals
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

      // store meals in local storage
      localStorage.setItem("randomMeals", JSON.stringify(meals));

      setRecipes(meals);
    } catch (err) {
      setError("Error fetching recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // check if meals are already in local storage
    const savedMeals = localStorage.getItem("randomMeals");
    if (savedMeals) {
      setRecipes(JSON.parse(savedMeals));
    } else {
      fetchRandomMeals(5); // fetch 5 random meals if no saved meals for now
    }
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      // display the 5 random meals here
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

  // Filter the recipes based on selected filters
  const filteredRecipes = recipes.filter((recipe) => {
    return selectedFilters.every((filter) => {
      return recipe.strTags?.split(",").includes(filter);
    });
  });

  // filter dropdown toggle
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // handlesfilter selection
  const handleFilterClick = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // removes filter
  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

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
        <IconButton className="filter-btn" onClick={toggleFilters}>
          <Filter className="filter-icon" />
        </IconButton>
      </div>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="filter-dropdown">
          {filtersList.map((filter) => (
            <button
              key={filter}
              className={`filter-option ${selectedFilters.includes(filter) ? "selected" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Display selected filters */}
      <div className="selected-filters">
        {selectedFilters.map((filter) => (
          <span key={filter} className="filter-tag">
            {filter}
            <X className="remove-filter" onClick={() => removeFilter(filter)} />
          </span>
        ))}
      </div>

      {/* display loading, error, or filtered recipes */}
      {loading && (
        <div className="mt-4 text-center text-gray-500">Loading recipes...</div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}

      {filteredRecipes.length > 0 ? (
        <div className="recipes-container">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <Link to={`/recipe/${recipe.idMeal}`}>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="recipe-image"
                />
              </Link>
              {recipe.strTags && (
                <div className="recipe-tags">
                  {recipe.strTags.split(',').map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="recipe-name">{recipe.strMeal}</h3>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="no-recipes-found">
            No recipes found with the selected filters.
          </div>
        )
      )}
    </div>
  );
};

     
export default HomePage;
