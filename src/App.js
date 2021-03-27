import React, { Component } from 'react';
import './App.css';
import FoodBox from './components/FoodBox';
import foods from './foods.json';
import { v4 as uuidv4 } from 'uuid';
import FoodForm from './components/FoodForm';
import TodaysFood from './components/TodaysFood';

export default class App extends Component {
  state = {
    foods: foods.map((food) => ({ ...food, id: uuidv4() })),
    showForm: false,
    search: '',
  };

  showForm = () => {
    this.setState({ showForm: true });
  };

  onFormSubmit = (food) => {
    this.setState((old) => ({
      foods: [{ ...food, id: uuidv4(), quantity: 0 }, ...old.foods],
      showForm: false,
    }));
  };

  onSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  onFoodChange = (food) => {
    this.setState((previous) => {
      const index = previous.foods.findIndex((f) => f.id === food.id);
      return {
        foods: [
          ...previous.foods.slice(0, index),
          food,
          ...previous.foods.slice(index + 1),
        ],
      };
    });
  };

  removeFood = (food) => {
    this.setState((previous) => {
      const index = previous.foods.findIndex((f) => f.id === food.id);
      return {
        foods: [
          ...previous.foods.slice(0, index),
          { ...previous.foods[index], quantity: 0 },
          ...previous.foods.slice(index + 1),
        ],
      };
    });
  };

  render() {
    return (
      <div className="App container">
        <h1 className="title">IronNutrition</h1>
        <div className="is-flex">
          <input
            type="text"
            className="input search-bar"
            name="search"
            placeholder="Search"
            value={this.state.search}
            onChange={this.onSearch}
          />
          <button className="button is-info ml-2" onClick={this.showForm}>
            +
          </button>
        </div>
        {this.state.showForm && <FoodForm onSubmit={this.onFormSubmit} />}
        <div className="columns">
          <div className="column">
            {this.state.foods
              .filter((food) =>
                food.name
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              )
              .map((food) => (
                <FoodBox {...food} key={food.id} onChange={this.onFoodChange} />
              ))}
          </div>
          <TodaysFood foods={this.state.foods} removeFood={this.removeFood} />
        </div>
      </div>
    );
  }
}
