import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper";
import {deleteFlight, getAllFlights} from "./helper/adminapicalls";

function ManageFlights() {
    const [flights, setFlights] = useState([]);

    const {user: {_id}, token} = isAuthenticated();

    const preload = () => {
        getAllFlights()
            .then(data => {
                if (data) {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        setFlights(data);
                    }
                }
            })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteOneFlight = productId => {
        deleteFlight(productId, _id, token)
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
        <Base title="Welcome admin" description="Manage flights here">
            <h2 className="mb-4">All flights:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {flights.length} flights</h2>

                    {flights.map((flight, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{flight.brand} {flight.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/flight/update/${flight._id}`}
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
                                        deleteOneFlight(flight._id)
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

export default ManageFlights;