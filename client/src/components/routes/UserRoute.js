///เปลี่ยน
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingToRadirect from './LoadingToRadirect';

const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // เลือกเฉพาะข้อมูลที่จำเป็น

  return user && user.token
    ? children
    : <LoadingToRadirect />;
};

export default UserRoute;
