import React from 'react';
import './styles/Card.css';

const Card = ({ 
  image, 
  isNew, 
  rating, 
  reviewCount, 
  title, 
  price, 
}) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        {isNew && <span className="new-badge">NEW</span>}
        <button 
          className={`favorite-button`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={"none"} stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
      
      <div className="product-info">
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
          <span className="review-count">{reviewCount} reviews</span>
        </div>
        
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        
        <button className="add-to-cart-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default Card;