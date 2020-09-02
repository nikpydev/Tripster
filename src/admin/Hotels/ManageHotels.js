import React, {useState, useEffect} from 'react';
import Base from "../../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../auth/helper";
import {deleteHotel, getAllHotels} from "../helper/adminapicalls";

function ManageHotels() {
    const [hotels, setHotels] = useState([]);

    const {user: {_id}, token} = isAuthenticated();

    const preload = () => {
        getAllHotels()
            .then(data => {
                if (data) {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        setHotels(data);
                    }
                }
            })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteOneHotel = productId => {
        deleteHotel(productId, _id, token)
            .then(data => {
                if (data) {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        preload();
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Base title="Welcome admin" description="Manage hotels here">
            <h2 className="mb-4">All hotels:</h2>
            <Link className="btn btn-info" to={`/Tripster/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {hotels.length} hotels</h2>

                    {hotels.map((hotel, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{hotel.brand} {hotel.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/Tripster/admin/hotel/update/${hotel._id}`}
                                    >
                                        <span
                                            className=""
                                        >
                                            Update
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {
                                        deleteOneHotel(hotel._id)
                                    }} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}

export default ManageHotels;