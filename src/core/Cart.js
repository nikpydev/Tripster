import React, {useEffect, useState} from 'react';
// import {API} from "../backend";
import Base from "./Base";
import FlightCard from "./Flights/FlightCard";
import HotelCard from "./Hotels/HotelCard";
// import {getAllFlights, getAllHotels} from "./helper/coreapicalls";
import {loadCart} from "./helper/cartHelper";
// import PaymentB from "./PaymentB";

function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
        // console.log("LOAD CART: ", loadCart())
        // console.log("PRODUCTS IN CART: ", products)
        // console.log("PRODUCTS LENGTH: ", products.length)
    }, [reload]);


    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                <hr/>
                {products.map((product, index) => {
                    return (
                        product.source ? (
                            <FlightCard
                                key={index}
                                flight={product}
                                addToCart={false}
                                removeFromCart={true}
                                reload={reload}
                                setReload={setReload}
                            />
                        ) : (
                            <HotelCard
                                key={index}
                                hotel={product}
                                addToCart={false}
                                removeFromCart={true}
                                reload={reload}
                                setReload={setReload}
                            />
                        )
                    )
                })}
            </div>
        )
    }

    // const loadCheckout = () => {
    //     return (
    //         <div>
    //             <h2>This section is for checkout</h2>
    //         </div>
    //     )
    // }

    return (
        <Base title={"Cart Page"} description={"Ready to checkout"}>
            <div className="row text-center">
                <div className="col-9">
                    {
                        (products && products.length > 0) ?
                            loadAllProducts() :
                            (<h3>No Products in your cart</h3>)
                    }
                </div>
                <div className="col-3">
                    <h3>
                        Integrate Payment Gateway here👇
                    </h3>
                    {/*<h2>*/}
                    {/*    <PaymentB*/}
                    {/*        products={products}*/}
                    {/*        reload={reload}*/}
                    {/*        setReload={setReload}*/}
                    {/*    />*/}
                    {/*</h2>*/}
                </div>
            </div>
        </Base>
    );
}

export default Cart;