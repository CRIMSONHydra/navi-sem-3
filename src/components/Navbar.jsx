import React, { useState } from 'react'
import Logo from '../assets/placeholder-logo.jpg';
import { Link } from 'react-router-dom';

function Navbar() {

  const [input, setInput] = useState("Search...");
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav>
      <div>
        <Link to="/"><img src={Logo} /></Link>
      </div>

      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
      </div>

      <div>
        <div onClick={()=> setDropDown(!dropDown)}>User</div>
        {dropDown && (
          <div>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wish List</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar