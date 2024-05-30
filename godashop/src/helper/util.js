import axios from "axios";
import slugify from "react-slugify";
import numeral from 'numeral';
import 'numeral/locales';
numeral.locale('vi');

// newParams là object
export const updateParam = (searchParams, setSearchParams, newParams) => {
    let params = {}
    // searchParams chứa param hiện tại trên thanh địa chỉ web
    for (const [key, value] of searchParams.entries()) {
        // key là tên param, value là giá trị của param đó
        // vd: page=2&search=ty thì tên param là page, giá trị là 2
        params[key] = value;
    }

    // thêm mới param, dùng es6 (spread)
    // searchParams = {page: 2, conga: 3}
    // newParams = {search: 'Ty', concho: 4}
    // params = {page: 2, conga: 3, search: 'Ty', concho: 4}
    params = { ...params, ...newParams };

    // cập nhật param trên thanh địa chỉ
    setSearchParams(params);
}

export const getAuthInfo = () => {
    const authInfo = localStorage.getItem('authInfo');
    let initialState;
    if (!authInfo) {
        initialState = { isLogin: false, access_token: null, loggedUser: null };
    }
    else {
        // chuyển ngược lại từ chuỗi thành object
        initialState = JSON.parse(authInfo);
    };
    return initialState;
}

export const axiosAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getAuthInfo().access_token}`
    }
})

export const axiosNonAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getCategoryId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('-');//cắt chuỗi ở dấu ngoặc
    // id nằm ở phần tử cuối
    // const categoryId = slugParts[slugParts.length - 1];
    const categoryId = slugParts.pop();
    return categoryId;
}

export const getProductId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html');//cắt chuỗi ở chỗ cuối cùng
    // id nằm ở phần tử cuối
    const leftPart = slugParts[0];
    // cắt ở dấu -
    const parts = leftPart.split('-');
    // id nằm là phần tử nằm cuối cùng trong danh sách
    const productId = parts.pop();
    return productId;
}

export const createLinkCategory = (category) => {
    return `/danh-muc/${slugify(category.name + '-' + category.id)}`;
}

// /san-pham/kem-lam-trang-da-5-in-1-2878.html
export const createLinkProduct = (product) => {
    return `/san-pham/${slugify(product.name + '-' + product.id)}.html`;
}

// //don-hang/chi-tiet-don-hang-5.html
export const createLinkOrderDetail = (order) => {
    return `/don-hang/chi-tiet-don-hang-${order.id}.html`;
}

export const formatMoney = (money) => {
    return numeral(money).format('0,0');
}

export const getOrderId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html');//cắt chuỗi ở chỗ cuối cùng
    // id nằm ở phần tử cuối
    const leftPart = slugParts[0];
    // cắt ở dấu -
    const parts = leftPart.split('-');
    // id nằm là phần tử nằm cuối cùng trong danh sách
    const orderId = parts.pop();
    return orderId;
}

// Viết hàm thêm 1 sản phẩm vào giỏ hàng
export const pre_add_to_cart = (arr, input) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === input.id);
    if (index !== -1) {
        newArray[index].qty += Number(input.qty);
    }
    else {
        newArray.push(input);
    }

    return newArray;
}


export const pre_remove_from_cart = (arr, id) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === id);
    if (index !== -1) {
        newArray.splice(index, 1);
    }


    return newArray;
}


// Viết hàm update sản phẩm đã có trong giỏ hàng
export const pre_update_cart = (arr, input) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === input.id);
    if (index !== -1) {
        newArray[index].qty = Number(input.qty);
    }
    else {
        newArray.push(input);
    }

    return newArray;
}