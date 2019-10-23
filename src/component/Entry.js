import React from 'react'

import Loading from './Loading'

import './Entry.css'

// Individual entry in the list of results
export default class Entry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
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
					loading: false, // deactivate loading indicator
					error: 'Search type unavailable'
				})
		}
	}

	// Generates a list element with data content based on search type
	render() {
		const me = this.props.thisOne;
		return(
			<li className='listing'>
				{this.props.type !== 'films' &&
					<h2>{me.name}</h2>
				}
				{this.props.type === 'films' &&
					<h2>{me.title}</h2>
				}

				{this.state.loading && <Loading loadItem='DATA' />}
				{!this.state.loading &&
					<>
						{this.props.type === 'people' &&
							<>
								<ul className='stats'>
									<li>
										<span
											tabIndex='0'
											onClick={e => {this.props.crossref(
												e,
												this.state.speciesLink,
												'species'
											)}}
											>{this.state.speciesName}
										</span> {me.gender}, born {me.birth_year}
									</li>

								</ul>
							</>
						}
					</>
				}
			</li>
		);
	}
	
}