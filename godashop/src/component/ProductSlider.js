import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductSlider({ product }) {
    const images = [
        {
            // lớn
            original: product.featured_image,
            //nhỏ
            thumbnail: product.featured_image,
        }
    ];

    // Dấu ({}) để phân biệt object với thân hàm
    const moreImages = product.thumbnailItems.map((thumbnailItem) =>
    ({
        // lớn
        original: thumbnailItem.name,
        //nhỏ
        thumbnail: thumbnailItem.name,
    })
    );
    const allImages = [...images, ...moreImages];
    return <ImageGallery items={allImages} showNav={false} showPlayButton={false} />;
}
