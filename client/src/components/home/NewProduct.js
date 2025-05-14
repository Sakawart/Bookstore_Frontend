import React, { useState, useEffect } from 'react'
import LoadingCard from '../card/LoadingCard'

//function
import { listProductBy } from '../functions/product'
import ProductCard from '../card/ProductCard'


const NewProduct = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {
    setLoading(true)
    listProductBy("createdAt", "desc", 4)
      .then(res => {  
        setProducts(res.data)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <div>
      <div className='container'>
        {loading
          ? <LoadingCard count={4}/>
          : (
            <div className='row'>
              {products.map((item, index) =>
                <div className='col-md-3'>
                  <ProductCard product={item} />
                </div>
              )}
            </div>
          )
        }

      </div>
    </div>
  )
}

export default NewProduct
