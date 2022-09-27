const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        if(!response.ok) {
          throw Error(console.log("Bummer. Big ole' error"))
        } else {
           return response.json()

        }
    })
}

const addOrderPost = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(response => {
    if(!response.ok) {
      console.log("there's been an error in the network request")
    } else {
      return response.json()
    }
  })
}

const deleteOrderFromAPI = (id) => {
  fetch(`http://localhost:3001/api/v1/orders/:order_${id}`, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"},
  })
  .then(response => response.json())
}

export { getOrders, addOrderPost, deleteOrderFromAPI }