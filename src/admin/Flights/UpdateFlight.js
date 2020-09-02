import React, {useState, useEffect} from 'react';
import Base from "../../core/Base";
import {Link} from "react-router-dom";
import {getAllFlightCategories, getFlight, updateFlight} from "../helper/adminapicalls";
import {isAuthenticated} from "../../auth/helper";

function UpdateFlight({match}) {
    const {user: {_id}, token} = isAuthenticated();

    const [values, setValues] = useState({
        brand: "",
        name: "",
        price: "",
        description: "",
        categories: [],
        category: "",
        source: "",
        destination: "",
        total_seats_count: "",
        seats_remaining: "",
        loading: false,
        error: "",
        createdFlight: "",
        didRedirect: false,
    });

    const {
        brand,
        name,
        price,
        description,
        categories,
        category,
        source,
        destination,
        total_seats_count,
        seats_remaining,
        photo,
        loading,
        error,
        createdFlight,
        didRedirect,
    } = values;

    const preload = productId => {
        getFlight(productId)
            .then(data => {
                // console.log("getFlight: ", data)
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        preloadFlightCategories();

                        setValues({
                            ...values,
                            brand: data.brand,
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            source: data.source,
                            destination: data.destination,
                            total_seats_count: data.total_seats_count,
                            seats_remaining: data.seats_remaining,
                            loading: false,
                            error: "",
                            createdFlight: data.name,
                            didRedirect: false,
                        })
                        // console.log("VALUES: ", values)
                    }
                }
            })
    }

    const preloadFlightCategories = () => {
        getAllFlightCategories()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        setValues({
                            categories: data,
                        })
                    }
                }
            })
    }

    useEffect(() => {
        // console.log("match.params: ", match.params.flightId);
        preload(match.params.flightId)
    }, []);

    const handleChange = key => event => {
        const value = event.target.value;
        // formData.set(key, value);
        setValues({
            ...values,
            [key]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values, error: undefined, loading: true});

        updateFlight(match.params.flightId, _id, token, values)
            .then(data => {
                if (!data) {
                    setValues({
                        ...values,
                        createdFlight: undefined,
                        error: "Couldn't Update"
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
                        total_seats_count: "",
                        seats_remaining: "",
                        loading: false,
                        error: "",
                        createdFlight: data.name,
                        didRedirect: false,
                    })
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
                <h4>{createdFlight} updated successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>Couldn't update flight</h4>
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
                        return (
                            <option key={index} value={category._id}>
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
            title={"Update a flight here!"}
            description={"This is the flight update section"}
            className={"container bg-info p-4"}
        >
            <Link
                to={"/Tripster/admin/dashboard"}
                className={"btn btn-md btn-dark mb-3"}
            >
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createFlightForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateFlight;
