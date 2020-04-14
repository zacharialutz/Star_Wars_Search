import React from 'react';
import './Entry.css';

import Loading from '../Loading/Loading';

export default class Entry extends React.Component {
	state = {
		loading: true,
		error: null
	}

	type = this.props.type;
	me = this.props.thisOne || {};

	peopleLinks = this.me.pilots || this.me.residents || this.me.characters;
	peopleNames = [];
	shipLinks = this.me.starships;
	shipNames = [];
	vehicleLinks = this.me.vehicles;
	vehicleNames = [];
	planetLinks = this.me.planets || [this.me.homeworld];
	planetNames = [];
	speciesLinks = this.me.species;
	speciesNames = [];
	filmLinks = this.me.films;
	filmNames = [];

	linebreak = String.fromCharCode(13, 10);

	insertCommas(str) {
		let output = '';
		const spacer = str.length % 3;
		for (let i = 0; i < str.length; i++) {
			output += str[i];
			if ((i - spacer + 1) % 3 === 0 && i !== str.length - 1) {
				output += ',';
			}
		}
		return output;
	}

	randomFadeTime = () => { return { animationDuration: `${Math.random() + 0.5}s` } }

	async loadLinks(inputArr) {
		const nameArr = [];

		for (let i = 0; i < inputArr.length; i++) {
			await fetch(inputArr[i])
				.then(res => res.json())
				.then(data => {
					nameArr.push(data.name || data.title);
				})
		}

		return nameArr;
	}

	async componentDidMount() {
		// const linkArr = [
		// 	[this.peopleLinks, this.peopleNames],
		// 	[this.shipLinks, this.shipNames],
		// 	[this.vehicleLinks, this.vehicleNames],
		// 	[this.planetLinks, this.planetNames],
		// 	[this.speciesLinks, this.speciesNames],
		// 	[this.filmLinks, this.filmNames]
		// ];
		// for (let i = 0; i < linkArr.length; i++) {
		// 	if (linkArr[i][0]) linkArr[i][1] = await this.loadLinks(linkArr[i][0]);
		// 	console.log('this.names: ' + linkArr[i][1]);
		// }

		if (this.peopleLinks) this.peopleNames = await this.loadLinks(this.peopleLinks);
		if (this.shipLinks) this.shipNames = await this.loadLinks(this.shipLinks);
		if (this.vehicleLinks) this.vehicleNames = await this.loadLinks(this.vehicleLinks);
		if (this.planetLinks) this.planetNames = await this.loadLinks(this.planetLinks);
		if (this.speciesLinks) this.speciesNames = await this.loadLinks(this.speciesLinks);
		if (this.filmLinks) this.filmNames = await this.loadLinks(this.filmLinks);

		this.setState({
			loading: false
		})
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

	listData = (type, links, names) => {
		let output = [];
		for (let i = 0; i < links.length; i++) {
			output.push(this.renderCrosslink(type, links[i], names[i]));
			if (i !== links.length - 1) output.push(this.linebreak);
		}
		return output;
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
							homeworld: {this.planetNames[0] === 'unknown'
								? <span>unknown</span>
								: this.renderCrosslink(
									'planets',
									this.planetLinks,
									this.planetNames
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
						{this.vehicleNames.length > 0 &&
							<li style={this.randomFadeTime()}>
								vehicles:<br />
								{this.listData(
									'vehicles',
									this.vehicleLinks,
									this.vehicleNames
								)}
							</li>
						}
						{this.shipNames.length > 0 &&
							<li style={this.randomFadeTime()}>
								starships:<br />
								{this.listData(
									'starships',
									this.shipLinks,
									this.shipNames
								)}
							</li>
						}
						<li style={this.randomFadeTime()}>
							films:<br />
							{this.listData(
								'films',
								this.filmLinks,
								this.filmNames
							)}
						</li>
					</>
				)
			case 'starships':
				return (
					<>
						<li style={this.randomFadeTime()}>
							{me.manufacturer}<br />
							{this.insertCommas(me.cost_in_credits)} credits
						</li>
						<li style={this.randomFadeTime()}>
							model: {me.model}<br />
							class: {me.starship_class}
						</li>
						<li style={this.randomFadeTime()}>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {this.insertCommas(me.cargo_capacity)}kg<br />
							supplies: {me.consumables}
						</li>
						<li style={this.randomFadeTime()}>
							length: {me.length}m<br />
							max atmospheric speed: {this.insertCommas(me.max_atmosphering_speed)}km/hour<br />
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
						<li style={this.randomFadeTime()}>
							films:<br />
							{this.listData(
								'films',
								this.filmLinks,
								this.filmNames
							)}
						</li>
					</>
				)
			case 'vehicles':
				return (
					<>
						<li style={this.randomFadeTime()}>
							{me.manufacturer}<br />
							{this.insertCommas(me.cost_in_credits)} credits
						</li>
						<li style={this.randomFadeTime()}>
							model: {me.model}<br />
							class: {me.vehicle_class}
						</li>
						<li style={this.randomFadeTime()}>
							crew: {me.crew}<br />
							passengers: {me.passengers}<br />
							cargo: {this.insertCommas(me.cargo_capacity)}kg<br />
							supplies: {me.consumables}
						</li>
						<li style={this.randomFadeTime()}>
							length: {me.length}m<br />
							max atmospheric speed: {this.insertCommas(me.max_atmosphering_speed)}km/hour
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
						<li style={this.randomFadeTime()}>
							films:<br />
							{this.listData(
								'films',
								this.filmLinks,
								this.filmNames
							)}
						</li>
					</>
				)
			case 'planets':
				return (
					<>
						<li className={'liPopulation'} style={this.randomFadeTime()}>
							population: {me.population === 'unknown'
								? 'unknown'
								: <>{this.insertCommas(me.population)}</>
							}
						</li>
						<li style={this.randomFadeTime()}>
							length of day: {me.rotation_period} standard hours<br />
							length of year: {me.orbital_period} standard days<br />
							diameter: {me.diameter === 'unknown'
								? 'unknown'
								: <>{this.insertCommas(me.diameter)}km</>
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
						{this.peopleNames.length > 0 &&
							<li style={this.randomFadeTime()}>
								notable residents:<br />
								{me.residents && this.listData(
									'people',
									this.peopleLinks,
									this.peopleNames
								)}
							</li>
						}
						<li style={this.randomFadeTime()}>
							films:<br />
							{this.listData(
								'films',
								this.filmLinks,
								this.filmNames
							)}
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
							homeworld: {this.planetNames[0] === 'unknown'
								? <span>unknown</span>
								: this.renderCrosslink(
									'planets',
									this.planetLinks,
									this.planetNames
								)
							}
						</li>
						<li style={this.randomFadeTime()}>
							films:<br />
							{this.listData(
								'films',
								this.filmLinks,
								this.filmNames
							)}
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

		console.log(this.me);
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