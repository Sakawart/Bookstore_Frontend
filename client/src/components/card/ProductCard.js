import React from 'react';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// lodash
import _ from 'lodash';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id, title, images, price, category, publisher } = product;

    const handleCardClick = () => {
        navigate(`/product/${_id}`);
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
        toast.success('เพิ่มสินค้าในตะกร้าเรียบร้อย');
    };

    return (
        <Card
            hoverable
            style={{
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            bodyStyle={{ padding: '16px' }}
            cover={
                <img
                    className="p-1"
                    style={{ height: "180px", objectFit: "cover", cursor: 'pointer', borderRadius: '8px 8px 0 0' }}
                    alt={title}
                    src={images && images.length ? images[0].url : ""}
                    onClick={handleCardClick}
                />
            }
            actions={[
                <Button
                    onClick={handleAddToCart}
                    type="default" // ลบสีพื้นหลังฟ้า
                    icon={<ShoppingCartOutlined />}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        fontWeight: 'bold',
                        color: '#FF6B00', // สีตัวอักษร
                        border: 'none', // ลบขอบปุ่ม
                        boxShadow: 'none', // สีขอบปุ่ม
                    }}
                >
                    เพิ่มเข้าตะกร้า
                </Button>
            ]}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
            }}
        >
            <div style={{ height: '4em', fontWeight: 'bold' }}>
                <h5>{title}</h5>
            </div>
            <div className='text-black-50' style={{ fontSize: '13px', marginBottom: '8px' }}>
                {publisher}<br />
                {category?.name}
            </div>

            <div style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold', color: '#000000' }}>
                <h6 style={{ margin: 0 }}>{price} ฿</h6>
            </div>
        </Card>
    );
};

export default ProductCard;
