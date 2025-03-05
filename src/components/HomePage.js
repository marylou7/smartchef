import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

// test data for now
const filters = ["Quick & Easy", "Dietary Requirements", "Another Filter"];
const recipes = [
  { id: 1, name: "Pasta", image: `${process.env.PUBLIC_URL}/logo192.png` },
  { id: 2, name: "Chicken", image: `${process.env.PUBLIC_URL}/logo192.png` },
  { id: 3, name: "Lemon Pie", image: `${process.env.PUBLIC_URL}/logo192.png` }
];

const HomePage = () => {
  const [search, setSearch] = useState("");

  // function to test search
  const filterRecipes = (searchQuery) => {
    if (!searchQuery) return []; // ff search is empty return an empty array
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // testing the search - filtering recipes
  const filteredRecipes = filterRecipes(search);

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

        {/* Display Filtered Recipes */}
      {filteredRecipes.length > 0 ? (
        <div className="mt-4 flex flex-col items-center">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="text-center">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="rounded-lg w-60 h-60 object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold">{recipe.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        search && (
          <div className="mt-4 text-center text-gray-500">
            No recipes found for "{search}"
          </div>
        )
      )}
      
    </div>
  );
};

export default HomePage;
