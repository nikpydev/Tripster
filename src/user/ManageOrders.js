import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper";
import {getUser} from "./helper/userapicalls";

function ManageOrders() {
    const [flightOrders, setFlightOrders] = useState([]);
    const [hotelOrders, setHotelOrders] = useState([]);

    const {user: {_id}, token} = isAuthenticated();

    const preload = () => {
        getUser(_id, token)
            .then(data => {
                if (data) {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        const {flight_purchases, hotel_purchases} = data;
                        setFlightOrders(flight_purchases);
                        setHotelOrders(hotel_purchases);
                    }
                }
            })
    }

    useEffect(() => {
        preload();
    }, []);

    return (
        <Base title="Welcome User" description="View orders here">
            <h2 className="mb-4">All Orders:</h2>
            <Link className="btn btn-info" to={isAuthenticated().user.role < 1 ? `/user/dashboard` : `/admin/dashboard`}>
                <span className="">Admin Dashboard</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <hr/>
                    <h2 className="text-center text-white my-3">Following are your flight orders</h2>
                    <hr/>
                    {flightOrders.map((flightOrder, index) => {
                        return (
                            <div key={index} className="row text-center mb-2">

                                <div className="col-4">
                                    <h3 className="text-white text-center">
                                        <span style={{
                                            "fontSize": "1.5rem",
                                            "paddingRight": "1.5rem"
                                        }}>
                                            Flight Name:
                                        </span>
                                        {flightOrder.brand} {flightOrder.name}
                                    </h3>
                                </div>

                                <div className="col-8">
                                    <h2 className={"text-white text-center"}
                                    style={{"fontSize": "1.5rem"}}>
                                        <span
                                            style={{
                                                "fontSize": "1.5rem",
                                                "paddingRight": "1.5rem"
                                            }}>
                                            Flight ID:
                                        </span>
                                        {flightOrder._id}
                                    </h2>
                                </div>

                            </div>
                        )
                    })}

                    <hr/>
                    <h2 className="text-center text-white my-3">Following are your hotel orders</h2>
                    <hr/>

                    {hotelOrders.map((hotelOrder, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">

                                <div className="col-4">
                                    <h3 className="text-white text-center">
                                        <span style={{
                                            "fontSize": "1.5rem",
                                            "paddingRight": "1.5rem"
                                        }}>
                                            Hotel Name:
                                        </span>
                                        {hotelOrder.brand} {hotelOrder.name}
                                    </h3>
                                </div>

                                <div className="col-8">
                                    <h2 className={"text-white text-center"}
                                        style={{"fontSize": "1.5rem"}}>
                                        <span
                                            style={{
                                                "fontSize": "1.5rem",
                                                "paddingRight": "1.5rem"
                                            }}>
                                            Flight ID:
                                        </span>
                                        {hotelOrder._id}
                                    </h2>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}

export default ManageOrders;
