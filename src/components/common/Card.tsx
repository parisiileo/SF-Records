import React from 'react'

const Card = ({category}: any) => {
  return (
    <div className='p-3 bg-gray-600 rounded-2xl' key={category.id}>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
    </div>
  )
}

export default Card