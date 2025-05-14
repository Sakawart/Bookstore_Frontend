import Item from 'antd/lib/list/Item'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ProductTableInCart from '../card/ProductTableInCart'

//function
import { userCart } from '../functions/users'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cart, user } = useSelector((state) => ({ ...state }))

    const getTotal = () => {
        return cart.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price
        }, 0)
    }

    const handleSaveOrder = () => {
        userCart(user.token, cart)
            .then(res => {
                console.log(res)
                navigate('/checkout')
            }).catch(err => {
                console.log(err)
            })
    }

    const showCartItem = () => (
        <table className='table'>
            <thead className='thead-light'>
                <tr style={{ textAlign: 'center' }}>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item) => (
                    <ProductTableInCart key={item._id} item={item} />
                ))}
            </tbody>
        </table>
    );

    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-md-7 p-4'>
                    <h5 style={{ textAlign: 'center' }}>รายการสินค้า</h5>
                    {!cart.length
                        ? <p style={{ textAlign: "center", fontSize: '20px' }}>ไม่มีรายการสินค้า</p>
                        : showCartItem()
                    }
                </div>

                <div className='col-md-5 p-4'>
                    <div style={{ textAlign: 'center' }}>
                        <h5>ตะกร้าสินค้า</h5>
                    </div>
                    <hr />
                    <div style={{ marginBottom: '16px' }} >สินค้าทั้งหมด : {cart.length} ชิ้น</div>
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px' // เพิ่มระยะห่างระหว่างรายการ
                            }}
                        >
                            <div>
                                <span>
                                    - {item.title}
                                </span>
                                <br />
                                <span className='text-black-50' style={{ fontSize: '13px', paddingLeft: '15px' }}>
                                    x {item.count}
                                </span>
                            </div>
                            <span>
                                {item.price * item.count} บาท
                            </span>

                        </div>
                    ))}
                    <hr />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px' // เพิ่มระยะห่างก่อนสรุปยอด
                        }}
                    >
                        <span>ราคาสุทธิ :</span>
                        <b>{getTotal()} บาท</b>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}> {/* จัดปุ่มให้อยู่ตรงกลาง */}
                        {user ? (
                            <button
                                className='btn btn-success'
                                onClick={handleSaveOrder}
                                disabled={!cart.length}
                                style={{
                                    width: '200px',
                                }}
                            >
                                ดำเนินการสั่งซื้อสินค้า
                            </button>
                        ) : (
                            <button
                                className='btn btn-danger'
                                style={{
                                    width: '200px',
                                }}
                            >
                                <Link
                                    to='/login'
                                    state='cart'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        display: 'block',
                                        padding: '0',
                                    }}
                                >
                                    เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อสินค้า
                                </Link>
                            </button>
                        )}
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Cart
