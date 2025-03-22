import React, { useState, useEffect } from "react";
import "./ShoppingLists.css";
import { useNavigate } from "react-router-dom";

const ShoppingLists = ({ isEditable }) => {
  const navigate = useNavigate();

  const colorSet = [
    "#C6B9A6",
    "#A8D0C6",
    "#F1A7B4",
    "#C5D0A9",
    "#B2A8D3",
    "#D4C1A3",
    "#B5B8B1",
    "#C1D3D8"
  ];

  const colorSetB = [
    "#3A0066",
    "#1F5A3B",
    "#9E1C08",
    "#172C6B",
    "#6A0000",
    "#3E4A21",
    "#600060",
    "#9E1D1D"
  ];
  
  


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
    if (isEditable) {
      // prevents navigating when in edit mode
      return;
    }
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
      {shoppingLists.length === 0 && (
        <div className="error-message">
          <p>No shopping lists available.</p>
          <p>Click "Edit" to create one.</p>
        </div>
      )}
      <div className="shopping-list-cards">
        {shoppingLists.map((list, index) => {

        const colorSetToUse = document.body.classList.contains('high-contrast-mode') ? colorSetB : colorSet;

          // Assign a color based on the index of the list
          const color = colorSetToUse[index % colorSetToUse.length];
          

          return (
            <div
              key={list.id}
              className="shopping-list-card"
              onClick={() => handleCardClick(list.id)}
              style={{ backgroundColor: color }}
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
                  <h3
                    style={{
                      color: document.body.classList.contains('high-contrast-mode') ? 'yellow' : 'black',
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif' // Add font-family here
                    }}
                  >
                    {list.name}
                  </h3>
                )}
              </div>


              {/* Show delete button only when editable */}
              {isEditable && (
                <button onClick={() => handleDelete(list.id)} className="delete-btn">
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingLists;
