import React, { useState } from 'react'
import Logo from '../assets/placeholder-logo.jpg';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {

  const [input, setInput] = useState("Search...");
  const [dropDown, setDropDown] = useState(false);

  function clearSearch() {
    if(input == "Search...") setInput("");
  }

  return (
    <nav>
      <div className="nav-left">
        <div>
          <Link to="/"><img src={Logo} /></Link>
        </div>

        <div className='nav-links'>
          <Link to="/">Home</Link>
        </div>

        <div>
          <input type='text' value={input} onClick={clearSearch} onChange={e => setInput(e.target.value)}/>
        </div>
      </div>
      

      <div className="user-dropdown" onClick={() => setDropDown(!dropDown)}>
        User
        {dropDown && (
          <ul className="dropdown-menu">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wish List</Link></li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar