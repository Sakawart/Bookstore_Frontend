import React, { useEffect, useState } from 'react'
import MenubarUser from '../../layouts/MenubarUser'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทางไปหน้าชำระเงิน
import { getOrders } from '../../functions/users';
import moment from 'moment/min/moment-with-locales'
import { PDFDownloadLink } from '@react-pdf/renderer';

import Invoice from '../../order/Invoice';
import { FileTextOutlined } from '@ant-design/icons';

const History = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])
    const navigate = useNavigate(); // ใช้สำหรับการนำทางไปหน้าชำระเงิน

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrders(user.token)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setOrders(res.data)
                } else if (res.data && typeof res.data === 'object') {
                    setOrders([res.data]); // ห่อ object ด้วย array
                } else {
                    setOrders([]); // ตั้งค่าเป็น array เปล่าในกรณีที่ไม่ใช่ array
                }
            })
            .catch(err => {
                setOrders([]); // ในกรณีเกิด error กำหนดค่า orders เป็น array เปล่า
            })
    }

    const handleGoToPayment = (orderId) => {
        navigate('/payment', { state: { orderId } }); // นำทางไปหน้าชำระเงิน
    };

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <div className="row">
                <div className="col-md-1">
                </div>

                <div className="col-md-10">
                    <div className="row">
                        <h3>History Page</h3>
                        {orders.length > 0 ? (
                            orders.map((item, index) => {
                                return (
                                    <div key={index} className='card m-3 p-3' style={{ border: '1px solid #ddd' }}>
                                        {/* ส่วนของเลขที่ใบสั่งซื้อและวันเวลาที่สั่งซื้อ */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                {/* ใช้ moment ในการจัดการรูปแบบวันที่ */}
                                                <p>วันที่สั่งซื้อ {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                            </div>
                                            <div>
                                                <p><b>สถานะจัดส่ง :</b> <button className="btn btn-outline-primary">{item.orderstatus}</button></p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* ส่วนของรายการสินค้า */}
                                        {item.products.map((p, i) => (
                                            <div key={i} className="row  mb-3 align-items-center">
                                                <div className="col-md-2">
                                                    <img
                                                        src={p.product.images[0].url}
                                                        alt={p.product.title}
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{p.product.title}</p>
                                                    <p>x{p.count}</p>
                                                </div>
                                                <div className="col-md-4 text-right ">
                                                    <p style={{ textAlign: 'right' }}>{(p.price * p.count).toFixed(2)} บาท</p>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />

                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* เพิ่มสถานะการชำระเงิน */}
                                            <p style={{ marginLeft: '10px', marginBottom: '0' }}>
                                                สถานะการชำระเงิน : <b>{item.payment ? item.payment.status : "รอการชำระเงิน"}</b>
                                            </p>

                                            {/* ราคาสุทธิ และปุ่ม Download PDF ชิดขวา */}
                                            <div className="d-flex align-items-center" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '0' }}>
                                                ราคาสุทธิ : <span style={{ marginLeft: '10px' }}>{item.cartTotal.toFixed(2)} บาท</span>
                                                {item.payment && item.payment.status ? (
                                                    <PDFDownloadLink
                                                        document={<Invoice order={item} />}
                                                        fileName={`order_${item._id}.pdf`}
                                                    >
                                                        {({ loading }) =>
                                                            loading ? 'Loading PDF...' : (
                                                                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                                                                    <FileTextOutlined style={{ marginRight: '5px' }} />ใบเสร็จ
                                                                </button>
                                                            )
                                                        }
                                                    </PDFDownloadLink>
                                                ) : (
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => handleGoToPayment(item._id)}
                                                        style={{ marginLeft: '10px' }}
                                                    >
                                                        ไปหน้าชำระเงิน
                                                    </button>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                )
                            })
                        ) : (
                            <p>No orders found</p> // แสดงข้อความเมื่อไม่มี orders
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;
