import React from 'react';
import {API} from "../../backend";
import {isAuthenticated} from "../../auth/helper";

function DPHelper() {
    const {user: {_id}} = isAuthenticated();
    const imageURL = `${API}/user/photo/${_id}`;

    return (
        <figure className="image-container rounded border border-success p-2">
            <img
                src={imageURL}
                alt="photo"
                style={{height: "100%", width: "100%"}}
                className={"rounded card-img"}
            />
        </figure>
    );
}

export default DPHelper;
