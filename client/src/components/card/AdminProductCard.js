import React from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    console.log(product);
    const { _id, title, category, description, images, price, publisher } = product;
    return (
        <Card
            hoverable
            cover={
                <img
                    className='p-1'
                    style={{ height: "150px", objectFit: "cover" }}
                    alt="example"
                    src={images && images.length
                        ? images[0].url
                        : ""
                    }
                />
            }
            actions={[
                <Link to={'/admin/update-product/' + _id}>
                    <EditOutlined className="text-primary" />
                </Link>,
                <DeleteOutlined
                    onClick={() => handleRemove(_id)}
                    className="text-danger"
                />,
            ]}
        >
            <div style={{ height: '3.1em' }}> {/* กำหนดความสูงให้พอเหมาะ */}
                <h6>{title}</h6>
            </div>
            <div className='text-black-50' style={{ fontSize: '13px' }}>
                {publisher}<br />
                {category?.name}
            </div>
            <div style={{ textAlign: 'right', marginTop: '1px', marginBottom: '-15px' }}>
                <h6 style={{ margin: 0 }}>{price} ฿</h6>
            </div>
        </Card>
    )
}

export default AdminProductCard
