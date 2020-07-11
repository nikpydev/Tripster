import React, {useState, useEffect} from 'react';
import Base from "../Base";
import {getAllHotelCities, getAllHotels} from "../helper/coreapicalls";
import HotelCard from "./HotelCard";

function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(undefined);

    // Populate all unique cities for filtering by city.
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const loadAllHotels = () => {
        getAllHotels()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setHotels(data)
                    }
                }
            })
    }

    const preloadHotelCities = () => {
        getAllHotelCities()
            .then(data => {
                // console.log("getAllHotelCities: ", data);
                if (data) {
                    if (data.error) {
                        console.log("ERROR: ", data.error)
                    } else {
                        setCities(data)
                    }
                }
            })
    }

    useEffect(() => {
        loadAllHotels()
        preloadHotelCities();
    }, []);

    const handleChange = event => {
        setSelectedCity(event.target.value);
        localStorage.setItem("selectedCity", event.target.value);
    }

    return (
        <Base title={"Hotels Section"} description={"All the hotels will be listed here."}>
            <div className="hotel-container row">
                <div className="sidebar col-2">
                    <hr/>
                    <h5 className="text-center">
                        APPLY FILTERS
                    </h5>
                    <hr/>
                    <h5 className={"text-center"}>
                        Filter by Price
                        <button
                            className={"btn btn-block btn-outline-danger mt-2"}
                        >
                            Clear Filter
                        </button>
                    </h5>
                    <hr/>
                    <form action="#">
                        <p>
                            <label>
                                <input className="with-gap" name="group1" type="radio"/>
                                <span
                                    style={{"paddingLeft": "1rem"}}
                                    className={"text-white"}
                                >
                                    Below ₹ 5,000
                                </span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" name="group1" type="radio"/>
                                <span
                                    style={{"paddingLeft": "1rem"}}
                                    className={"text-white"}
                                >
                                    ₹ 5,000 - ₹ 10,000
                                </span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" name="group1" type="radio"/>
                                <span
                                    style={{"paddingLeft": "1rem"}}
                                    className={"text-white"}
                                >
                                    ₹ 10,000 - ₹ 20,000
                                </span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" name="group1" type="radio"/>
                                <span
                                    style={{"paddingLeft": "1rem"}}
                                    className={"text-white"}
                                >
                                    Above ₹ 20,000</span>
                            </label>
                        </p>
                    </form>

                    <hr/>
                    <h5 className={"text-center"}>
                        Select City
                        <button
                            className={"btn btn-block btn-outline-danger mt-2"}
                            onClick={() => {
                                setSelectedCity("")
                            }}
                        >
                            Clear Filter
                        </button>
                    </h5>
                    <hr/>
                    <form>
                        <div className="form-group">
                            <select
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Category"
                            >
                                <option>Select</option>
                                {cities && cities.map((city, index) => {
                                    return (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    )
                                })}

                            </select>
                        </div>
                    </form>
                    <hr/>
                </div>

                <div className="hotel-content col-10">
                    <hr style={{"backgroundColor": "white"}}/>
                    {hotels.map((hotel, index) => {
                        if (selectedCity) {
                            console.log("inside if block");
                            if (hotel.city === selectedCity) {
                                return (
                                    <div className="mb-4" key={index}>
                                        <HotelCard hotel={hotel}/>
                                    </div>
                                )
                            }
                        } else {
                            console.log("inside else block");
                            return (
                                <div className="mb-4" key={index}>
                                    <HotelCard hotel={hotel}/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Hotel;
