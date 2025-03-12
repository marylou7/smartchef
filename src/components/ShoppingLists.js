import React, { useState, useEffect } from "react";
import "./ShoppingLists.css";

const ShoppingLists = ({ isEditable }) => {
  // load shopping lists from localStorage 
  // or use default empty array
  const loadShoppingLists = () => {
    const savedLists = localStorage.getItem("shoppingLists");
    return savedLists ? JSON.parse(savedLists) : [];
  };

  const [shoppingLists, setShoppingLists] = useState(loadShoppingLists);

  // save shopping lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  const handleEditName = (id, newName) => {
    setShoppingLists(shoppingLists.map((list) =>
      list.id === id ? { ...list, name: newName } : list
    ));
  };

  const handleDelete = (id) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== id));
  };

  const handleAddNewList = () => {
    const newId = shoppingLists.length + 1;
    setShoppingLists([...shoppingLists, { id: newId, name: "New List" }]);
  };

  return (
    <div className="shopping-lists-container">
       {/* show Add New List button only when editable */}
       {isEditable && (
        <button onClick={handleAddNewList} className="add-btn">
          Add New List
        </button>
      )}
      <div className="shopping-list-cards">
        {shoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-card">
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

            {/* show delete button only when editable */}
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
