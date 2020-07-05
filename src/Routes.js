import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";
import Hotel from "./core/Hotel";
import Flight from "./core/Flight";
import Cart from "./core/Cart";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddFlightCategory from "./admin/AddFlightCategory";
import AddHotelCategory from "./admin/AddHotelCategory";
import AddHotel from "./admin/AddHotel";

function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/flights"} exact component={Flight}/>
                <Route path={"/hotels"} exact component={Hotel}/>
                <Route path={"/register"} exact component={Register}/>
                <Route path={"/login"} exact component={Login}/>
                <Route path={"/cart"} exact component={Cart}/>
                <AdminRoute path={"/admin/dashboard"} exact component={AdminDashboard}/>
                <AdminRoute path={"/admin/create/flight-category"} exact component={AddFlightCategory}/>
                <AdminRoute path={"/admin/create/hotel-category"} exact component={AddHotelCategory}/>
                <AdminRoute path={"/admin/create/hotel"} exact component={AddHotel}/>
                <PrivateRoute path={"/user/dashboard"} exact component={UserDashboard}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;