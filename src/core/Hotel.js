import React from 'react';
import Base from "./Base";

function Hotel(props) {
    return (
        <Base title={"Hotels Section"} description={"All the hotels will be listed here."}>
            <div className="text-center">
                <h3>Filters of all types will be there in the sidebar section.</h3>
            </div>
        </Base>
    );
}

export default Hotel;