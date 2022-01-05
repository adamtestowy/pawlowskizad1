import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          Dla wartosci k = {key} obliczono {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  wyswietlHistorie(){
    alert("OK");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Podaj wartosc k: (k mniejszy rowny 20 ze wzgledu na zastosowany algorytm)</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <div>
          <button onClick={this.wyswietlHistorie}>Historia</button>
        </div>

        <h3>10 ostatnuch wartosci k:</h3>
        {this.renderSeenIndexes()}

        <h3>10 ostatnich obliczen:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
