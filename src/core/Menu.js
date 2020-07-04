import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import {isAuthenticated, logout} from "../auth/helper"

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
                        to={"/flights"}
                        style={currentTab(history, "/flights")}
                    >
                        Flights
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={"/hotels"}
                        style={currentTab(history, "/hotels")}
                    >
                        Hotels
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

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to={"/user/dashboard"}
                            style={currentTab(history, "/user/dashboard")}
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to={"/admin/dashboard"}
                            style={currentTab(history, "/admin/dashboard")}
                        >
                            Admin Dashboard
                        </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
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
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className={"nav-link text-warning"}
                            style={{"cursor": "pointer"}}
                            onClick={() => {
                                logout(() => {
                                    history.push("/")
                                })
                            }}
                        >
                            Logout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Menu);