import React, {useState, useEffect} from 'react'

import {useSearch} from '../context/Search/useSearch';

import ProductCard from '../components/ProductCard';

function Home() {
  const {searchTerm} = useSearch();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);  

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFiltered(
      products.filter(product =>
        product.title.toLowerCase().includes(term)
      )
    );
  }, [products, searchTerm]);  

  return (
    <div className='product-grid'>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Home