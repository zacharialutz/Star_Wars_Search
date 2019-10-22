import React from 'react';
import './Entry.css'

// Individual entry in the list of results
function Entry(props) {
	return(
		<li>
			<h2>{props.name}</h2>
		</li>
	);
}

export default Entry