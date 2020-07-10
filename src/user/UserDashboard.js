import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import DPHelper from "./helper/DPHelper";
import {getUserDP} from "./helper/userapicalls";

function UserDashboard() {
    const {
        user: {
            _id,
            fName,
            lName,
            email,
            // role
        },
        token
    } = isAuthenticated()

    const userLeftSide = () => {
        return (
            <div className={"card"}>
                <h4 className="card-header bg-dark text-white">
                    User Navigation
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

                </ul>
            </div>
        )
    }

    const userRightSide = () => {
        return (
            <div className="card mb-4">
                <div className="row">
                    <div className="col-4">
                        <div className={"card-img-top"}>
                            <DPHelper/>
                        </div>
                    </div>
                </div>
                <h4 className="card-header">
                    User Information
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
                        Revoked
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base
            className={"container bg-success p-4"}
            title={"Welcome to Your Dashboard"}
            description={"Manage your profile and orders here."}
        >
            <div className="row">
                <div className="col-4">
                    {userLeftSide()}
                </div>
                <div className="col-8">
                    {userRightSide()}
                </div>
            </div>
        </Base>
    );
}

export default UserDashboard;
