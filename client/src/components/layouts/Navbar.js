import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  DownOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../card/Search';

const Navbar = () => {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart } = useSelector((state) => ({ ...state }));
  
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate('/');
  };

  const selectedKey = location.pathname;

  return (
    <div>
      {/* แถบแรกสำหรับชื่อร้าน และ Cart, Search Bar */}
      <div style={{
        backgroundColor: '#FF6B00',
        padding: '10px 20px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        {/* ชื่อร้าน "BOOK STORE" ตรงกลาง */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
        }}>
          BOOK STORE
        </div>
        
        {/* Cart Icon and Search Bar ด้านขวา */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <div style={{ marginRight: '15px', color: '#fff', display: 'flex', alignItems: 'center' }}>
            <Link to="/cart" style={{ color: '#fff', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <ShoppingCartOutlined style={{ fontSize: '18px', marginRight: '5px' }} />
              <span>Cart</span>
              <Badge count={cart.length} offset={[5, 0]} />
            </Link>
          </div>
          
          <span style={{ marginRight: '15px' }}>
            <Search />
          </span>
        </div>
      </div>

      {/* แถบที่สองสำหรับเมนูหลัก */}
      <Menu 
        mode="horizontal" 
        selectedKeys={[selectedKey]} 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          backgroundColor: '#f0f0f0',
          padding: '0 20px',
        }}
      >
        {/* ส่วนเมนูที่อยู่ตรงกลาง */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Menu.Item key="/" icon={<HomeOutlined style={{ color: '#000' }} />} className={selectedKey === '/' ? 'active-menu-item' : ''}>
            <Link to="/" style={{ color: '#000', textDecoration: 'none' }}>Home</Link>
          </Menu.Item>

          <Menu.Item key="/shop" icon={<ShoppingOutlined style={{ color: '#000' }} />} className={selectedKey === '/shop' ? 'active-menu-item' : ''}>
            <Link to="/shop" style={{ color: '#000', textDecoration: 'none' }}>Shop</Link>
          </Menu.Item>

          {user && (
            <>
<Menu.Item key="/user/history" icon={<HistoryOutlined style={{ color: '#000' }} />} className={selectedKey === '/user/history' ? 'active-menu-item' : ''}> 
  <Link to="/user/history" style={{ color: '#000', textDecoration: 'none' }}>History</Link>
</Menu.Item>

              <Menu.Item key="/user/wishlist" icon={<ShoppingOutlined style={{ color: '#000' }} />} className={selectedKey === '/user/wishlist' ? 'active-menu-item' : ''}>
                <Link to="/user/wishlist" style={{ color: '#000', textDecoration: 'none' }}>Wishlist</Link>
              </Menu.Item>
            </>
          )}
        </div>

        {/* ปุ่ม Register และ Login */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
          {!user && (
            <>
              <Menu.Item key="/register" icon={<UserAddOutlined style={{ color: '#000' }} />} className={selectedKey === '/register' ? 'active-menu-item' : ''}>
                <Link to="/register" style={{ color: '#000', textDecoration: 'none' }}>Register</Link>
              </Menu.Item>
              <Menu.Item key="/login" icon={<LoginOutlined style={{ color: '#000' }} />} className={selectedKey === '/login' ? 'active-menu-item' : ''}>
                <Link to="/login" style={{ color: '#000', textDecoration: 'none' }}>Login</Link>
              </Menu.Item>
            </>
          )}

          {user && (
            <SubMenu
              key="SubMenu"
              icon={<DownOutlined style={{ color: '#000' }} />}
              title={<span style={{ color: '#000' }}>{user.username}</span>}
            >
              {user.role === 'admin' && (
                <Menu.Item key="/admin/index">
                  <Link to='/admin/index' style={{ textDecoration: 'none' }}>Dashboard</Link>
                </Menu.Item>
              )}

              <Menu.Item icon={<LogoutOutlined style={{ color: '#000' }} />} key="logout" onClick={logout}>
                Logout
              </Menu.Item>
            </SubMenu>
          )}
        </div>
      </Menu>

      {/* CSS for active tab */}
      <style jsx="true">{`
        .active-menu-item {
          border-bottom: 3px solid #FF6B00;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
