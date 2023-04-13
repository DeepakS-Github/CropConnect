import React from 'react'
import CategoriesBoxes from './CategoriesBoxes'
import HomeBanner from './HomeBanner'

function HomePage() {
  return (
    <>  
    <HomeBanner/>
      {/* Agro Product Section */}

      <section className="text-gray-600 body-font w-4/5 mx-auto">
        <div className="container px-5 pt-24 pb-0 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Categories - Agro Products</h1>
          </div>
        </div>
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4">
             <CategoriesBoxes title="Rice" image="rice in farm"/>
             <CategoriesBoxes title="Wheat" image="wheat in farm"/>
             <CategoriesBoxes title="Nuts" image="nuts on trees"/>
             <CategoriesBoxes title="Sugar" image="sugar in farm"/>
             <CategoriesBoxes title="Spices" image="spices in farm"/>
             <CategoriesBoxes title="Fruits" image="fruits in farm"/>
             <CategoriesBoxes title="Vegetables" image="vegetables in farm"/>
             <CategoriesBoxes title="Pulses" image="pulses farm"/>
          </div>
        </div>
      </section>




    {/* Dairy Product Section */}

      <section className="text-gray-600 body-font w-4/5 mx-auto">
        <div className="container px-5 pt-24 pb-0 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Categories - Dairy Products</h1>
          </div>
        </div>
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4">
             <CategoriesBoxes title="Milk" image="milk"/>
             <CategoriesBoxes title="Butter" image="butter"/>
             <CategoriesBoxes title="Cheese" image="cheese"/>
             <CategoriesBoxes title="Curd" image="curd"/>
             <CategoriesBoxes title="Butter Milk" image="butter milk"/>
             <CategoriesBoxes title="Fruits" image="fruits in farm"/>
             <CategoriesBoxes title="Cream" image="cream"/>
             <CategoriesBoxes title="Yogurt" image="yogurt"/>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage