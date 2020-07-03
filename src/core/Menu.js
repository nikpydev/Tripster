import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ECC72"}
    } else {
        return {color: "#FFFFFF"}
    }
}

function Menu({history}) {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/"}
                        style={currentTab(history, "/")}
                    >
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/cart"}
                        style={currentTab(history, "/cart")}
                    >
                        Cart
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/user/dashboard"}
                        style={currentTab(history, "/user/dashboard")}
                    >
                        User Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/admin/dashboard"}
                        style={currentTab(history, "/admin/dashboard")}
                    >
                        Admin Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/register"}
                        style={currentTab(history, "/register")}
                    >
                        Register
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/login"}
                        style={currentTab(history, "/login")}
                    >
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/logout"}
                        style={currentTab(history, "/logout")}
                    >
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(Menu);