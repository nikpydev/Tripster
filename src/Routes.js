import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import UpdateUser from "./user/UpdateUser";
import ManageOrders from "./user/ManageOrders";
import ViewAllOrders from "./admin/ViewAllOrders";
import ViewAllUsers from "./admin/ViewAllUsers";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/Tripster"} exact component={Home} />
        <Route path={"/Tripster/flights"} exact component={Flight} />
        <Route path={"/Tripster/hotels"} exact component={Hotel} />
        <Route path={"/Tripster/register"} exact component={Register} />
        <Route path={"/Tripster/login"} exact component={Login} />
        <Route path={"/Tripster/cart"} exact component={Cart} />
        <AdminRoute
          path={"/Tripster/admin/dashboard"}
          exact
          component={AdminDashboard}
        />
        <AdminRoute
          path={"/Tripster/admin/create/flight-category"}
          exact
          component={AddFlightCategory}
        />
        <AdminRoute
          path={"/Tripster/admin/create/hotel-category"}
          exact
          component={AddHotelCategory}
        />
        <AdminRoute path={"/Tripster/admin/create/hotel"} exact component={AddHotel} />
        <AdminRoute path={"/Tripster/admin/create/flight"} exact component={AddFlight} />
        <AdminRoute path={"/Tripster/admin/hotels"} exact component={ManageHotels} />
        <AdminRoute path={"/Tripster/admin/flights"} exact component={ManageFlights} />
        <AdminRoute
          path={"/Tripster/admin/hotel/update/:hotelId"}
          exact
          component={UpdateHotel}
        />
        <AdminRoute
          path={"/Tripster/admin/flight/update/:flightId"}
          exact
          component={UpdateFlight}
        />
        <AdminRoute
          path={"/Tripster/admin/flight-categories"}
          exact
          component={ManageFlightCategories}
        />
        <AdminRoute
          path={"/Tripster/admin/hotel-categories"}
          exact
          component={ManageHotelCategories}
        />
        <AdminRoute
          path={"/Tripster/admin/flight-category/update/:flightCategoryId"}
          exact
          component={UpdateFlightCategory}
        />
        <AdminRoute
          path={"/Tripster/admin/hotel-category/update/:hotelCategoryId"}
          exact
          component={UpdateHotelCategory}
        />
        <AdminRoute path={"/Tripster/admin/orders"} exact component={ViewAllOrders} />
        <PrivateRoute
          path={"/Tripster/user/dashboard"}
          exact
          component={UserDashboard}
        />
        <AdminRoute path={"/Tripster/admin/users/all"} exact component={ViewAllUsers} />
        <PrivateRoute
          path={"/Tripster/user/update/profile"}
          exact
          component={UpdateUser}
        />
        <PrivateRoute path={"/Tripster/user/orders"} exact component={ManageOrders} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
