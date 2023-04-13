import React from 'react'
import { Link } from 'react-router-dom'


function categoriesBoxes(props) {
  return (
    <>
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full"> 
    <Link to={`/itemtable/${props.title}`}>
          <a className="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" className="object-cover object-center w-full h-full block"
              src={`https://source.unsplash.com/random/425x265?${props.image}`}/>       
          </a>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{props.title}</h2>
          </div>
      </Link>
      </div>
      </>
  )
}

export default categoriesBoxes
