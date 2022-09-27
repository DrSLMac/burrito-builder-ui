import React from 'react';
import './Orders.css';
import SingleOrder from '../SingleOrder/SingleOrder';

  const Orders = ({orders, deleteOrder }) => {
    console.log('orders: ', orders)
    const orderEls = orders.map((order) => {
      const { id, ingredients, name } = order
      return <SingleOrder 
          key={id}
          id={id}
          ingredients={ingredients}
          name={name}
          deleteOrder={deleteOrder}
      />
    })

  return (
    <section>
      <h2>Current Orders:</h2>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;