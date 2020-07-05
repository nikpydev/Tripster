import React from 'react';
import {API} from "../../backend";


function ImageHelper({hotel}) {
    const imageURL = hotel
        ? `${API}/hotel/photo/${hotel._id}`
        : undefined

    return (
        <figure className="image-container rounded border border-success p-2">
            <img
                src={imageURL}
                alt="photo"
                style={{ height: "100%", width: "100%" }}
                className={"rounded card-img"}
            />
        </figure>
    );
}

export default ImageHelper;