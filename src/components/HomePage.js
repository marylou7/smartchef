import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

//test data for now
const filters = ["Quick & Easy", "Dietary Requirements", "Another Filter"];
const recipes = [
  { id: 1, name: "Pasta", image: "logo192.png" },
  { id: 2, name: "Chicken", image: "logo192.png" },
];

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4">
      {/* search Bar */}
      <div className="flex items-center justify-center">
        <TextField
          variant="outlined"
          placeholder="Search for a Recipe"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white rounded-full mx-4 my-2" 
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
              height: '40px', 
              borderRadius: '9999px', 
              padding: '0 12px'
            },
          }}
          sx={{
            width: '100%',
            maxWidth: '270px', 
            marginTop: '16px', 
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;