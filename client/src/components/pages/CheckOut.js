import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserCart,
    saveAddress,
    saveOrder
} from '../functions/users'
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'Thailand',
        address: '',
        district: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
    })
    const [addressSave, setAddressSave] = useState(false)

    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                setProducts(res.data.products)
                setTotal(res.data.cartTotal)
            }).catch(err => {
                console.error('Error fetching cart data:', err);
                toast.error('ไม่มีข้อมูลคำสั่งซื้อ');
                navigate('/')
            })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSaveAddress = () => {
        const addressDetails = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: formData.country,
            address: formData.address,
            district: formData.district,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode,
            phone: formData.phone,
        }
        saveAddress(user.token, addressDetails)
            .then(res => {
                if (res.data.ok) {
                    toast.success('บันทึกที่อยู่เสร็จสิ้น')
                    setAddressSave(true)
                }
            })
    }

    const handleCreateOrder = () => {
        const orderData = {
            products: products,
            cartTotal: total,
        };
    
        saveOrder(user.token, orderData)
            .then(res => {
                const orderId = res.data._id; // ดึง orderId จากการตอบสนองของ API หลังจากสร้างคำสั่งซื้อสำเร็จ
                if (orderId) {
                    console.log('Order created:', orderId); // ตรวจสอบ orderId ที่ถูกสร้าง
                    // ส่ง orderId ไปที่หน้า Payment
                    navigate('/payment', { state: { orderId } });
                } else {
                    console.error('Order ID is undefined');
                }
            })
            .catch(err => {
                console.error('Error creating order:', err);
                toast.error('การสร้างคำสั่งซื้อผิดพลาด');
            });
    };
    
return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-7 p-4'>
                <h5 style={{ textAlign: 'center' }}>การจัดส่งสินค้า</h5>
                <form>
                    <div className='form-group'>
                        <label>ชื่อ</label>
                        <input type="text" className='form-control' name='firstName' value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>นามสกุล</label>
                        <input type="text" className='form-control' name='lastName' value={formData.lastName} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>ประเทศ</label>
                        <input type="text" className='form-control' name='country' value={formData.country} onChange={handleInputChange} disabled />
                    </div>
                    <div className='form-group'>
                        <label>ที่อยู่</label>
                        <textarea
                            className='form-control' name='address'
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows="3"
                        />
                    </div>
                    <div className='form-group'>
                        <label>แขวง / ตำบล</label>
                        <input type="text" className='form-control' name='district' value={formData.district} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>เขต / อำเภอ</label>
                        <input type="text" className='form-control' name='city' value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>จังหวัด</label>
                        <input type="text" className='form-control' name='province' value={formData.province} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>รหัสไปรษณีย์</label>
                        <input type="text" className='form-control' name='postalCode' value={formData.postalCode} onChange={handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <label>เบอร์โทรศัพท์</label>
                        <input type="text" className='form-control' name='phone' value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <button
                        className='btn btn-primary m-2'
                        style={{ float: 'right' }}
                        onClick={handleSaveAddress}
                        type="button"
                    >
                        ยืนยันที่อยู่
                    </button>
                </form>
            </div>

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
                            marginBottom: '16px' // เพิ่มระยะห่างระหว่างรายการ
                        }}>
                            <div>
                                <span>
                                    - {item.product.title}
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
                    <span>ราคาสุทธิ : <b style={{ float: 'right' }}>{total} บาท</b></span>
                    <br />
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            onClick={handleCreateOrder}
                            disabled={!addressSave || !products.length}
                            className='btn btn-success'
                            style={{
                                width: '200px',
                            }}
                        >
                            ดำเนินการชำระเงิน
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </div>
)
}

export default CheckOut;
