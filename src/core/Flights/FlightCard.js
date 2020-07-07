import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {addItemToCart, removeItemFromCart} from "../helper/cartHelper";

function FlightCard({
                        flight,
                        addToCart = true,
                        removeFromCart = false,
                        reload,
                        setReload
                    }) {
    const [redirect, setRedirect] = useState(false);
    // const [count, setCount] = useState(flight ? flight.count : 0);

    const cardTitle1 = flight ? flight.brand : "";
    const cardTitle2 = flight ? flight.name : "";
    const cardSource = flight ? flight.source : "";
    const cardDestination = flight ? flight.destination : "";
    const cardPrice = flight ? flight.price : "";

    const addFlightToCart = () => {
        addItemToCart(flight, () => {
            setRedirect(true);
        })
    }

    const getRedirected = redirect => {
        if (redirect) {
            return <Redirect to={"/cart"}/>
        }
    }

    const showAddToCart = addToCart => {
        return (
            addToCart && (
                <button
                    onClick={addFlightToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Book Now
                </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(flight._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove From Cart
                </button>
            )
        )
    }

    return (
        <div className="flight-card-container-parent">
            <div className={"flight-card-container"}>
                <div className="flight-card-container__product-name">
                    {cardTitle1} {cardTitle2}
                </div>

                <div className="flight-card-container__source">
                    {cardSource}
                </div>

                <div className="to-text">
                    to
                </div>

                <div className="flight-card-container__destination">
                    {cardDestination}
                </div>

                <div className="flight-card-container__product-price">
                    ₹ {cardPrice}
                </div>

                <div className="flight-card-container__add-or-remove-item">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>

            </div>
            <hr/>
        </div>
    );
}

export default FlightCard;
