import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./user/Login";
import Hotel from "./core/Hotel";
import Flight from "./core/Flight";

function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/flights"} exact component={Flight}/>
                <Route path={"/hotels"} exact component={Hotel}/>
                <Route path={"/register"} exact component={Register}/>
                <Route path={"/login"} exact component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;