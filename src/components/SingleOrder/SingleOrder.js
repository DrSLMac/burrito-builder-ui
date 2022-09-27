import React from 'react'
import './SingleOrder.css'

const SingleOrder = ({ id, ingredients, name, deleteOrder }) => {
    return (
        <div className='order'>
            <h3>Name: {name}</h3>
            <ul className="ingredient-list">
                {ingredients.map(ingredient => {
                return <li key={ingredient}>{ingredient}</li>
                })}
            </ul>
            <button className='delete-button' onClick={() => deleteOrder(id)}>🗑</button>
        </div>
    )
}

export default SingleOrder