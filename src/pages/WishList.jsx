import React, {useState, useEffect} from 'react'

import ProductCard from '../components/ProductCard';

import { useAuth } from '../context/useAuth';

function WishList() {
  const { userData} = useAuth();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);  

  useEffect(() => {
    if (!userData?.wishlist || products.length === 0) return;

    setFiltered(
      products.filter(product => userData.wishlist.includes(product.id))
    );
  }, [products, userData?.wishlist]);  

  return (
    <div className='container'>
      <h2>User Wishlist</h2>

      <div className='product-grid'>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className='count'>Total items: {filtered.length}</div>
    </div>
  )
}

export default WishList