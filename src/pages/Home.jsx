import React, {useState, useEffect} from 'react'

import {useSearch} from '../context/Search/useSearch';

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
    <div>
      {filtered.map(prod => (
        <div key={prod.id}>
          <img src={prod.image} alt={prod.title} />
          <h3>{prod.title}</h3>
          <p>${prod.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Home