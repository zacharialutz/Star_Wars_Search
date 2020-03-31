import React from 'react'

import Loading from '../Loading/Loading'

import './Entry.css'

// Individual entry in the list of results
export default class Entry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			speciesLink: this.props.thisOne.species,
			speciesName: null,
			homeworldLink: this.props.thisOne.homeworld,
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

		// fetches names for cross-ref links based on display type
		if (this.props.type === 'people') {
			fetch(this.state.speciesLink)
				.then(res => res.json())
				.then(data => {
					this.setState({
						speciesName: data.name,
						loading: false // deactivate loading indicator
				})
			});
		}
		if (this.props.type === 'people' || 'species') {
			fetch(this.state.homeworldLink)
				.then(res => res.json())
				.then(data => {
					this.setState({
						homeworldName: data.name,
						loading: false // deactivate loading indicator
				})
			});
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
							<ul className='stats'>
								<li>
									<span
										className='crossRef'
										tabIndex='0'
										onClick={e => {this.props.crossref(
											e,
											this.state.speciesLink,
											'species'
										)}}>
										{this.state.speciesName}
									</span> born {me.birth_year}
								</li>
								<li>
									gender: {me.gender}<br/>
									homeworld: {this.state.homeworldName !== 'unknown' &&
										<span
											className='crossRef'
											tabIndex='0'
											onClick={e => {this.props.crossref(
												e,
												this.state.homeworldLink,
												'planets'
											)}}>
											{this.state.homeworldName}
										</span>}
										{this.state.homeworldName === 'unknown' && <span>{this.state.homeworldName}</span>}
								</li>
								<li>
									height: {(me.height * .01).toFixed(2)}{me.height !== 'unknown' && <span>m</span>}<br/>
									weight: {me.mass}{me.mass !== 'unknown' && <span>kg</span>}
								</li>
								<li>
									skin: {me.skin_color}<br/>
									hair: {me.hair_color}<br/>
									eyes: {me.eye_color}
								</li>
							</ul>
						}
						{this.props.type === 'species' &&
							<ul className='stats'>
								<li>
									{me.designation} {me.classification}
								</li>
								<li>
									average lifespan: {me.average_lifespan} years<br/>
									average height: {(me.average_height * .01).toFixed(2)}m
								</li>
								<li>
									skin: {me.skin_colors}<br/>
									hair: {me.hair_colors}<br/>
									eyes: {me.eye_colors}
								</li>
								<li>
									language: {me.language}<br/>
									homeworld: {this.state.homeworldName !== 'unknown' &&
										<span
											className='crossRef'
											tabIndex='0'
											onClick={e => {this.props.crossref(
												e,
												this.state.homeworldLink,
												'planets'
											)}}>
											{this.state.homeworldName}</span>}
										{this.state.homeworldName === 'unknown' && <span>{this.state.homeworldName}</span>}
								</li>
							</ul>
						}
						{this.props.type === 'planets' && 
							<ul className='stats'>
								<li>
									population: {me.population}
								</li>
								<li>
									length of day: {me.rotation_period}standard hours<br/>
									length of year: {me.orbital_period}standard days<br/>
									diameter: {me.diameter}km<br/>
									gravity: {me.gravity}
								</li>
								<li>
									climate: {me.climate}<br/>
									terrain: {me.terrain}<br/>
									surface water: {me.surface_water}%
								</li>
							</ul>
						}
					</>
				}
			</li>
		);
	}
	
}