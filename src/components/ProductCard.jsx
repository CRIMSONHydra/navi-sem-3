import React from 'react'
import './product-card.css';

import {useAuth }from '../context/useAuth'

function ProductCard({product}) {
  const { 
    user,
    userData,
    addToCart, removeFromCart,
    addToWishlist, removeFromWishlist
  } = useAuth();

  //optional chaining ?. will short circuit to undefined instead of throwing error if no object
  const inCart     = userData?.cart?.includes(product.id);
  const inWishlist = userData?.wishlist?.includes(product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>

      { /* Cart and Wishlist buttons */ }
      {user && (
        <div className="card-buttons">
          {inCart ? (
            <button
              className="active"
              onClick={() => removeFromCart(product.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button onClick={() => addToCart(product.id)}>
              Add to Cart
            </button>
          )}

          {inWishlist ? (
            <button
              className="active"
              onClick={() => removeFromWishlist(product.id)}
            >
              ♥ In Wishlist
            </button>
          ) : (
            <button onClick={() => addToWishlist(product.id)}>
              ♡ Add to Wishlist
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard