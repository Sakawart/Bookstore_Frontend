import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// functions
import { createProduct } from '../../../functions/product';
import { listCategory } from '../../../functions/category';
import FileUpload from './FileUpload';

const initialstate = {
    ISBN: "",
    title: "",
    author: "",
    publisher: "",
    price: "",
    quantity: "",
    description: "",
    categories: [],
    category: "",
    images: [],
};

const CreateProduct = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialstate);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData(user.token);
    }, []);

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then((res) => {
                setValues({ ...values, categories: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // ตรวจสอบว่า field นี้คือ price หรือ quantity
        if (name === 'price' || name === 'quantity') {
            // ตรวจสอบว่าค่าที่กรอกเป็นตัวเลขแบบ int เท่านั้น
            if (!/^\d*$/.test(value)) {
                return; // ถ้าไม่ใช่ตัวเลข จะไม่ให้เปลี่ยนค่า
            }
            
            // ตรวจสอบค่าติดลบ
            if (parseInt(value) < 0) {
                return; // ไม่อนุญาตให้กรอกค่าติดลบ
            }
        }
    
        setValues({ ...values, [name]: value });
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        createProduct(user.token, values)
            .then((res) => {
                toast.success('Add ' + res.data.title + ' Success!!!');
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <h1>Loading... <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} /></h1>
                    ) : (
                        <div style={{ textAlign: "center", padding: "10px" }}>
                            <h1>Create Product</h1>
                        </div>
                    )}

                    <form onSubmit={handleSumbit} style={{ maxWidth: '800px', margin: '0 auto', gap: '15px', display: 'flex', flexDirection: 'column' }}>
                        <div className="form-group">
                            <label>ISBN</label>
                            <input className="form-control" type="text" name="ISBN" value={values.ISBN} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>ชื่อ</label>
                            <input className="form-control" type="text" name="title" value={values.title} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>ผู้เขียน</label>
                            <input className="form-control" type="text" name="author" value={values.author} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>สำนักพิมพ์</label>
                            <input className="form-control" type="text" name="publisher" value={values.publisher} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>หมวดหมู่</label>
                            <select className="form-control" name="category" onChange={handleChange} required>
                                <option value="">Please Select</option>
                                {values.categories.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>ราคา</label>
                                <input className="form-control" type="number" name="price" value={values.price} onChange={handleChange} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>จำนวน</label>
                                <input className="form-control" type="number" name="quantity" value={values.quantity} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>คำอธิบาย</label>
                            <input className="form-control" type="text" name="description" value={values.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>อัปโหลดรูปภาพ</label>
                            <FileUpload
                                loading={loading}
                                setLoading={setLoading}
                                values={values}
                                setValues={setValues}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>ยืนยัน</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
