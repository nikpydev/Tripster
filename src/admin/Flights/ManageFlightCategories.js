import React, {useEffect, useState} from 'react';
import Base from "../../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../auth/helper";
import {deleteFlightCategory, getAllFlightCategories} from "../helper/adminapicalls";

function ManageFlightCategories() {
    const [flightCategories, setFlightCategories] = useState([]);

    const {user: {_id}, token} = isAuthenticated()

    const preload = () => {
        getAllFlightCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data)
                    setFlightCategories(data)
                }
            })
    }

    useEffect(() => {
        preload()
    }, []);

    const deleteOneCategory = categoryId => {
        deleteFlightCategory(categoryId, _id, token)
            .then(data => {
                if (data.error) {
                    console.log("deleteOneCategory", data.error)
                } else {
                    preload()
                }
            })
            .catch()
    }

    return (
        <Base title="Welcome admin" description="Manage flightCategories here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {flightCategories.length} products</h2>

                    {flightCategories.map((flightCategory, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{flightCategory.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/flight-category/update/${flightCategory._id}`}
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
                                        deleteOneCategory(flightCategory._id)
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

export default ManageFlightCategories;