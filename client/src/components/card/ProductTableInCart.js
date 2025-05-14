import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const ProductTableInCart = ({ item }) => {

    const dispatch = useDispatch();

    const handleChangeCount = (newCount) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        //อัพเดทข้อมูล
        cart = cart.map((product) =>
            product._id === item._id ? { ...product, count: newCount } : product
        );
        //ส่งข้อมูลไปเก็บ
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        });
    };

    const handleIncrement = () => {
        const newCount = item.count + 1;
        if (newCount > item.quantity) {
            toast.error('จำนวนคงเหลือสูงสุดที่มี: ' + item.quantity);
            return;
        }
        handleChangeCount(newCount);
    };

    const handleDecrement = () => {
        const newCount = item.count - 1 < 1 ? 1 : item.count - 1;
        handleChangeCount(newCount);
    };

    const handleRemove = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter((product) => product._id !== item._id);

        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        });
    };

    return (
        <tr>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <img
                    src={item.images[0]?.url}
                    alt={item.title}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
            </td>
            <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{item.title}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.price} ฿</td>

            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <button
                        className='btn'
                        onClick={handleDecrement}
                        style={{
                            width: '25px',
                            height: '25px',
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: '#00897b',
                            color: 'white',
                            border: 'none',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        −
                    </button>
                    <span>{item.count}</span>
                    <button
                        className='btn'
                        onClick={handleIncrement}
                        style={{
                            width: '25px',
                            height: '25px',
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: '#00897b',
                            color: 'white',
                            border: 'none',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        +
                    </button>
                </div>
            </td>

            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <DeleteOutlined
                    onClick={handleRemove}
                    className='text-danger'
                    style={{ cursor: 'pointer' }}
                />
            </td>
        </tr>
    );
};

export default ProductTableInCart;
