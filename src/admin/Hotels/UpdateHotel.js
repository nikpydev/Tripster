import React, {useState, useEffect} from 'react';
import Base from "../../core/Base";
import {Link} from "react-router-dom";
import {getAllHotelCategories, getHotel, updateHotel} from "../helper/adminapicalls";
import {isAuthenticated} from "../../auth/helper";

function UpdateHotel({match}) {
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
        error: "",
        createdHotel: "",
        didRedirect: false,
        formData: ""
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

    const preload = productId => {
        getHotel(productId)
            .then(data => {
                console.log("getHotel: ", data)
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        preloadHotelCategories();

                        setValues({
                            ...values,
                            brand: data.brand,
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            category: data.category._id,
                            city: data.city,
                            street_address: data.street_address,
                            total_rooms: data.total_rooms,
                            rooms_available: data.rooms_available,
                            formData: new FormData()
                        })
                        console.log("VALUES: ", values)
                    }
                }
            })
    }

    const preloadHotelCategories = () => {
        getAllHotelCategories()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        setValues({
                            categories: data,
                            formData: new FormData()
                        })
                    }
                }
            })
    }

    useEffect(() => {
        console.log("match.params: ", match.params.hotelId);
        preload(match.params.hotelId)
    }, []);

    const handleChange = key => event => {
        const value = key === "photo" ? event.target.files[0] : event.target.value;
        formData.set(key, value);
        setValues({...values, [key]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        updateHotel(match.params.hotelId, _id, token, formData)
            .then(data => {
                if (!data) {
                    setValues({
                        ...values,
                        createdHotel: "",
                        error: "Couldn't Update"
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
                        error: "",
                        createdHotel: data.name,
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
                style={{display: createdHotel ? "" : "none"}}
            >
                <h4>{createdHotel} updated successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>Couldn't update hotel</h4>
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
                Update Hotel
            </button>
        </form>
    );

    return (
        <Base
            title={"Update a hotel here!"}
            description={"This is the hotel update section"}
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
                    {createHotelForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateHotel;
