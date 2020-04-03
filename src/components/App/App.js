import React from 'react';
import './App.css';

import Footer from '../Footer/Footer';
import Form from '../Form/Form';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import ResList from '../ResList/ResList';

export default class App extends React.Component {
  state = {
    resList: [],

    query: '',
    filter: 'people',

    loading: false,
    error: null
  }

  searchChanged = query => {
    this.setState({
      query
    });
  }
  filterChanged = filter => {
    this.setState({
      filter
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      resList: [],
      loading: true
    });
    const req = `https://swapi.co/api/${this.state.filter}/?search=${this.state.query}`;

    console.log(req);

    fetch(req)
      .then(res => res.json())
      .then(data => this.setState({
        resList: data.results,
        loading: false
      }));
  }

  handleCrosslink = (event, query, type) => {
    event.preventDefault();
    this.setState({
      resList: [],
      filter: type,
      loading: true
    });

    console.log(query);

    fetch(query)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          resList: [data],
          loading: false
        })
      });
  }

  render() {
    console.log(this.state);

    return (
      <div className='App'>
        <Header />
        <main>
          <Form
            handleSubmit={this.handleSubmit}
            query={this.query}
            filter={this.filter}
            searchChanged={this.searchChanged}
            filterChanged={this.filterChanged}
          />
          {this.state.loading && <Loading loadItem='RESULTS' />}
          {/* TODO: Conditional render for error readout */}
          <ResList
            list={this.state.resList}
            type={this.state.filter}
            loading={this.state.loading}
            crossref={this.handleCrosslink}
          />
        </main>
        <Footer />
      </div>
    );
  }
}