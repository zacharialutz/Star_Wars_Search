import React from 'react';
import './Loading.css';

export default function Loading(props) {
	return (
		<h3 className='Loading'>LOADING {props.loadItem}...</h3>
	);
}