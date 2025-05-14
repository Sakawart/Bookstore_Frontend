import React, { useState } from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// lodash
import _, { concat } from 'lodash';

// function
import { addToWishList } from '../functions/users';

const SingleProduct = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, title, category, author, description, images, price, sold, createdAt, publisher } = product;

    const [isWishlisted, setIsWishlisted] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    const handleAddToCart = () => {
        if (product.quantity <= 0) {
            toast.error('สินค้าหมดแล้ว');
            return;
        }

        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...product,
            count: 1
        });

        let unique = _.uniqWith(cart, _.isEqual);
        localStorage.setItem('cart', JSON.stringify(unique));

        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        });
        dispatch({
            type: 'SET_VISIBLE',
            payload: true
        });

        toast.success('เพิ่มสินค้าในตะกร้าเรียบร้อย');
    };

    const handleAddToWishList = async () => {
        if (user) {
            try {
                await addToWishList(user.token, _id);
                setIsWishlisted(true);
                toast.success('สินค้าถูกเพิ่มในสินค้าที่ชื่นชอบแล้ว');
            } catch (err) {
                console.log(err);
                toast.error('เกิดข้อผิดพลาดในการเพิ่มสินค้าลงในสินค้าที่ชื่นชอบ');
            }
        } else {
            toast.error('โปรดเข้าสู่ระบบ');
        }
    };

    return (
        <>
            <div className='col-md-7'>
                <Carousel autoPlay showArrows={true} infiniteLoop>
                    {images && images.map(item => <img src={item.url} key={item.public_id} alt={title} />)}
                </Carousel>
            </div>

            <div className='col-md-5'>
                <h2 className='p-2' style={{ color: '#021F59' }}>{title}</h2>
                <Card
                    actions={[
                        <div
                            onClick={handleAddToWishList}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                            }}
                        >
                            {isWishlisted ? (
                                <HeartFilled className="text-danger" />
                            ) : (
                                <HeartOutlined className="text-danger" />
                            )}
                            {isWishlisted ? 'Wishlisted' : 'ชื่นชอบสินค้านี้'}
                        </div>,
                        <div
                            onClick={handleAddToCart}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                            }}
                        >
                            <ShoppingCartOutlined className="text-primary" />
                            เพิ่มเข้าตะกร้า
                        </div>
                    ]}
                >
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">ผู้เขียน :
                            <span className='float-end'>{author}</span>
                        </li>
                        <li className="list-group-item">สำนักพิมพ์ :
                            <span className='float-end'>{publisher}</span>
                        </li>
                        <li className="list-group-item">หมวดหมู่ :
                            <span className='float-end'>{category?.name}</span>
                        </li>
                        <li className="list-group-item">วันที่วางขาย :
                            <span className='float-end'>{formatDate(createdAt)}</span>
                        </li>
                        <li className="list-group-item">ยอดการสั่งซื้อ :
                            <span className='float-end'>{sold}</span>
                        </li>
                        <li className="list-group-item">ราคา :
                            <span className='float-end'>{price} ฿</span>
                        </li>
                    </ul>
                </Card>

                {/* ส่วนรายละเอียดที่ย้ายมาด้านล่างการ์ด */}
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <h4 style={{ color: '#03318C' }}>รายละเอียด : {title}</h4>
                    <hr style={{ border: '1px solid #A6A6A6', margin: '10px 0' }} />
                    <p style={{ textIndent: '2em' }}>
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
