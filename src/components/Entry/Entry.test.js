import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

// import { BrowserRouter } from 'react-router-dom';
import Entry from './Entry';

let div = null;
beforeEach(() => {
	div = document.createElement('div');
	document.body.appendChild(div);
});
afterEach(() => {
	unmountComponentAtNode(div);
	div.remove();
	div = null;
})

it('renders without crashing', () => {
	render(
		<Entry />,
		div
	);
	unmountComponentAtNode(div);
});

// it('adds commas to large numbers', () => {
// 	const testVal = '52000000';
// 	const component = render(
// 		<Entry
// 			type='planets'
// 			thisOne={{
// 				population: testVal
// 			}}
// 		/>,
// 		div
// 	);
// 	console.log('props: ' + component.props);
// 	console.log('type: ' + component.type);
// 	expect(component.textContent.toMatch('52,000,000'));
// });