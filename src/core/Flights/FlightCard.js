import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

    // Dates to be selected
    const [startDate, setStartDate] = useState(new Date());

    // const [count, setCount] = useState(flight ? flight.count : 0);
    
    // For showing or hiding the "book now" section
    const [showBookNow, setShowBookNow] = useState(false);

    const cardTitle1 = flight ? flight.brand : "";
    const cardTitle2 = flight ? flight.name : "";
    const cardSource = flight ? flight.source : "";
    const cardDestination = flight ? flight.destination : "";
    const cardPrice = flight ? flight.price : "";

    // console.log("FLIGHT: ", flight)
    // const {_id} = flight;

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
                    onClick={() => {
                        setShowBookNow(!showBookNow)
                    }}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    {showBookNow ? "Collapse" : "Book Now"}
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
                    Delete
                </button>
            )
        )
    }

    const handleChange = date => {
        setStartDate(date);
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

                {showBookNow && (
                    <div className="select-travel-date">
                        <h4>
                            Select travel date
                        </h4>
                        <DatePicker
                            selected={startDate}
                            onChange={handleChange}
                        />
                        <button
                            onClick={addFlightToCart}
                            className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                            Add Flight to Cart
                        </button>
                    </div>
                )}

            </div>
            <hr/>
        </div>
    );
}

export default FlightCard;
