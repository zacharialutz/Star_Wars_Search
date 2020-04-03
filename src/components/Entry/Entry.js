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

	peopleLinks = this.me.pilots || this.me.characters;
	peopleNames = [];
	shipLinks = this.me.starships;
	shipNames = [];
	vehicleLinks = this.me.vehicles;
	vehicleNames = [];
	homeworldLink = this.me.homeworld;
	homeworldName = null;
	speciesLinks = this.me.species;
	speciesNames = [];
	planetLinks = this.me.planets;
	planetNames = [];

	randomFadeTime() {
		return ({ animationDuration: `${Math.random() + 0.5}s` })
	}

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
		if (this.speciesLinks) {
			for (let i = 0; i < this.speciesLinks.length; i++) {
				await fetch(this.speciesLinks[i])
					.then(res => res.json())
					.then(data => {
						this.speciesNames.push(data.name);
					})
			}
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
		if (this.planetLinks) {
			for (let i = 0; i < this.planetLinks.length; i++) {
				await fetch(this.planetLinks[i])
					.then(res => res.json())
					.then(data => {
						this.planetNames.push(data.name);
					})
			}
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
						<li style={this.randomFadeTime()}>
							{this.renderCrosslink(
								'species',
								this.speciesLinks,
								this.speciesNames
							)} born {me.birth_year}
						</li>
						<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							height: {(me.height * .01).toFixed(2)}{me.height !== 'unknown' && <span>m</span>}<br />
							weight: {me.mass}{me.mass !== 'unknown' && <span>kg</span>}
						</li>
						<li style={this.randomFadeTime()}>
							skin: {me.skin_color}<br />
							hair: {me.hair_color}<br />
							eyes: {me.eye_color}
						</li>
						{this.shipNames && this.shipNames.length > 0 &&
							<li style={this.randomFadeTime()}>
								starships:<br />
								{this.listData(
									'starships',
									this.shipLinks,
									this.shipNames
								)}
							</li>
						}
						{this.vehicleNames && this.vehicleNames.length > 0 &&
							<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							{me.manufacturer}<br />
							{me.cost_in_credits} credits
						</li>
						<li style={this.randomFadeTime()}>
							model: {me.model}<br />
							class: {me.starship_class}
						</li>
						<li style={this.randomFadeTime()}>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {me.cargo_capacity}kg<br />
							supplies: {me.consumables}
						</li>
						<li style={this.randomFadeTime()}>
							length: {me.length}m<br />
							max atmospheric speed: {me.max_atmosphering_speed}km/hour<br />
							megalights: {me.MGLT}/hour<br />
							hyperdrive rating: {me.hyperdrive_rating}
						</li>
						{this.peopleNames.length > 0 &&
							<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							{me.manufacturer}<br />
							{me.cost_in_credits} credits
						</li>
						<li style={this.randomFadeTime()}>
							model: {me.model}<br />
							class: {me.vehicle_class}
						</li>
						<li style={this.randomFadeTime()}>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {me.cargo_capacity}kg<br />
							supplies: {me.consumables}
						</li>
						<li style={this.randomFadeTime()}>
							length: {me.length}m<br />
							max atmospheric speed: {me.max_atmosphering_speed}km/hour
						</li>
						{this.peopleNames.length > 0 &&
							<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							population: {me.population}
						</li>
						<li style={this.randomFadeTime()}>
							length of day: {me.rotation_period} standard hours<br />
							length of year: {me.orbital_period} standard days<br />
							diameter: {me.diameter === 'unknown'
								? 'unknown'
								: <>{me.diameter}km</>
							}<br />
							gravity: {me.gravity}
						</li>
						<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							{me.designation} {me.classification}
						</li>
						<li style={this.randomFadeTime()}>
							average lifespan: {me.average_lifespan}{typeof parseInt(me.average_lifespan, 10) === 'number' && <> years</>}<br />
							average height: {typeof me.average_height === 'number'
								? <>{(me.average_height * .01).toFixed(2)}m</>
								: me.average_height
							}
						</li>
						<li style={this.randomFadeTime()}>
							skin: {me.skin_colors}<br />
							hair: {me.hair_colors}<br />
							eyes: {me.eye_colors}
						</li>
						<li style={this.randomFadeTime()}>
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
						<li style={this.randomFadeTime()}>
							episode {me.episode_id}
						</li>
						<li style={this.randomFadeTime()}>
							{me.opening_crawl}
						</li>
						<li style={this.randomFadeTime()}>
							release date: {me.release_date}<br />
							director: {me.director}<br />
							producer: {me.producer}
						</li>
						<li style={this.randomFadeTime()}>
							characters:<br />
							{this.listData(
								'people',
								this.peopleLinks,
								this.peopleNames
							)}
						</li>
						<li style={this.randomFadeTime()}>
							planets:<br />
							{this.listData(
								'planets',
								this.planetLinks,
								this.planetNames
							)}
						</li>
						<li style={this.randomFadeTime()}>
							starships:<br />
							{this.listData(
								'starships',
								this.shipLinks,
								this.shipNames
							)}
						</li>
						<li style={this.randomFadeTime()}>
							vehicles:<br />
							{this.listData(
								'vehicles',
								this.vehicleLinks,
								this.vehicleNames
							)}
						</li>
						<li style={this.randomFadeTime()}>
							species:<br />
							{this.listData(
								'species',
								this.speciesLinks,
								this.speciesNames
							)}
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
			<li className='Entry'>
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