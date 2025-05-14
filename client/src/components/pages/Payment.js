import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handlePaymentSubmit } from '../functions/payment';
import { getUserCart, emptyCart, removeOrderAndSlip } from '../functions/users';
import LoadingCard from '../card/LoadingCard'; // เพิ่ม LoadingCard
import { Spin } from 'antd';


const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    const orderId = location.state?.orderId;
    const [loading, setLoading] = useState(false); // ใช้สำหรับการแสดง loading
    const [selectedSlip, setSelectedSlip] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('QR');
    const [selectedBank, setSelectedBank] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [slipPreview, setSlipPreview] = useState(null);

    useEffect(() => {
        if (!orderId) {
            toast.error('ไม่มีข้อมูลคำสั่งซื้อ');
            navigate('/');
        }
        getUserCart(user.token)
            .then(res => {
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
            .catch(err => {
                console.error('Error fetching cart data:', err);
                toast.error('ไม่มีข้อมูลคำสั่งซื้อ');
                navigate('/')

            });
    }, [orderId, user.token, navigate]);

    // ฟังก์ชันสำหรับจัดการการเลือกไฟล์สลิป
    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];  // ตรวจสอบว่าได้เลือกไฟล์แล้ว

        if (!file) {
            toast.error("กรุณาเลือกไฟล์");
            return;
        }

        // ตรวจสอบขนาดไฟล์ (เช่น จำกัดที่ 5MB หรือ 5 * 1024 * 1024 ไบต์)
        const maxSize = 5 * 1024 * 1024; // ขนาดไฟล์สูงสุด (5MB)

        if (file.size > maxSize) {
            toast.error('ไฟล์มีขนาดใหญ่เกินไป (ขนาดสูงสุด: 5MB)');
            return;
        }

        const reader = new FileReader();  // สร้าง reader สำหรับแปลงไฟล์เป็น Base64
        reader.onloadend = () => {
            setSelectedSlip(reader.result);  // เก็บ Base64 ของไฟล์สลิป
            setSlipPreview(reader.result);  // แสดงภาพตัวอย่างสลิป
        };
        reader.readAsDataURL(file);  // อ่านไฟล์และแปลงเป็น Base64
    };


    // ฟังก์ชันสำหรับยืนยันการชำระเงิน
    const handleSubmit = async () => {
        if (!orderId) {
            return toast.error('ไม่มีข้อมูลคำสั่งซื้อ');
        }

        if (!selectedSlip) {
            return toast.error('กรุณาแนบสลิปการชำระเงิน');
        }

        setLoading(true); // เริ่มแสดง Loading

        const paymentData = {
            order: orderId,
            method: selectedMethod,
            bank: selectedMethod === 'QR' ? null : selectedBank,
            slip: selectedSlip,
        };

        try {
            const response = await handlePaymentSubmit(user.token, paymentData);
            toast.success('การชำระเงินสำเร็จ');

            emptyCart(user.token)
                .then(() => {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: []
                    });
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    setLoading(false); // ปิด Loading หลังจากเสร็จสิ้น
                    navigate('/user/history');
                })
                .catch(err => {
                    console.error('Error clearing cart:', err);
                    setLoading(false); // ปิด Loading เมื่อเกิดข้อผิดพลาด
                });
        } catch (error) {
            console.error('Error in payment:', error);
            toast.error('การชำระเงินล้มเหลว');
            setLoading(false); // ปิด Loading เมื่อเกิดข้อผิดพลาด
        }
    };

    const handleCancelOrder = async () => {
        setLoading(true); // เริ่มแสดง Loading
        try {
            await removeOrderAndSlip(user.token, orderId);
            toast.success('ยกเลิกคำสั่งซื้อสำเร็จ');

            emptyCart(user.token)
                .then(() => {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: []
                    });
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    setLoading(false); // ปิด Loading หลังจากเสร็จสิ้น
                    navigate('/');
                })
                .catch(err => {
                    console.error('Error clearing cart:', err);
                    setLoading(false); // ปิด Loading เมื่อเกิดข้อผิดพลาด
                });
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error('การยกเลิกคำสั่งซื้อผิดพลาด');
            setLoading(false); // ปิด Loading เมื่อเกิดข้อผิดพลาด
        }
    };

    return (
        <div className="container-fluid">
            {loading && <LoadingCard />} {/* แสดง LoadingCard เมื่อ loading */}
            <div className='row'>
                <div className='col-md-7 p-4'>
                    <h3 style={{ textAlign: 'center' }}>เลือกวิธีการชำระเงิน</h3>

                    {/* ส่วนของการเลือกวิธีการชำระเงิน */}
                    <div className="payment-options">
                        <div
                            className={`payment-option ${selectedMethod === 'QR' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('QR')}
                            style={selectedMethod === 'QR' ? activeStyle : optionStyle}
                        >
                            <input
                                type="radio"
                                value="QR"
                                checked={selectedMethod === 'QR'}
                                onChange={() => setSelectedMethod('QR')}
                            />
                            <label>ชำระเงินผ่าน QR Code</label>
                            {selectedMethod === 'QR' && (
                                <div>
                                    <img
                                        src="/QRcode.jfif"
                                        alt="QR Code"
                                        style={{ width: 'auto', height: '250px', marginTop: '10px' }}
                                    />
                                    <p>สแกน QR Code เพื่อชำระเงิน</p>
                                </div>
                            )}
                        </div>

                        <div
                            className={`payment-option ${selectedMethod === 'BankTransfer' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('BankTransfer')}
                            style={selectedMethod === 'BankTransfer' ? activeStyle : optionStyle}
                        >
                            <input
                                type="radio"
                                value="BankTransfer"
                                checked={selectedMethod === 'BankTransfer'}
                                onChange={() => setSelectedMethod('BankTransfer')}
                            />
                            <label>โอนเงินผ่านธนาคาร</label>
                            {selectedMethod === 'BankTransfer' && (
                                <div style={{ marginTop: '10px' }}>
                                    <h6>เลือกธนาคาร</h6>
                                    <select onChange={(e) => setSelectedBank(e.target.value)} value={selectedBank} style={{ padding: '5px', width: '100%' }}>
                                        <option value="">เลือกธนาคาร</option>
                                        <option value="SCB">ธนาคารไทยพาณิชย์</option>
                                        <option value="BangkokBank">ธนาคารกรุงเทพ</option>
                                        <option value="KasikornBank">ธนาคารกสิกรไทย</option>
                                        <option value="KrungthaiBank">ธนาคารกรุงไทย</option>
                                    </select>
                                    {selectedBank && (
                                        <div style={{ marginTop: '10px' }}>
                                            <p>เลขที่บัญชีสำหรับโอนเงิน:</p>
                                            <p style={{ fontWeight: 'bold' }}>
                                                {selectedBank === 'BangkokBank' && '123-456-7890 ธนาคารกรุงเทพ'}
                                                {selectedBank === 'SCB' && '987-654-3210 ธนาคารไทยพาณิชย์'}
                                                {selectedBank === 'KasikornBank' && '456-789-1230 ธนาคารกสิกรไทย'}
                                                {selectedBank === 'KrungthaiBank' && '321-654-9870 ธนาคารกรุงไทย'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* ส่วนของการแนบสลิป */}
                        <div className="slip-upload" style={{ marginTop: '20px' }}>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            <p className='text-black-50' style={{ fontSize: '13px' }} >
                                jpg, jpeg, png, gif (max file size 5MB.)
                            </p>

                            {slipPreview && (
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <p>ภาพตัวอย่างสลิป:</p>
                                    <img src={slipPreview} alt="Slip Preview" style={{ height: '200px', width: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ส่วนสรุปรายการสั่งซื้อ */}
                <div className='col-md-5 p-4'>
                    <h5 style={{ textAlign: 'center' }}>สรุปรายการสั่งซื้อ</h5>
                    <hr />
                    <p>สินค้าทั้งหมด : {products.length} ชิ้น</p>
                    <div>
                        {products.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <div>
                                    <span>- {item.product.title}</span>
                                    <br />
                                    <span className='text-black-50' style={{ fontSize: '13px', paddingLeft: '15px' }}>
                                        x {item.count}
                                    </span>
                                </div>
                                <span>{item.price * item.count} บาท</span>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <span>ราคาสุทธิ : <b style={{ float: 'right' }}>{total} บาท</b></span>
                    <br />
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button
                                onClick={handleCancelOrder}
                                className="btn btn-danger"
                                style={{ padding: '8px 20px', fontSize: '15px' }}
                            >
                                ยกเลิกคำสั่งซื้อ
                            </button>

                            <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: '5px 20px', fontSize: '15px' }}>
                                ยืนยันการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const optionStyle = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    marginBottom: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const activeStyle = {
    ...optionStyle,
    backgroundColor: '#f0f8ff',
    borderColor: '#007bff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
};

export default Payment;
