import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import DPHelper from "./helper/DPHelper";

function AdminDashboard() {
    const {user : {
        fName,
        lName,
        email,
        // role
    }} = isAuthenticated()

    const adminLeftSide = () => {
        return(
            <div className={"card"}>
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={"/user/update/profile"} className={"nav-link text-success"}>
                            Edit Profile
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={"/user/orders"} className={"nav-link text-success"}>
                            Manage Your Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/create/flight-category"} className={"nav-link text-success"}>
                            Create Flight Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/flight-categories"} className={"nav-link text-success"}>
                            Manage Flight Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/create/flight"} className={"nav-link text-success"}>
                            Create Flights
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/flights"} className={"nav-link text-success"}>
                            Manage Flights
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={"/admin/create/hotel-category"} className={"nav-link text-success"}>
                            Create Hotel Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/hotel-categories"} className={"nav-link text-success"}>
                            Manage Hotel Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/create/hotel"} className={"nav-link text-success"}>
                            Create Hotels
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/hotels"} className={"nav-link text-success"}>
                            Manage Hotels
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/orders"} className={"nav-link text-success"}>
                            View All Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/admin/users/all"} className={"nav-link text-success"}>
                            View All Users
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return(
            <div className="card mb-4">
                <div className="row">
                    <div className="col-4">
                        <div className={"card-img-top"}>
                            <DPHelper/>
                        </div>
                    </div>
                </div>
                <h4 className="card-header">
                    Admin Information
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">
                            Name:
                        </span>
                        {`${fName} ${lName}`}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">
                            Email:
                        </span>
                        {`${email}`}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">
                            Admin Privileges:
                        </span>
                        Granted
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base
            className={"container bg-success p-4"}
            title={"Welcome to Admin Area"}
            description={"Manage all of your products here."}
        >
            <div className="row">
                <div className="col-4">
                    {adminLeftSide()}
                </div>
                <div className="col-8">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    );
}

export default AdminDashboard;
