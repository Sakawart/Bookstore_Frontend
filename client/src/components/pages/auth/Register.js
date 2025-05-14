import React, { useState } from 'react';
// functions
import { register } from '../../functions/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        username: "",
        password: "",
        password1: ""
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.password !== value.password1) {
            toast.error("Password not Match");
        } else {
            register(value)
                .then(res => {
                    toast.success(res.data);
                    navigate("/login"); // นำทางไปยังหน้า Login เมื่อสมัครสำเร็จ
                })
                .catch(err => {
                    toast.error(err.response.data);
                });
        }
    };

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 text-center'>
                    <h1>Register</h1>
                    <div style={{ marginBottom: '30px' }}></div> {/* เพิ่มระยะห่างระหว่างหัวข้อและฟอร์ม */}
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input 
                                className='form-control'
                                type="text" 
                                name="username" 
                                placeholder="Username"
                                onChange={handleChange}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: '#333'
                                }}
                            />
                        </div>

                        <div className='form-group' style={{ marginTop: '15px' }}>
                            <input 
                                className='form-control'
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                onChange={handleChange}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: '#333'
                                }}
                            />
                        </div>

                        <div className='form-group' style={{ marginTop: '15px' }}>
                            <input 
                                className='form-control'
                                type="password" 
                                name="password1" 
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: '#333'
                                }}
                            />
                        </div>
                        <br />

                        <button 
                            type="submit"
                            className='btn' 
                            disabled={value.password.length < 8}
                            style={{
                                backgroundColor: '#FF6B00',
                                color: '#fff',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                fontWeight: 'bold',
                                width: '100px',
                                textAlign: 'center'
                            }}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
