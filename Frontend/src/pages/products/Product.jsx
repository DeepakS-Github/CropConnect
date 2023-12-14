import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { useParams } from 'react-router-dom'
import { getAPI } from '../../utils/api/getRequest';


function Product() {
    const {type} = useParams();

    const [productData, setProductData] = useState([]);

    const getProductData = async () => {
        let data = await getAPI(`product/getProductDataByCategory/${type}`)
        setProductData(data);
    }

    useEffect(()=>{
        getProductData();
    },[]);


    return (
        <div className="grid gap-8 my-12 lg:grid-cols-4 w-11/12 mx-auto">
            {
                productData.map((data, index)=>(
                    <ProductCard data={data} key={index}/>
                ))
            }
        </div>
    )
}

export default Product