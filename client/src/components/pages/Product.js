import React, { useState, useEffect } from 'react'

//function
import { readProduct } from '../functions/product'

import { useParams } from 'react-router-dom'
import SingleProduct from '../card/SingleProduct'


const Product = () => {
    const param = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        readProduct(param.id)
            .then(res => {
                setProduct(res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
    }

    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProduct product={product} />
            </div>
            <div className='row'>
                {/* {JSON.stringify(product)} */}
            </div>

        </div>
    )
}

export default Product
