import React, { useState } from 'react';

// functions
import { login } from '../../functions/auth';

// redux
import { useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

// Ant Design
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// โลโก้
import logo from '../../../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if (intended) {
      navigate('../' + intended);
    } else {
      if (role === 'admin') {
        navigate("/admin/index");
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(value)
      .then(res => {
        setLoading(false);
        toast.success(res.data.payload.user.username + " Login Success");
        dispatch({
          type: 'LOGIN',
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          }
        });
        localStorage.setItem('token', res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-center'>
          {loading ? (
            <h1>Loading...
              <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
            </h1>
          ) : (
            <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '10px' }} />
          )}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input 
                className='form-control'
                type="text" 
                name="username" 
                value={value.username} 
                onChange={handleChange}
                placeholder="Username" 
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
                value={value.password} 
                onChange={handleChange}
                placeholder="Password"
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
              style={{
                backgroundColor: '#FF6B00',
                color: '#fff',
                borderRadius: '5px',
                padding: '8px 20px',
                fontWeight: 'bold'
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
