import React from 'react'

import Loading from './Loading'

import './Entry.css'

// Individual entry in the list of results
export default class Entry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			myself: this.props.thisOne,

			speciesLink: this.props.thisOne.species,
			speciesName: null,
			homeworldLink: this.props.homeworld,
			homeworldName: null,

			loading: false,
			error: null
		}
	}

	// Fetch cross-ref names based on search type
	componentDidMount() {
		this.setState({
			loading: true // activate loading indicator
		});
		switch (this.props.type) { // fetches names for cross-ref links based on search type
			case 'people':
				fetch(this.state.speciesLink)
					.then(res => res.json())
					.then(data => {
						this.setState({
							speciesName: data.name,
							loading: false // deactivate loading indicator
						})
					});
				break;
			default:
			this.setState({
				error: 'Search type unavailable'
			})
		}
	}

	// Generates a list element with data content based on search type
	render() {
		console.log(this.state);
		const me = this.state.myself;
		return(
			<li className='listing'>
				{this.state.loading && <Loading />}
				{this.props.type === 'people' &&
					<>
						<h2>{this.state.myself.name}</h2>
						<ul className='stats'>
							<li>
								<a href={this.state.speciesLink}>{this.state.speciesName}</a> {me.gender}, born {me.birth_year}
							</li>

						</ul>
					</>
				}
				{this.props.type === 'films' &&
					<h2>{me.title}</h2>
				}
			</li>
		);
	}
	
}