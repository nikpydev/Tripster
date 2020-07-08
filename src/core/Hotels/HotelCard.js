import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ImageHelper from "../helper/ImageHelper";
import {Redirect} from "react-router-dom";
import {addItemToCart, removeItemFromCart} from "../helper/cartHelper";

function HotelCard({
                       hotel,
                       addToCart = true,
                       removeFromCart = false,
                       reload,
                       setReload
                   }) {
    // For showing or hiding the "book now" section
    const [showBookNow, setShowBookNow] = useState(false);

    const [redirect, setRedirect] = useState(false);
    // const [count, setCount] = useState(hotel ? hotel.count : 0);

    // Stay Dates
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const cardTitle1 = hotel ? hotel.brand : undefined;
    const cardTitle2 = hotel ? hotel.name : undefined;
    const cardDescription = hotel ? hotel.description : undefined;
    const cardPrice = hotel ? hotel.price : undefined;

    const addHotelToCart = () => {
        addItemToCart(hotel, () => {
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
                        removeItemFromCart(hotel._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Delete
                </button>
            )
        )
    }

    const handleChange = key => date => {
        if (key === "checkInDate") {
            setCheckInDate(date);
        } else if (key === "checkOutDate") {
            setCheckOutDate(date);
        }
    }

    return (
        <div className="hotel-card-container-parent">
            <div className={"hotel-card-container"}>
                <div className="hotel-card-container__image-column">
                    <div className="hotel-card-container__image-box">
                        <ImageHelper hotel={hotel ? hotel : undefined}/>
                    </div>

                    <div className="hotel-card-container__product-name">
                        {cardTitle1} {cardTitle2}
                    </div>
                </div>

                <p className="hotel-card-container__product-description">
                    {cardDescription}
                </p>

                <p className="hotel-card-container__product-price">
                    ₹ {cardPrice}
                </p>

                <div className="hotel-card-container__add-or-remove-item">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>

                {showBookNow && (
                    <div className="booking-section">
                        <div className="select-dates">
                            <div className="checkin-date">
                                <h4>
                                    Select check-in date
                                </h4>
                                <DatePicker
                                    selected={checkInDate}
                                    onChange={handleChange("checkInDate")}
                                    showTimeSelect
                                    dateFormat={"Pp"}
                                />
                            </div>

                            <div className="checkout-date">
                                <h4>
                                    Select check-out date
                                </h4>
                                <DatePicker
                                    selected={checkOutDate}
                                    onChange={handleChange("checkOutDate")}
                                    showTimeSelect
                                    dateFormat={"Pp"}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowBookNow(!showBookNow);
                                hotel.checkin_datetime = checkInDate;
                                hotel.checkout_datetime = checkOutDate;
                                addHotelToCart();
                            }}
                            className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                            Add Hotel to Cart
                        </button>
                    </div>
                )}

            </div>
            <hr/>
        </div>
    );
}

export default HotelCard;
