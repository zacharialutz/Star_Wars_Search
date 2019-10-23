import React from 'react'
import Entry from './Entry'

// Maps and lists returns from the API search, each of which presents linked data
function ResList(props) {
	const resList = props.list.map(item => {
		return (
			<Entry
				key={item.url}
				type={props.displayType}
				thisOne={item}
			/>
		);
	});
	
	return (
		<ul>
			{resList}
		</ul>
	);
}

export default ResList;