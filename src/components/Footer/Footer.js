import React from 'react';
import './Footer.css';

export default function Footer() {
	return (
		<footer>
			<p>Application &copy; 2020 Zacharia Lutz<br />Star Wars TM & &copy; Lucasfilm Ltd, All Rights Reserved</p>
			<p>Created using the <a
				href='https://swapi.co'
				target='_blank'
				rel='noopener noreferrer'
			>Star Wars API</a> &copy; 2020 Paul Hallett</p>
		</footer>
	);
}