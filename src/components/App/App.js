import React, { Component } from 'react';
import './App.css';
import {getOrders, addOrderPost, deleteOrderFromAPI} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then((data) => {
        console.log('data.orders', data.orders) //and array of 3 objects with id, ingredients(array of strings) and name
        this.setState({ orders: data.orders })
        console.log('this.state.orders: ', this.state.orders)
      })
      // .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    addOrderPost(newOrder)
    .then(data => this.setState({ orders: [...this.state.orders, data]}))
    console.log('updated state?: ', this.state.orders)
    console.log('newOrder: ', newOrder)
  }

  deleteOrder = (id) => {
    const filteredOrders = this.state.orders.filter(order => order.id !== id)
    this.setState({ orders: filteredOrders })
    deleteOrderFromAPI(id)
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
