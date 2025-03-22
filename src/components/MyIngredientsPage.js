import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import { FaTrash } from 'react-icons/fa'; 

const MyIngredientsPage = () => {
  const storageKey = "mySavedIngredients";  

  // Load the saved items from localStorage, or initialize with an empty list
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [isEditable, setIsEditable] = useState(false);  

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const handleAddNewItem = () => {
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1,
      name: "New Item"
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="list-page">
      <TopBar
        listName="My Saved Ingredients"  
        isEditable={isEditable}
        handleEditClick={() => setIsEditable(!isEditable)}  
      />
      <div className="list-items-container">
        {isEditable && (
          <button onClick={handleAddNewItem} className="add-btn">
            Add New Item
          </button>
        )}
        <div>
          {items.length === 0 ? (
            <>
            <p>No items in My Saved Ingredients</p>
            <p>Click "Edit" to add one.</p>
            <p>Or Scan a Receipt to add automatically.</p>
            </>
          ) : (
            items.map((item) => (
              <div className="ingredient-item" key={item.id}>
                {isEditable ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setItems(items.map(i =>
                        i.id === item.id ? { ...i, name: newName } : i
                      ));
                    }}
                    className="edit-input"  
                  />
                ) : (
                  <span>{item.name}</span> 
                )}
                {isEditable && (
                  <FaTrash
                    onClick={() => handleDeleteItem(item.id)}
                    className="bin-icon"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyIngredientsPage;
