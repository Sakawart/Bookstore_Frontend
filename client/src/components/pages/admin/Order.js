import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from "react-redux";
import { Modal } from 'antd';  // ใช้ Modal จาก Ant Design
import moment from 'moment/min/moment-with-locales'

//function
import { updateStatusOrder, getOrdersAdmin } from '../../functions/admin';
import { updatePaymentStatus } from '../../functions/payment'

// notify
import { toast } from "react-toastify";

//antd
import { Tabs, Table } from "antd";
const { TabPane } = Tabs;


const Order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
    const [slipVisible, setSlipVisible] = useState(false);  // state สำหรับแสดง/ซ่อน Modal
    const [selectedSlip, setSelectedSlip] = useState('');  // state สำหรับเก็บ URL ของสลิปที่เลือก

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getOrdersAdmin(user.token)
            .then(res => {
                setOrders(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.token, orderId, orderstatus)
            .then(res => {
                toast.info('Updated ' + res.data.orderstatus + ' Success')
                loadData()
            })
    }

    const handleChangePaymentStatus = (orderId, paymentStatus) => {
        updatePaymentStatus(user.token, orderId, paymentStatus)
            .then(res => {
                toast.info('Updated payment status to ' + res.status + ' successfully');
                loadData();
            }).catch(err => {
                console.error('Error updating payment status:', err);
            });
    };

    // ฟังก์ชันสำหรับเปิด Modal และแสดงสลิป
    const showSlip = (slipUrl) => {
        setSelectedSlip(slipUrl);
        setSlipVisible(true);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>

                <div className="col text-centent">
                    {orders.map((item, index) => {
                        return (
                            <div key={index} className='card m-3 p-3' style={{ border: '1px solid #ddd' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>Order by : {item.orderdBy.username}</p>
                                    <p>วันที่สั่งซื้อ {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <p><b>สถานะจัดส่ง : </b>{item.orderstatus}</p>
                                    <p><select
                                        value={item.orderstatus}
                                        onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                                        className='form form-control'
                                        style={{ width: '150px' }}>
                                        <option value="Not Process">Not Process</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Completed">Completed</option>
                                    </select></p>
                                </div>

                                <table className="table table-bordered text-center">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.products.map((p, i) => (
                                            <tr key={i}>
                                                <td>{p.product.title}</td>
                                                <td>{p.price}</td>
                                                <td>{p.count}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3}>
                                                ราคาสุทธิ: <b><u>{item.cartTotal}</u></b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="d-flex justify-content-between align-items-center">
                                    <p style={{ marginLeft: '10px', marginBottom: '0' }}>
                                        <b>สถานะการชำระเงิน : </b>{item.payment ? item.payment.status : "รอการชำระเงิน"}
                                    </p>
                                    {/* ปุ่มสำหรับดูสลิป */}
                                    {item.payment && item.payment.slip && item.payment.slip.url && (
                                        <button
                                            className="btn btn-info"
                                            onClick={() => showSlip(item.payment.slip.url)}
                                        >
                                            ดูสลิป
                                        </button>
                                    )}

                                    <select
                                        value={item.payment ? item.payment.status : 'Pending'}
                                        onChange={(e) => handleChangePaymentStatus(item._id, e.target.value)}
                                        className='form form-control'
                                        style={{ width: '150px' }}>
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                    </select>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Modal สำหรับแสดงสลิป */}
                <Modal
                    title="สลิปการชำระเงิน"
                    visible={slipVisible}
                    onCancel={() => setSlipVisible(false)}
                    footer={null}
                >
                    <img src={selectedSlip} alt="Payment Slip" style={{ width: '100%' }} />
                </Modal>
            </div>
        </div>
    )
}

export default Order;
