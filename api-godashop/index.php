<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, PATCH, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// router của site (giao diện người dùng)
session_start();
require 'config.php';
// require autoload
require 'vendor/autoload.php';

require ABSPATH . 'connectDb.php';

// import bootstrap (model)
require ABSPATH . 'bootstrap.php';

//import controller trong site
require ABSPATH_SITE . 'load.php';

$router = new AltoRouter();

$router->map('POST', '/api/v1/login', ['ApiAuthController', "login"], 'api.login');

$router->map('POST', '/api/v1/login_google', ['ApiAuthController', "loginGoogle"], 'api.login_google');
$router->map('POST', '/api/v1/login_facebook', ['ApiAuthController', "loginFacebook"], 'api.login_facebook');


// api
// products
$router->map('GET', '/api/v1/products', ['ApiProductController', "index"], 'api.product.index');

// categories
$router->map('GET', '/api/v1/categories', ['ApiCategoryController', "index"], 'api.category.index');

// product
$router->map(
    'GET',
    '/api/v1/products/[i:id]',
    function ($id) {
        call_user_func_array(['ApiProductController', "detail"], [$id]);
    },
    'api.product.detail'
);

// comments
$router->map(
    'GET',
    '/api/v1/products/[i:id]/comments',
    function ($id) {
        call_user_func_array(['ApiProductController', "comments"], [$id]);
    },
    'api.product.comments'
);

$router->map(
    'POST',
    '/api/v1/products/[i:id]/comments',
    function ($id) {
        call_user_func_array(['ApiProductController', "storeComment"], [$id]);
    },
    'api.product.store_comment'
);

// customer
$router->map(
    'GET',
    '/api/v1/customers/[i:id]',
    function ($id) {
        call_user_func_array(['ApiCustomerController', "show"], [$id]);
    },
    'api.customer.detail'
);

// customer
$router->map(
    'PATCH',
    '/api/v1/customers/[i:id]/shipping',
    function ($id) {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->saveShippingAddress($id);
    },
    'api.customer.shippingDefault'
);

// customer
$router->map(
    'PATCH',
    '/api/v1/customers/[i:id]/account',
    function ($id) {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->updateInfo($id);
    },
    'api.customer.account'
);

// lấy danh sách tỉnh/thành phố
$router->map(
    'GET',
    '/api/v1/provinces',
    function () {
        $apiAddressController = new ApiAddressController();
        $apiAddressController->getProvinces();
    },
    'api.provinces'
);
// lấy danh sách quận/huyện
$router->map(
    'GET',
    '/api/v1/districts/province/[i:provinceId]',
    function ($provinceId) {
        $apiAddressController = new ApiAddressController();
        $apiAddressController->getDistricts($provinceId);
    },
    'api.districts'
);

// lấy danh sách phường/xã
$router->map(
    'GET',
    '/api/v1/wards/district/[i:districtId]',
    function ($districtId) {
        $apiAddressController = new ApiAddressController();
        $apiAddressController->getWards($districtId);
    },
    'api.wards'
);

// lấy phí giao hàng
$router->map(
    'GET',
    '/api/v1/shippingFees/[i:provinceId]',
    function ($provinceId) {
        $apiAddressController = new ApiAddressController();
        $apiAddressController->getShippingFee($provinceId);
    },
    'api.shippingFee'
);

// lấy danh sách đơn hàng
$router->map(
    'GET',
    '/api/v1/orders',
    function () {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->orders();
    },
    'api.order'
);

// lấy chi tiết đơn hàng
$router->map(
    'GET',
    '/api/v1/orders/[i:id]',
    function ($id) {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->orderDetail($id);
    },
    'api.orderDetail'
);

$router->map(
    'POST',
    '/api/v1/orders',
    function () {
        $apiPaymentController = new ApiPaymentController();
        $apiPaymentController->order();
    },
    'api.orders.post'
);

$router->map(
    'GET',
    '/api/v1/notExistingEmail/[*:email]',
    function ($email) {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->notExistingEmail($email);
    },
    'api.notExistingEmail'
);

$router->map(
    'POST',
    '/api/v1/registers',
    function () {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->register();
    },
    'api.register'
);

$router->map(
    'GET',
    '/api/v1/active_account',
    function () {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->activeAccount();
    },
    'api.activeAccount'
);

$router->map(
    'POST',
    '/api/v1/forgot_password',
    function () {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->forgotPassword();
    },
    'api.forgot_password'
);

$router->map(
    'PATCH',
    '/api/v1/reset_password',
    function () {
        $apiCustomerController = new ApiCustomerController();
        $apiCustomerController->updatePassword();
    },
    'api.reset_password'
);




// Trang chủ
$router->map('GET', '/', ['HomeController', "index"], 'home');


// Trang sản phẩm
$router->map('GET', '/san-pham', ['ProductController', "index"], 'product');

// Trang chính sách đổi trả
$router->map('GET', '/chinh-sach-doi-tra.html', ['InformationController', "returnPolicy"], 'return-policy');

// Trang chính sách giao hàng
$router->map('GET', '/chinh-sach-giao-hang.html', ['InformationController', "deliveryPolicy"], 'delivery-policy');

// Trang chính sách thanh toán
$router->map('GET', '/chinh-sach-thanh-toan.html', ['InformationController', "paymentPolicy"], 'payment-policy');

// Trang liên hệ
$router->map('GET', '/lien-he.html', ['ContactController', "form"], 'contact-form');

// Trang chi tiết sản phẩm
$router->map('GET', '/san-pham/[*:slugName]-[i:id].html', ['ProductController', "detail"], 'product-detail');

// Trang danh mục sản phẩm
$router->map(
    'GET',
    '/danh-muc/[*:slugName]-[i:id]',
    function ($slugName, $id) {
        call_user_func_array(['ProductController', "index"], [$id]);
    },
    'category'
);

// Tìm kiếm theo khoảng giá
$router->map(
    'GET',
    '/khoang-gia/[*:priceRange]',
    function ($priceRange) {
        call_user_func_array(['ProductController', "index"], [null, $priceRange]);
    },
    'price-range'
);

// Tìm kiếm theo khoảng giá
$router->map(
    'GET',
    '/search',
    ['ProductController', "index"],
    'search'
);



// assuming current request url = '/'
$match = $router->match();

// check access token
if (in_array($match['name'], [
    "api.customer.detail",
    "api.customer.shippingDefault",
    "api.customer.account",
    "api.order",
    "api.orderDetail",
    "api.orders.post",
    "api.customer.account"
])) {
    try {
        $headers = apache_request_headers(); // hoặc getallheaders()
        if (isset($headers['Authorization'])) {
            $authorizationHeader = $headers['Authorization'];
        }

        if (!isset($authorizationHeader) || !preg_match('/Bearer\s(\S+)/', $authorizationHeader, $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Access Token not found in request';
            exit;
        }
        $access_token = $matches[1];

        $key = JWT_KEY;
        $globalCustomer = JWT::decode($access_token, new Key($key, 'HS256'));
    } catch (Exception $e) {
        header('HTTP/1.0 400 Bad Request');
        echo 'Wrong token';
        exit;
    }
}
//end


$routeName = $match['name'] ?? null;
// call closure or throw 404 status
if (is_array($match) && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    var_dump($match);
    exit;
    // Đường dẫn không đẹp, không dùng cho SEO
    $c = $_GET['c'] ?? 'home';
    $a = $_GET['a'] ?? 'index';
    $str = ucfirst($c) . 'Controller'; //HomeController
    $controller = new $str(); //new HomeController();
    $controller->$a(); //$controller->index();
    // no route was matched
    // header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}

function slugify($str)
{
    $str = trim(mb_strtolower($str));
    $str = preg_replace('/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/', 'a', $str);
    $str = preg_replace('/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/', 'e', $str);
    $str = preg_replace('/(ì|í|ị|ỉ|ĩ)/', 'i', $str);
    $str = preg_replace('/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/', 'o', $str);
    $str = preg_replace('/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/', 'u', $str);
    $str = preg_replace('/(ỳ|ý|ỵ|ỷ|ỹ)/', 'y', $str);
    $str = preg_replace('/(đ)/', 'd', $str);
    $str = preg_replace('/[^a-z0-9-\s]/', '', $str);
    $str = preg_replace('/([\s]+)/', '-', $str);
    return $str;
}
