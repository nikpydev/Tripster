import React, {useEffect, useState} from 'react';
import Base from "../../core/Base";
import {isAuthenticated} from "../../auth/helper";
import {Link} from "react-router-dom";
import {getHotelCategory, updateHotelCategory} from "../helper/adminapicalls";

function UpdateHotelCategory({match}) {
    const [hotelCategoryName, setHotelCategoryName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const {user: {_id}, token} = isAuthenticated()

    const preload = (hotelCategoryId) => {
        getHotelCategory(hotelCategoryId)
            .then(data => {
                setHotelCategoryName(data.name)
            })
    }

    useEffect(() => {
        preload(match.params.hotelCategoryId)
    }, []);


    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to={"/admin/dashboard"} className={"btn btn-sm btn-success mb-3"}>
                    Admin Home
                </Link>
            </div>
        )
    }

    const handleChange = (event) => {
        setError("")
        setHotelCategoryName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        // Backend request firing
        updateHotelCategory(match.params.hotelCategoryId, _id, token, {name: hotelCategoryName})
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("")
                    setSuccess(true)
                    setHotelCategoryName("")
                }
            })
    }

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success">
                    Category updated successfully
                </h4>
            )
        }
    }

    const warningMessage = () => {
        if (error) {
            return (
                <h4 className={"text-warning"}>
                    {`Failed to update hotel category: ${error}`}
                </h4>
            )
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">
                        Enter a name for your hotel category.
                    </p>
                    <input
                        type="text"
                        className={"form-control my-3"}
                        onChange={handleChange}
                        value={hotelCategoryName}
                        autoFocus
                        required
                        placeholder={"For e.g. Summer"}
                    />
                    <button
                        className="btn btn-outline-info"
                        onClick={handleSubmit}
                    >
                        Update Category
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Base
            title={"Update a hotel category here"}
            description={"Update an existing hotel category"}
            className={"container bg-info p-4"}
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateHotelCategory;
