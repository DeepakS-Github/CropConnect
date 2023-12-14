import React from 'react'

function CategoryCard(props) {
    return (
        <div
            className="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg">
            <img src={props.image}
                className="w-full h-52 align-middle transition duration-300 ease-linear" />
            <a href="#!">
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.3)]">
                    <div className="flex h-full items-end justify-start">
                        <h5 className="m-6 text-lg font-bold text-white">
                            {props.title}
                        </h5>
                    </div>
                </div>
                <div>
                    <div
                        className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,99.2%,0.15)]">
                    </div>
                </div>
            </a>
        </div>
    )
}

export default CategoryCard