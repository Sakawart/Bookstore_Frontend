import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenubarAdmin = () => {
    const location = useLocation(); // ใช้เพื่อตรวจสอบ path ปัจจุบัน

    return (
        <nav style={{ padding: '20px' }}>
            <ul className='nav flex-column' style={{ listStyleType: 'none', padding: 0 }}>
                <li className="nav-item" style={{ marginBottom: '15px' }}>
                    <Link 
                        to="/admin/index" 
                        style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === '/admin/index' ? '#e0e0e0' : 'transparent',
                            display: 'block'
                        }}
                    >
                        แดชบอร์ด
                    </Link>
                </li>

                <li className="nav-item" style={{ marginBottom: '15px' }}>
                    <Link 
                        to="/admin/mange-admin" 
                        style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === '/admin/mange-admin' ? '#e0e0e0' : 'transparent',
                            display: 'block'
                        }}
                    >
                        จัดการผู้ใช้งาน
                    </Link>
                </li>

                <li className="nav-item" style={{ marginBottom: '15px' }}>
                    <Link 
                        to="/admin/create-category" 
                        style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === '/admin/create-category' ? '#e0e0e0' : 'transparent',
                            display: 'block'
                        }}
                    >
                        เพิ่มหมวดหมู่
                    </Link>
                </li>

                <li className="nav-item" style={{ marginBottom: '15px' }}>
                    <Link 
                        to="/admin/create-product" 
                        style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === '/admin/create-product' ? '#e0e0e0' : 'transparent',
                            display: 'block'
                        }}
                    >
                        เพิ่มสินค้า
                    </Link>
                </li>

                <li className="nav-item" style={{ marginBottom: '15px' }}>
                    <Link 
                        to="/admin/orders" 
                        style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === '/admin/orders' ? '#e0e0e0' : 'transparent',
                            display: 'block'
                        }}
                    >
                        รายการคำสั่งซื้อ
                    </Link>
                </li>
            </ul>

            {/* CSS สำหรับเอฟเฟกต์ hover */}
            <style jsx="true">{`
                .nav-item a:hover {
                    background-color: #e0e0e0;
                }
            `}</style>
        </nav>
    );
};

export default MenubarAdmin;
