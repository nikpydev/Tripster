import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ECC72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

function Menu({ history }) {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/Tripster"}
            style={currentTab(history, "/Tripster")}
          >
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/Tripster/flights"}
            style={currentTab(history, "/Tripster/flights")}
          >
            Flights
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/Tripster/hotels"}
            style={currentTab(history, "/Tripster/hotels")}
          >
            Hotels
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={"/Tripster/cart"}
            style={currentTab(history, "/Tripster/cart")}
          >
            Cart
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/Tripster/user/dashboard"}
              style={currentTab(history, "/Tripster/user/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/Tripster/admin/dashboard"}
              style={currentTab(history, "/Tripster/admin/dashboard")}
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
                to={"/Tripster/register"}
                style={currentTab(history, "/Tripster/register")}
              >
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={"/Tripster/login"}
                style={currentTab(history, "/Tripster/login")}
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
              style={{ cursor: "pointer" }}
              onClick={() => {
                logout(() => {
                  history.push("/Tripster");
                });
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
