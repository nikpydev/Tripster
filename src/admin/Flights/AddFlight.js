import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth/helper";
import {createFlight, getAllFlightCategories} from "../helper/adminapicalls";
import Base from "../../core/Base";
import {Link} from "react-router-dom";

import 'rc-time-picker/assets/index.css';
import TimePicker from 'react-time-picker';

// const showSecond = true;
// const str = showSecond ? 'HH:mm:ss' : 'HH:mm';


function AddFlight() {
    const {user: {_id}, token} = isAuthenticated();

    const [values, setValues] = useState({
        brand: "Bhadralok",
        name: "MK-1",
        price: "1200",
        description: "Indian cheap flight",
        categories: [],
        category: "",
        source: "Pune",
        destination: "Kolkata",
        departure_time: "",
        arrival_time: "",
        total_seats_count: "120",
        seats_remaining: "12",
        loading: false,
        error: "",
        createdFlight: "",
        didRedirect: false,
    });

    // const [departureTime, setDepartureTime] = useState("");
    // const [arrivalTime, setArrivalTime] = useState("");

    const {
        brand,
        name,
        price,
        description,
        categories,
        // category,
        source,
        destination,
        departure_time,
        arrival_time,
        total_seats_count,
        seats_remaining,
        // photo,
        // loading,
        error,
        createdFlight,
        // didRedirect,
    } = values;

    const preload = () => {
        getAllFlightCategories()
            .then(data => {
                console.log("getAllFlightCategories: ", data);
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        setValues({
                            ...values,
                            categories: data,
                        })
                    }
                }
            })
    }

    useEffect(() => {
        preload();
    }, []);

    const handleChange = key => event => {
        const value = (
            key === "departure_time" || key === "arrival_time"
        ) ? event : event.target.value;
        setValues({
            ...values,
            [key]: value
        })
    }

    // const handleTimeSet = key => time => {
    //     setValues({
    //         ...values,
    //         [key]: time
    //     })
    // }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});
        createFlight(_id, token, values)
            .then(data => {
                console.log("DATA: ", data)
                if (data) {
                    if (data.error) {
                        setValues({
                            ...values,
                            createdFlight: "",
                            error: data.error
                        })
                    } else {
                        setValues({
                            ...values,
                            brand: "",
                            name: "",
                            price: "",
                            description: "",
                            source: "",
                            destination: "",
                            departure_time: "",
                            arrival_time: "",
                            total_seats_count: "",
                            seats_remaining: "",
                            loading: false,
                            error: "",
                            createdFlight: data.name,
                            didRedirect: false,
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const successMessage = () => {
        return (
            <div
                className="alert alert-success mt-3"
                style={{display: createdFlight ? "" : "none"}}
            >
                <h4>{createdFlight} created successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>Couldn't create flight</h4>
            </div>
        )
    }

    const createFlightForm = () => (
        <form>
            <div className="form-group mt-3">
                <input
                    onChange={handleChange("brand")}
                    name="brand"
                    className="form-control"
                    placeholder="Brand"
                    value={brand}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
            <textarea
                onChange={handleChange("description")}
                name="photo"
                className="form-control"
                placeholder="Description"
                value={description}
            />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("source")}
                    className="form-control"
                    placeholder="Source"
                    value={source}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("destination")}
                    className="form-control"
                    placeholder="Destination"
                    value={destination}
                />
            </div>
            <div className="form-group">
                <p>Set Departure Time</p>
                <TimePicker
                    onChange={handleChange("departure_time")}
                    value={departure_time}
                    format={"HH:mm"}
                    minTime={"00:00:00"}
                    maxTime={"23:59:59"}
                    hourPlaceholder={"HH"}
                    minutePlaceholder={"mm"}
                    clockIcon={null}
                    disableClock={true}
                />
            </div>
            <div className="form-group">
                <p>Set Arrival Time</p>
                <TimePicker
                    onChange={handleChange("arrival_time")}
                    value={arrival_time}
                    format={"HH:mm"}
                    minTime={"00:00:00"}
                    maxTime={"23:59:59"}
                    hourPlaceholder={"HH"}
                    minutePlaceholder={"mm"}
                    clockIcon={null}
                    disableClock={true}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("total_seats_count")}
                    type="number"
                    className="form-control"
                    placeholder="Total Seats Count"
                    value={total_seats_count}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories && categories.map((category, index) => {
                        const {_id} = category;
                        return (
                            <option key={index} value={_id}>
                                {category.name}
                            </option>
                        )
                    })}

                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("seats_remaining")}
                    type="number"
                    className="form-control"
                    placeholder="Seats Remaining"
                    value={seats_remaining}
                />
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-outline-success mb-3"
            >
                Create Flight
            </button>
        </form>
    );

    return (
        <Base
            title={"Add a flight here!"}
            description={"This is the flight creation section"}
            className={"container bg-info p-4"}
        >
            <Link
                to={"/admin/dashboard"}
                className={"btn btn-md btn-dark mb-3"}
            >
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createFlightForm()}
                    {/*Error:*/}
                    {/*{JSON.stringify(values.error)}*/}
                    {/*Departure Time:*/}
                    {/*{JSON.stringify(values.departure_time)}*/}
                    {/*Arrival Time:*/}
                    {/*{JSON.stringify(values.arrival_time)}*/}
                </div>
            </div>
        </Base>
    );
}

export default AddFlight;
