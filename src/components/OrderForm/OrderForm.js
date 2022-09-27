import React, { Component } from 'react';

class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: [],
      error: false,
      orderIncomplete: null
    };
  }

  handleNameChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleIngredientChange = (event) => {
    event.preventDefault()
    if (!this.state.ingredients.includes(event.target.name)) {
      this.setState({ingredients: [...this.state.ingredients, event.target.name]})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      id: Date.now(),
    }
    if (!this.state.name || !this.state.ingredients.length) {
      this.setState({orderIncomplete: true})
    } else {
        this.props.addOrder(newOrder)
        this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button 
          className='ingredient-button'
          type="button"
          id={ingredient}
          key={ingredient} 
          name={ingredient} 
          onClick={this.handleIngredientChange}>
          {ingredient}
        </button>
      )
    });

    return (
      <form className='burrito-form'>
        <input
          className='order-name'
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        { ingredientButtons }

        <p className='order-display'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit-button' onClick={this.handleSubmit}>
          Submit Order
        </button>
        {this.state.orderIncomplete && <p className='order-incomplete'>Your order is incomplete. Please be sure your name and at least one ingredient has been selected</p>}
      </form>
    )
  }
}

export default OrderForm;
