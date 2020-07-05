import React, {useState} from 'react';
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom";
import {addItemToCart, removeItemFromCart} from "./helper/cartHelper";

function HotelCard({
                       hotel,
                       addToCart = true,
                       removeFromCart = false,
                       reload,
                       setReload
                   }) {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(hotel ? hotel.count : 0);

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
                    onClick={addHotelToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add To Cart
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
                    Remove From Cart
                </button>
            )
        )
    }

    return (
        <div className="card-container-parent">
            <div className={"card-container"}>
                <div className="card-container__image-column">
                    <div className="card-container__image-box">
                        <ImageHelper hotel={hotel ? hotel : undefined}/>
                    </div>

                    <div className="card-container__product-name">
                        {cardTitle1} {cardTitle2}
                    </div>
                </div>

                <p className="card-container__product-description">
                    {cardDescription}
                </p>

                <p className="card-container__product-price">
                    $ {cardPrice}
                </p>

                <div className="card-container__add-or-remove-item">
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

export default HotelCard;