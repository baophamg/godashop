import React from 'react';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './Product';

export default function RelatedProdutSlider({ relatedProducts }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>

            {
                relatedProducts.map((product, index) =>
                    <Product product={product} key={index} />
                )
            }
        </Slider>
    );

}