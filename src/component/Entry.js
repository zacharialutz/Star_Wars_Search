import React from 'react';
import './Entry.css'

// Individual entry in the list of results
function Entry(props) {
	const myself = props.thisOne;
	return(
		<li>
			{props.type !== 'films' && <h2>{myself.name}</h2>}
			{props.type === 'films' && <h2>{myself.title}</h2>}
		</li>
	);
}

export default Entry