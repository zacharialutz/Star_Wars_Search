import React from 'react';

export default function Loading(props) {
	return (
		<h3 className='loader'>LOADING {props.loadItem}...</h3>
	);
}