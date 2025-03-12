import React from 'react';
import './ShoppingLists.css'; 
import { Link } from 'react-router-dom'; 

const ShoppingLists = () => {
  // dummy shopping list data for nwo
  const shoppingLists = [
    { id: 1, name: 'Weekly Groceries' },
    { id: 2, name: 'Party Supplies' },
    { id: 3, name: 'Essentials' }
  ];

  return (
    <div className="shopping-lists-container">
      <div className="shopping-list-cards">
        {shoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-card">
            <Link to={`/individualList/${list.id}`} className="shopping-list-name">
              <h3>{list.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingLists;
