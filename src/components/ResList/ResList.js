import React from 'react';
import './ResList.css';

import Entry from '../Entry/Entry';

// Maps and lists returns from the API search, each of which presents linked data
export default function ResList(props) {
	const resList = props.list.map(item => {
		return (
			<Entry
				key={item.url}
				type={props.displayType}
				thisOne={item}
				crossref={props.crossref}
			/>
		);
	});
	
	return (
		<ul className='mainList'>
			{resList}
		</ul>
	);
}