import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {Redirect} from "react-router-dom";
import {addItemToCart, removeItemFromCart} from "../helper/cartHelper";

function FlightCard({
                        flight,
                        addToCart = true,
                        removeFromCart = false,
                        reload,
                        setReload
                    }) {
    const [redirect, setRedirect] = useState(false);

    // Journey Date
    const [startDate, setStartDate] = useState(new Date());

    // Number of Seats
    const [seatCount, setSeatCount] = useState(0);

    // const [count, setCount] = useState(flight ? flight.count : 0);

    // For showing or hiding the "book now" section
    const [showBookNow, setShowBookNow] = useState(false);

    const cardTitle1 = flight ? flight.brand : "";
    const cardTitle2 = flight ? flight.name : "";
    const cardSource = flight ? flight.source : "";
    const cardDeparture = flight ? flight.departure_time : "";
    const cardDestination = flight ? flight.destination : "";
    const cardArrival = flight ? flight.arrival_time : "";
    const cardPrice = flight ? flight.price : "";

    // console.log("FLIGHT: ", flight)
    // const {_id} = flight;

    const addFlightToCart = () => {
        addItemToCart(flight, () => {
            setRedirect(true);
        })
    }

    // const getRedirected = redirect => {
    //     if (redirect) {
    //         return <Redirect to={"/cart"}/>
    //     }
    // }

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

    const handleDateChange = date => {
        setStartDate(date)
    }

    const handleSeatCountChange = event => {
        setSeatCount(event.target.value);
    }

    const getDay = dayNumber => {
        switch (dayNumber) {
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                return "Sunday"
        }
    }

    return (
        <div className="flight-card-container-parent">
            <div className={"flight-card-container"}>
                <div className="flight-card-container__product-name">
                    ✈ {cardTitle1} {cardTitle2}
                </div>

                <div className="flight-card-container__source">
                    <div>{cardDeparture}</div>
                    {cardSource}
                </div>

                <div className="to-text">
                    to
                </div>

                <div className="flight-card-container__destination">
                    <div>{cardArrival}</div>
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
                    <div className="select-travel-details">
                        <div className="select-travel-date">
                            <h4>
                                Select travel date
                            </h4>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                dateFormat={"dd/MM/yyyy"}
                            />
                        </div>
                        <div className="select-seat-count">
                            <h4>
                                Select no. of seats
                            </h4>
                            <input
                                onChange={handleSeatCountChange}
                                className="form-control"
                                placeholder="Enter seat count"
                                value={seatCount}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setShowBookNow(!showBookNow);
                                flight.travel_date =
                                    startDate.getDate()
                                    + "/" + startDate.getMonth()
                                    + "/" + startDate.getFullYear()
                                    + " on " + getDay(startDate.getDay());
                                flight.seats_booked = seatCount;
                                addFlightToCart();
                            }}
                            className="submit-booking btn btn-block btn-outline-success mt-2 mb-2"
                        >
                            Add Flight to Cart
                        </button>
                    </div>
                )}

                {removeFromCart && (
                    <div className="travel-details">
                        <div className="travel-date">
                            📅 DATE OF TRAVEL:→ {flight.travel_date}
                        </div>
                        <div className="seats-booked">
                            💺 NO. OF SEATS BOOKED:→ {flight.seats_booked}
                        </div>
                    </div>
                )}

            </div>
            <hr/>
        </div>
    );
}

export default FlightCard;
