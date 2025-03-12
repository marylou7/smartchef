import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ListPage = () => {
  const { id } = useParams();
  const storageKey = `shoppingList-${id}`;

  // Load all shopping lists
  const savedLists = JSON.parse(localStorage.getItem("shoppingLists")) || [];

  // Find the name of the current list by ID
  const currentList = savedLists.find((list) => list.id === parseInt(id));
  const listName = currentList ? currentList.name : `List ${id}`;

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(storageKey);
    //dummy value for now
    return savedItems ? JSON.parse(savedItems) : [
      { id: 1, name: "Milk", checked: false },
      { id: 2, name: "Bread", checked: false },
      { id: 3, name: "Eggs", checked: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const handleCheck = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="list-page">
       <h2>{listName}</h2>
      <h4>Ingredients:</h4>
      <div>
        {items.length === 0 ? (
          <p>No items in the list</p>
        ) : (
          items.map((item) => (
            <div className="ingredient-item" key={item.id}>
              <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => handleCheck(item.id)} 
              />
              <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
                {item.name}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListPage;

