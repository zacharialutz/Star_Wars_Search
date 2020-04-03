import React from 'react';
import './Entry.css';

import Loading from '../Loading/Loading';

export default class Entry extends React.Component {
	state = {
		loading: true,
		error: null
	}

	linebreak = String.fromCharCode(13, 10);

	type = this.props.type;
	me = this.props.thisOne;

	peopleLinks = this.me.pilots;
	peopleNames = [];
	shipLinks = this.me.starships;
	shipNames = [];
	vehicleLinks = this.me.vehicles;
	vehicleNames = [];
	homeworldLink = this.me.homeworld;
	homeworldName = null;
	speciesLink = this.me.species;
	speciesName = null;

	async componentDidMount() {
		if (this.peopleLinks && this.peopleLinks.length > 0) {
			for (let i = 0; i < this.peopleLinks.length; i++) {
				await fetch(this.peopleLinks[i])
					.then(res => res.json())
					.then(data => {
						this.peopleNames.push(data.name);
					})
			}
		}
		typeof this.speciesLink === 'string'
			? await fetch(this.speciesLink)
				.then(res => res.json())
				.then(data => {
					this.speciesName = data.name;
				})
			: for (let i = 0; i < this.peopleLinks.length; i++) {
				await fetch(this.speciesLink)
				.then(res => res.json())
				.then(data => {
					this.speciesName = data.name;
				})
			}
		if (this.shipLinks) {
			for (let i = 0; i < this.shipLinks.length; i++) {
				await fetch(this.shipLinks[i])
					.then(res => res.json())
					.then(data => {
						this.shipNames.push(data.name);
					})
			}
		}
		if (this.vehicleLinks) {
			for (let i = 0; i < this.vehicleLinks.length; i++) {
				await fetch(this.vehicleLinks[i])
					.then(res => res.json())
					.then(data => {
						this.vehicleNames.push(data.name);
					})
			}
		}
		if (this.homeworldLink) {
			await fetch(this.homeworldLink)
				.then(res => res.json())
				.then(data => {
					this.homeworldName = data.name;
				});
		}

		this.setState({
			loading: false
		})
	}

	listData = (type, links, names) => {
		let output = [];
		for (let i = 0; i < links.length; i++) {
			output.push(this.renderCrosslink(type, links[i], names[i]));
			if (i !== links.length - 1) output.push(this.linebreak);
		}
		return output;
	}

	renderCrosslink(type, link, name) {
		return (
			<span
				key={link}
				className='crossRef'
				tabIndex='0'
				onClick={e => {
					this.props.crossref(
						e,
						link,
						type
					)
				}}>
				{name}
			</span>
		)
	}

	renderStats(me) {
		switch (this.type) {
			case 'people':
				return (
					<>
						<li>
							{this.renderCrosslink(
								'species',
								this.speciesLink,
								this.speciesName
							)} born {me.birth_year}
						</li>
						<li>
							gender: {me.gender}<br />
							homeworld: {this.homeworldName === 'unknown'
								? <span>unknown</span>
								: this.renderCrosslink(
									'planets',
									this.homeworldLink,
									this.homeworldName
								)
							}
						</li>
						<li>
							height: {(me.height * .01).toFixed(2)}{me.height !== 'unknown' && <span>m</span>}<br />
							weight: {me.mass}{me.mass !== 'unknown' && <span>kg</span>}
						</li>
						<li>
							skin: {me.skin_color}<br />
							hair: {me.hair_color}<br />
							eyes: {me.eye_color}
						</li>
						{this.shipNames && this.shipNames.length > 0 &&
							<li>
								starships:<br />
								{this.listData(
									'starships',
									this.shipLinks,
									this.shipNames
								)}
							</li>
						}
						{this.vehicleNames && this.vehicleNames.length > 0 &&
							<li>
								vehicles:<br />
								{this.listData(
									'vehicles',
									this.vehicleLinks,
									this.vehicleNames
								)}
							</li>
						}
					</>
				)
			case 'starships':
				return (
					<>
						<li>
							{me.manufacturer}<br />
							{me.cost_in_credits} credits
						</li>
						<li>
							model: {me.model}<br />
							class: {me.starship_class}
						</li>
						<li>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {me.cargo_capacity}kg<br />
							supplies: {me.consumables}
						</li>
						<li>
							length: {me.length}m<br />
							max atmospheric speed: {me.max_atmosphering_speed}km/hour<br />
							megalights: {me.MGLT}/hour<br />
							hyperdrive rating: {me.hyperdrive_rating}
						</li>
						{this.peopleNames.length > 0 &&
							<li>
								notable pilots:<br />
								{me.pilots && this.listData(
									'people',
									this.peopleLinks,
									this.peopleNames
								)}
							</li>
						}
					</>
				)
			case 'vehicles':
				return (
					<>
						<li>
							{me.manufacturer}<br />
							{me.cost_in_credits} credits
						</li>
						<li>
							model: {me.model}<br />
							class: {me.vehicle_class}
						</li>
						<li>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {me.cargo_capacity}kg<br />
							supplies: {me.consumables}
						</li>
						<li>
							length: {me.length}m<br />
							max atmospheric speed: {me.max_atmosphering_speed}km/hour
						</li>
						{this.peopleNames.length > 0 &&
							<li>
								notable pilots:<br />
								{me.pilots && this.listData(
									'people',
									this.peopleLinks,
									this.peopleNames
								)}
							</li>
						}
					</>
				)
			case 'planets':
				return (
					<>
						<li>
							population: {me.population}
						</li>
						<li>
							length of day: {me.rotation_period} standard hours<br />
							length of year: {me.orbital_period} standard days<br />
							diameter: {me.diameter === 'unknown'
								? 'unknown'
								: <>{me.diameter}km</>
							}<br />
							gravity: {me.gravity}
						</li>
						<li>
							climate: {me.climate}<br />
							terrain: {me.terrain}<br />
							surface water: {me.surface_water === 'unknown'
								? 'unknown'
								: <>{me.surface_water}%</>
							}
						</li>
					</>
				)
			case 'species':
				return (
					<>
						<li>
							{me.designation} {me.classification}
						</li>
						<li>
							average lifespan: {me.average_lifespan} years<br />
							average height: {(me.average_height * .01).toFixed(2)}m
						</li>
						<li>
							skin: {me.skin_colors}<br />
							hair: {me.hair_colors}<br />
							eyes: {me.eye_colors}
						</li>
						<li>
							language: {me.language}<br />
							homeworld: {this.homeworldName === 'unknown'
								? 'unknown'
								: this.renderCrosslink(
									'planets',
									this.homeworldLink,
									this.homeworldName
								)
							}
						</li>
					</>
				)
			case 'films':
				return (
					<>
						<li>
							episode {me.episode_id}
						</li>
						<li>
							{me.opening_crawl}
						</li>
						<li>
							release date: {me.release_date}<br />
							director: {me.director}<br />
							producer: {me.producer}
						</li>
					</>
				)
			default:
				console.error('Something went wrong! Search again');
		}
	}

	render() {
		const me = this.me;
		if (me.manufacturer) me.manufacturer = me.manufacturer.replace(', ', this.linebreak);

		console.log(me);
		return (
			<li className='listing'>
				<h2>{me.title || me.name}</h2>

				{this.state.loading
					? <Loading loadItem='DATA' />
					: <ul className='stats'>
						{this.renderStats(me)}
					</ul>
				}
			</li>
		);
	}
}