import React from 'react';

function Loading(props) {
	return (
		<h3 className='loader'>LOADING {props.loadItem}...</h3>
	);
}

export default Loading;