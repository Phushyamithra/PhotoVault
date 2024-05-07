import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const Header = ({ setSearchQuery }) => {  // Receive the callback function
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);  // Update the search query in the parent component
  };

  return (
    <nav className="navbar">
      <div className="navbar_logo">FotoFlix</div>
      <form onSubmit={handleSearch} className='navbar_search-form'>
        <input
          type="text"
          className='form-input'
          placeholder='Search'
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <button type='submit' className='submit-btn'>
          <FaSearch />
        </button>
      </form>
      <div className="navbar_links">
        <Link to="/">Home</Link>
        <Link to="/favorites" >Favorites</Link>
      </div>
    </nav>
  );
};

export default Header;
