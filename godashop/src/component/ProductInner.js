import React, { useEffect, useState } from 'react';
import ProductSlider from './ProductSlider';
import { axiosNonAuthInstance, formatMoney } from '../helper/util';
import * as DOMPurify from 'dompurify';
import RelatedProdutSlider from './RelatedProductSlider';
import ReactStars from "react-rating-stars-component";
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../const/CartConstant';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function ProductInner({ product }) {

  const [comments, setComments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getComments = async () => {
    setIsLoaded(false);//reset lại trước khi call api
    try {
      console.log(new Date());
      const response = await axiosNonAuthInstance().get(`/products/${product.id}/comments`);
      setComments(response.data);
      setIsLoaded(true);
    }
    catch (error) {
      console.log(error);
      setIsLoaded(true);
    }
  };

  const handleSubmitComment = async (values) => {
    try {
      // lưu comment
      await axiosNonAuthInstance().post(`/products/${product.id}/comments`, JSON.stringify(values));
      // lấy lại danh sách comment
      getComments();
      setIsLoaded(true);
    }
    catch (error) {
      console.log(error);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, [])
  const dispatch = useDispatch();
  const handleAddProductToCartInner = async (id, e) => {
    const addToCartLink = e.target;
    const previousInput = addToCartLink.previousElementSibling;
    const qty = previousInput.value;
    try {
      console.log(new Date());
      const response = await axiosNonAuthInstance().get(`/products/${id}`);
      const product = response.data;
      const item = {
        id: product.id,
        name: product.name,
        featured_image: product.featured_image,
        sale_price: product.sale_price,
        qty: qty
      };

      // tạo action để dispatch lên store
      const action = { type: ADD_TO_CART, payload: item };
      dispatch(action);
    }
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data || error.messsage)
    }
  }
  return (
    <>
      <div className="row product-info">
        <div className="col-md-6">
          <ProductSlider product={product} />
        </div>
        <div className="col-md-6">
          <h5 className="product-name">{product.name}</h5>
          <div className="brand">
            <span>Nhãn hàng: </span> <span>Xử sau</span>
          </div>
          <div className="product-status">
            <span>Trạng thái: </span>
            {
              product.inventory_qty > 0 ?
                <span className="label-success">Còn hàng</span> :
                <span className="label-warning">Hết hàng</span>
            }

          </div>
          <div className="product-item-price">
            <span>Giá: </span>
            {
              product.price !== product.sale_price ?
                <span className="product-item-regular">{formatMoney(product.price)}₫</span> :
                null
            }

            <span className="product-item-discount">{formatMoney(product.sale_price)}₫</span>
          </div>

          <div className="input-group">
            <input type="number" className="product-quantity form-control" min={1} defaultValue={1} />
            <Link href="#" onClick={(e) => handleAddProductToCartInner(product.id, e)} className="buy-in-detail btn btn-success cart-add-button"><i className="fa fa-shopping-cart" /> Thêm vào giỏ hàng</Link>
          </div>

        </div>
      </div>
      <div className="row product-description">
        <div className="col-xs-12">
          <div role="tabpanel">
            {/* Nav tabs */}
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a href="#product-description" aria-controls="home" role="tab" data-toggle="tab">Mô tả</a>
              </li>
              <li role="presentation">
                <a href="#product-comment" aria-controls="tab" role="tab" data-toggle="tab">Đánh giá</a>
              </li>
            </ul>
            {/* Tab panes */}
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="product-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>


              </div>
              <div role="tabpanel" className="tab-pane" id="product-comment">
                {
                  isLoaded ? <CommentForm handleSubmitComment={handleSubmitComment} /> : null
                }

                <div className="comment-list">
                  {
                    comments.map((comment) =>
                      <>
                        <hr />
                        <span className="date pull-right">{comment.created_date}</span>

                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          activeColor="#ffd700"
                          // nhận con số, không phải chuỗi số
                          value={Number(comment.star)}
                        />

                        <span className="by">{comment.fullname}</span>
                        <p>{comment.description}</p>
                      </>

                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row product-related equal">
        <div className="col-md-12">
          <h4 className="text-center">Sản phẩm liên quan</h4>
          <RelatedProdutSlider relatedProducts={product.relatedProducts} />
        </div>
      </div>
    </>
  );
}
