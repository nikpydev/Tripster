import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";
import Hotel from "./core/Hotels/Hotel";
import Flight from "./core/Flights/Flight";
import Cart from "./core/Cart";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddFlightCategory from "./admin/Flights/AddFlightCategory";
import AddHotelCategory from "./admin/Hotels/AddHotelCategory";
import AddHotel from "./admin/Hotels/AddHotel";
import ManageHotels from "./admin/Hotels/ManageHotels";
import UpdateHotel from "./admin/Hotels/UpdateHotel";
import AddFlight from "./admin/Flights/AddFlight";
import ManageFlights from "./admin/Flights/ManageFlight";
import UpdateFlight from "./admin/Flights/UpdateFlight";
import ManageFlightCategories from "./admin/Flights/ManageFlightCategories";
import ManageHotelCategories from "./admin/Hotels/ManageHotelCategories";
import UpdateFlightCategory from "./admin/Flights/UpdateFlightCategory";
import UpdateHotelCategory from "./admin/Hotels/UpdateHotelCategory";

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
                <AdminRoute path={"/admin/create/flight"} exact component={AddFlight}/>
                <AdminRoute path={"/admin/hotels"} exact component={ManageHotels}/>
                <AdminRoute path={"/admin/flights"} exact component={ManageFlights}/>
                <AdminRoute path={"/admin/hotel/update/:hotelId"} exact component={UpdateHotel}/>
                <AdminRoute path={"/admin/flight/update/:flightId"} exact component={UpdateFlight}/>
                <AdminRoute path={"/admin/flight-categories"} exact component={ManageFlightCategories}/>
                <AdminRoute path={"/admin/hotel-categories"} exact component={ManageHotelCategories}/>
                <AdminRoute path={"/admin/flight-category/update/:flightCategoryId"} exact component={UpdateFlightCategory}/>
                <AdminRoute path={"/admin/hotel-category/update/:hotelCategoryId"} exact component={UpdateHotelCategory}/>
                <PrivateRoute path={"/user/dashboard"} exact component={UserDashboard}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
