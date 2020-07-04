import React from 'react';
import Base from "./Base";
import {Link, withRouter} from "react-router-dom";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ECC72"}
    } else {
        return {color: "#FFFFFF"}
    }
}

function Home({history}) {
    return (
        <Base title={"Home Page"} description={"Landing Page"}>
            <h2 className="text-center">
                Something about the web app, announcements, offers, etc., will be mentioned here.
            </h2>
        </Base>
    );
}

export default Home;