import React from 'react';
import Base from "./Base";

function Flight(props) {
    return (
        <Base title={"Flights Section"} description={"All the flights will be listed here."}>
            <div className="text-center">
                <h3>Source and destination selection will also be here.</h3>
            </div>
        </Base>
    );
}

export default Flight;