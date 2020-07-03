import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Base from "./core/Base";

function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Base}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;