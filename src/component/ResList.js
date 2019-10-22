import React from 'react'
import Entry from './Entry'

// Maps and lists returns from the API search, each of which presents linked data
function ResList(props) {
	console.log(props.list);
	const resList = props.list.map(item => {
		return (
			<Entry
				key={item.url}
				name={item.name}
			/>
	)})
	
	return (
		<ul>
			{resList}
		</ul>
	);
}

export default ResList;