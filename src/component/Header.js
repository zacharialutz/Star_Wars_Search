import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
	return (
		<header className="App-header">
          <Link to='/'><h1>Star Wars Search</h1></Link>
        </header>
	)
}

export default Header;