import React from 'react'
import { Link } from 'react-dom'
import { Route } from 'react-router-dom';
import Entry from './Entry'

// Maps and lists returns from the API search, each of which presents linked data
function ResList(props) {
	console.log(props.list);
	const resList = props.list.map(item => {
		return (
		<li>
			<Link to={`/`}>${item.name}</Link>
		</li>
	)})

	return (
		<ul>
			{resList}
		</ul>
	);
}

export default ResList;



{/* <Route path='/:entry' /> */}