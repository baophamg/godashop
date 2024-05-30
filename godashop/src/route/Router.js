import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
import Home from '../page/Home';
import Product from '../page/Product';
import PaymentPolicy from '../page/PaymentPolicy';
import ReturnPolicy from '../page/ReturnPolicy';
import DeliveryPolicy from '../page/DeliveryPolicy';
import Contact from '../page/Contact';
import ProductDetail from '../page/ProductDetail';
import Account from '../page/Account';
import ProtecedRouter from './ProtecedRouter';
import Order from '../page/Order';
import OrderDetail from '../page/OrderDetail';
import Checkout from '../page/Checkout';
// trang chủ

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* student */}
                    <Route path="" element={<Home />} />
                    <Route path="/san-pham.html" element={<Product />} />
                    <Route path="/danh-muc/:slug" element={<Product />} />
                    <Route path="/chinh-sach-thanh-toan.html" element={<PaymentPolicy />} />
                    <Route path="/chinh-sach-doi-tra.html" element={<ReturnPolicy />} />
                    <Route path="/chinh-sach-giao-hang.html" element={<DeliveryPolicy />} />
                    <Route path="/lien-he.html" element={<Contact />} />
                    <Route path="/san-pham/:slug" element={<ProductDetail />} />

                    <Route path="/thong-tin-tai-khoan.html" element={<ProtecedRouter><Account /></ProtecedRouter>} />

                    <Route path="/don-hang-cua-toi.html" element={<ProtecedRouter><Order /></ProtecedRouter>} />

                    <Route path="/don-hang/:slug" element={<ProtecedRouter><OrderDetail /></ProtecedRouter>} />

                    <Route path="/checkout" element={<ProtecedRouter><Checkout /></ProtecedRouter>} />

                </Route>
            </Routes>
        </>
    );
}
