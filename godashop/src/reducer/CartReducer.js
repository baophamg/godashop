import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, UPDATE_QTY } from "../const/CartConstant";
import { pre_add_to_cart, pre_remove_from_cart, pre_update_cart } from "../helper/util";

const cart = localStorage.getItem('cart');
let initialState;
if (!cart) {
    initialState = {
        cartItems: []
    };
}
else {
    // chuyển ngược lại từ chuỗi thành object
    initialState = JSON.parse(cart);
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const newCart = {
                    cartItems: pre_add_to_cart(state.cartItems, action.payload)
                }
                // lưu xuống localStorage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }

        case REMOVE_FROM_CART:
            {
                const newCart = {
                    cartItems: pre_remove_from_cart(state.cartItems, action.payload.id)
                }
                // lưu xuống localStorage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }
        case UPDATE_QTY:
            {
                const newCart = {
                    cartItems: pre_update_cart(state.cartItems, action.payload)
                }
                // lưu xuống localStorage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }

        case EMPTY_CART:
            {
                const newCart = {
                    cartItems: []
                }
                // lưu xuống localStorage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.removeItem('cart');
                return newCart;
            }

        default:
            // giữ nguyên state hiện tại nếu không có action nào phù hợp với tiêu chí của chương trình
            return state;//luôn luôn là chữ state
    }
}

export default CartReducer;