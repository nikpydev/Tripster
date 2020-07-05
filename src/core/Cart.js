import React from 'react';
import Base from "./Base";

function Cart(props) {
    return (
        <Base title={"Cart Section"} description={"Products in Cart and payment section"}>
            <div className="row text-center">
                <div className="col-9">
                    Products in Cart go here
                </div>
                <div className="col-3">
                    Pay Here
                </div>
            </div>
        </Base>
    );
}

export default Cart;