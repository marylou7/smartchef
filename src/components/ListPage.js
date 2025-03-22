import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import { FaTrash } from 'react-icons/fa';  // Importing the bin (trash) icon from react-icons
import "./ListPage.css";

const ListPage = () => {
  const { id } = useParams();
  const storageKey = `shoppingList-${id}`;

  // load all shopping lists
  const savedLists = JSON.parse(localStorage.getItem("shoppingLists")) || [];

  // find the name of the current list by ID
  const currentList = savedLists.find((list) => list.id === parseInt(id));
  const listName = currentList ? currentList.name : `List ${id}`;

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [isEditable, setIsEditable] = useState(false);  // to manage edit mode

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const handleCheck = (itemId) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAddNewItem = () => {
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1,
      name: "New Item", 
      checked: false,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="list-page">
      <TopBar
        listName={listName}
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
       <p>No items in the list.</p>
       <p>Click Edit to add items</p>
     </>
    ) : (
      items.map((item) => (
        <div className="ingredient-item" key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
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
            <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
              {item.name}
            </span>
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

export default ListPage;
