import React, {useEffect, useState} from 'react';
import {isAuthenticated} from "../../auth/helper";
import {createHotel, getAllHotelCategories} from "../helper/adminapicalls";
import Base from "../../core/Base";
import {Link} from "react-router-dom";

function AddHotel() {
    const {user: {_id}, token} = isAuthenticated();
    const [values, setValues] = useState({
        brand: "",
        name: "",
        price: "",
        description: "",
        categories: [],
        category: "",
        city: "",
        street_address: "",
        total_rooms: 0,
        rooms_available: 0,
        photo: "",
        loading: false,
        error: undefined,
        createdHotel: undefined,
        didRedirect: false,
        formData: undefined
    });

    const {
        brand,
        name,
        price,
        description,
        categories,
        category,
        city,
        street_address,
        total_rooms,
        rooms_available,
        photo,
        loading,
        error,
        createdHotel,
        didRedirect,
        formData
    } = values;

    const preload = () => {
        getAllHotelCategories()
            .then(data => {
                console.log("getAllHotelCategories: ", data);
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        setValues({...values, categories: data, formData: new FormData()})
                    }
                }
            })
    }

    useEffect(() => {
        preload();
    }, []);

    const handleChange = key => event => {
        const value = key === "photo" ? event.target.files[0] : event.target.value;
        formData.set(key, value);
        setValues({...values, [key]: value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values, error: undefined, loading: true});
        createHotel(_id, token, formData)
            .then(data => {
                if (data) {
                    if (data.error) {
                        setValues({
                            ...values,
                            createdHotel: undefined,
                            error: data.error
                        })
                    } else {
                        setValues({
                            ...values,
                            brand: "",
                            name: "",
                            price: "",
                            description: "",
                            city: "",
                            street_address: "",
                            total_rooms: 0,
                            photo: "",
                            loading: false,
                            error: undefined,
                            createdHotel: data.name,
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
                style={{display: createdHotel ? "" : "none"}}
            >
                <h4>{createdHotel} created successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>Couldn't create hotel: {error}</h4>
            </div>
        )
    }

    const createHotelForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
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
                    onChange={handleChange("city")}
                    className="form-control"
                    placeholder="City"
                    value={city}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("street_address")}
                    className="form-control"
                    placeholder="Street Address"
                    value={street_address}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("total_rooms")}
                    type="number"
                    className="form-control"
                    placeholder="Total Rooms"
                    value={total_rooms}
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
                    onChange={handleChange("rooms_available")}
                    type="number"
                    className="form-control"
                    placeholder="Rooms Available"
                    value={rooms_available}
                />
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-outline-success mb-3"
            >
                Create Hotel
            </button>
        </form>
    );

    return (
        <Base
            title={"Add a hotel here!"}
            description={"This is the hotel creation section"}
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
                    {createHotelForm()}
                </div>
            </div>
        </Base>
    );
}

export default AddHotel;
