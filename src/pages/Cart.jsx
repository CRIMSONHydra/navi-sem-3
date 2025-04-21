import React, {useState, useEffect} from 'react'

import ProductCard from '../components/ProductCard';
import { getExchangeRate } from '../utils/getExchangeRate';

import { useAuth } from '../context/useAuth';
import './cart.css';

function Cart() {
  const { userData} = useAuth();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);  

  useEffect(() => {
    if (!userData?.cart || products.length === 0) return;

    setFiltered(
      products.filter(product => userData.cart.includes(product.id))
    );

    async function getRate() {
      const r = await getExchangeRate();
      setRate(r);
    }
    getRate();
  }, [products, userData?.cart]);  

  const totalPrice = (filtered.reduce((sum, item) => sum + item.price, 0) * rate).toFixed(2);

  return (
    <div className='container'>
      <h2>🛒 User Cart</h2>

      <div className='product-grid'>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length > 0 && (
        <div className='price'>
          Total Price: ₹ {totalPrice}
        </div>
      )}
    </div>

    // <div className='product-grid'>
    // {filtered.map(product => (
    //   <ProductCard key={product.id} product={product} />
    // ))}
    // </div>
  )
}

export default Cart