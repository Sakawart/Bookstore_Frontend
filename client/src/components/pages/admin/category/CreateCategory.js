import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../../layouts/MenubarAdmin';
import { createCategory, listCategory, deleteCategory } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // นำเข้าไอคอนที่ใช้

const CreateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [values, setValues] = useState({
        name: "",
    });
    const [category, setCategory] = useState([]);

    useEffect(() => {
        loadData(user.token);
    }, []);

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRemove = (id) => {
        deleteCategory(user.token, id)
            .then((res) => {
                loadData(user.token);
                toast.success('Remove Data ' + res.data.name + " success!!!");
            })
            .catch((err) => {
                toast.error('Error!!! Remove Data');
            });
    };

    const handleChangeCategory = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(user.token, values)
            .then((res) => {
                loadData(user.token);
                toast.success('Insert Data ' + res.data.name + " success!!!");
            })
            .catch((err) => {
                toast.error('Error!!! Insert Data');
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <MenubarAdmin />
                </div>

                <div className="col">
                    <h1>Create Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>เพิ่มหมวดหมู่สินค้า</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChangeCategory}
                                className="form-control"
                            />
                            <button className="btn btn-outline-primary mt-2">เพิ่ม</button>
                        </div>
                    </form>
                    <hr />
                    <ul className="list-group">
                        {category.map(item => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id}>
                                {item.name}
                                <div>
                                    <Link to={"/admin/update-category/" + item._id}
                                        style={{
                                            color: '#000',
                                            marginRight: '10px',
                                        }}>
                                        <EditOutlined style={{ fontSize: '18px' }} />
                                    </Link>
                                    <span
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        <DeleteOutlined style={{ fontSize: '18px' }} />
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
