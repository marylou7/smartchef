import React, { useState, useEffect } from "react";
import "./ShoppingLists.css";
import { useNavigate } from "react-router-dom";

const ShoppingLists = ({ isEditable }) => {
  const navigate = useNavigate();  

  // load shopping lists from localStorage or use an empty array
  const loadShoppingLists = () => {
    const savedLists = localStorage.getItem("shoppingLists");
    return savedLists ? JSON.parse(savedLists) : [];
  };

  const [shoppingLists, setShoppingLists] = useState(loadShoppingLists);

  // save shopping lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));

    // cleans up id values
    const existingListIds = new Set(shoppingLists.map(list => `shoppingList-${list.id}`));
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("shoppingList-") && !existingListIds.has(key)) {
        localStorage.removeItem(key); 
      }
    });
  }, [shoppingLists]);

  const handleEditName = (id, newName) => {
    setShoppingLists(shoppingLists.map((list) =>
      list.id === id ? { ...list, name: newName } : list
    ));
  };

  const handleDelete = (id) => {
    // remove the shopping list from the state
    const updatedLists = shoppingLists.filter((list) => list.id !== id);
    setShoppingLists(updatedLists);
  };

  const handleAddNewList = () => {
    const newId = shoppingLists.length > 0 ? Math.max(...shoppingLists.map(list => list.id)) + 1 : 1;
    setShoppingLists([...shoppingLists, { id: newId, name: "New List" }]);
  };

  const handleCardClick = (id) => {
    navigate(`/list/${id}`);  
  };

  return (
    <div className="shopping-lists-container">
      {/* Show Add New List button only when editable */}
      {isEditable && (
        <button onClick={handleAddNewList} className="add-btn">
          Add New List
        </button>
      )}
      <div className="shopping-list-cards">
        {shoppingLists.map((list) => (
          <div
            key={list.id}
            className="shopping-list-card"
            onClick={() => handleCardClick(list.id)} 
          >
            <div className="shopping-list-name">
              {isEditable ? (
                <input
                  type="text"
                  value={list.name}
                  onChange={(e) => handleEditName(list.id, e.target.value)}
                  className="edit-input"
                />
              ) : (
                <h3>{list.name}</h3>
              )}
            </div>

            {/* Show delete button only when editable */}
            {isEditable && (
              <button onClick={() => handleDelete(list.id)} className="delete-btn">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingLists;
