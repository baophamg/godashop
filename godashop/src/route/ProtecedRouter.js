import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtecedRouter({ children }) {
    const isLogin = useSelector(state => state.AuthReducer.isLogin);
    if (!isLogin) {
        //nếu chưa login rồi thì đều hướng đến trang chủ
        return <Navigate to='/' />
    }
    return children;
}
