import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Cart from './Cart';
import ForgotPassword from './ForgotPassword';

export default function Footer() {
    return (
        <>
            <div>
                <footer className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 col-sm-3 col-xs-4 list">
                                        <div className="footerLink">
                                            <h4>Danh mục</h4>
                                            <ul className="list-unstyled">
                                                <li><a href="#">Kem Chống Nắng </a></li>
                                                <li><a href="#">Kem Dưỡng Da </a></li>
                                                <li><a href="#">Kem Trị Mụn </a></li>
                                                <li><a href="#">Kem Trị Thâm Nám </a></li>
                                                <li><a href="#">Sữa Rửa Mặt </a></li>
                                                <li><a href="#">Sữa Tắm </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3 col-xs-4 list">
                                        <div className="footerLink">
                                            <h4>Liên kết </h4>
                                            <ul className="list-unstyled">
                                                <li><a href="san-pham.html">Sản phẩm </a></li>
                                                <li><a href="chinh-sach-doi-tra.html">Chính sách đổi trả</a></li>
                                                <li><a href="chinh-sach-thanh-toan.html">Chính sách thanh toán</a></li>
                                                <li><a href="chinh-sach-giao-hang.html">Chính sách giao hàng </a></li>
                                                <li><a href="lien-he.html">Liên hệ </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3 col-xs-4 list">
                                        <div className="footerLink">
                                            <h4>Liên hệ với chúng tôi </h4>
                                            <ul className="list-unstyled">
                                                <li>Phone: 0932.538.468</li>
                                                <li><a href="mailto:nguyenhuulocla2006@gmail.com">Mail: nguyenhuulocla2006@gmail.com</a></li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li><a href="https://www.facebook.com/HocLapTrinhWebTaiNha.ThayLoc"><i className="fab fa-facebook-f" /></a></li>
                                                <li><a href="https://twitter.com"><i className="fab fa-twitter" /></a></li>
                                                <li><a href="https://www.instagram.com"><i className="fab fa-instagram" /></a></li>
                                                <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest" /></a></li>
                                                <li><a href="https://www.youtube.com/"><i className="fab fa-youtube" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 list">
                                        <div className="newsletter clearfix">
                                            <h4>Bản tin</h4>
                                            <p>Nhập Email của bạn để chúng tôi cung cấp thông tin nhanh nhất cho bạn về những sản phẩm mới!!</p>
                                            <form action method="POST">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Nhập email của bạn.." name="email" />
                                                    <button type="submit" className="btn btn-primary send pull-right">Gửi</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* END FOOTER */}
                {/* BACK TO TOP */}
                <div className="back-to-top">▲</div>
                {/* END BACK TO TOP */}
                {/* REGISTER DIALOG */}
                <RegisterForm />
                {/* END REGISTER DIALOG */}
                {/* LOGIN DIALOG */}
                <LoginForm />
                {/* END LOGIN DIALOG */}
                {/* FORTGOT PASSWORD DIALOG */}
                <ForgotPassword />
                {/* END FORTGOT PASSWORD DIALOG */}
                {/* CART DIALOG */}
                <Cart />
                {/* END CART DIALOG */}
                {/* Facebook Messenger Chat */}
                {/* Load Facebook SDK for JavaScript */}
                <div id="fb-root" />
                {/* Your customer chat code */}
                <div className="fb-customerchat" attribution="setup_tool" page_id={112296576811987} logged_in_greeting="Chào bạn, bạn muốn mua sản phẩm nào bên GodaShop.com" logged_out_greeting="Chào bạn, bạn muốn mua sản phẩm nào bên GodaShop.com">
                </div>
                {/* End Facebook Messenger Chat */}
            </div>

        </>
    );
}
