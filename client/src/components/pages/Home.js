import React from 'react'
import NewProduct from '../home/NewProduct'
import BestSeller from '../home/BestSeller'

const Home = () => {
  return (
    <div>
      {/* New Product */}
      <h4 className='text-center p-3 mt-3 mb-5 display-6'>สินค้ามาใหม่</h4>
      <NewProduct />

      {/* Best Product */}
      <h4 className='text-center p-3 mt-3 mb-5 display-6'>สินค้าขายดี</h4>
      <BestSeller />
    </div>
  )
}

export default Home
