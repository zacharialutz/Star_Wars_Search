import React from 'react';

import './Entry.css'

function lookup(query) {
	return fetch(query)
		.then(res => res.json())
		.then(data => {
			return data.name;
		})
}

// Individual entry in the list of results
function Entry(props) {
	const myself = props.thisOne;
	const species = lookup(myself.species);
	console.log(species);

	return(
		<li>
			{props.type === 'people' &&
				<>
					<h2>{myself.name}</h2>
					<ul className='stats'>
						<li>{myself.gender} <a href={myself.species}>{species}</a></li>

					</ul>
				</>
			}
			{props.type === 'films' &&
				<h2>{myself.title}</h2>
			}
			{props.type !== 'films' && <h2>{myself.name}</h2>}
		</li>
	);
}

export default Entry