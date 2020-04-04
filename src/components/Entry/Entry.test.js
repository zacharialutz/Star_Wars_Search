import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter } from 'react-router-dom';
import Entry from './Entry';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Entry />,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});