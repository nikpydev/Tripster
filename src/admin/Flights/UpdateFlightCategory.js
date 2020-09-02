import React, {useEffect, useState} from 'react';
import Base from "../../core/Base";
import {isAuthenticated} from "../../auth/helper";
import {Link} from "react-router-dom";
import {getFlightCategory, updateFlightCategory} from "../helper/adminapicalls";

function UpdateFlightCategory({match}) {
    const [flightCategoryName, setFlightCategoryName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const {user: {_id}, token} = isAuthenticated()

    const preload = (flightCategoryId) => {
        getFlightCategory(flightCategoryId)
            .then(data => {
                setFlightCategoryName(data.name)
            })
    }

    useEffect(() => {
        preload(match.params.flightCategoryId)
    }, []);


    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to={"/Tripster/admin/dashboard"} className={"btn btn-sm btn-success mb-3"}>
                    Admin Home
                </Link>
            </div>
        )
    }

    const handleChange = (event) => {
        setError("")
        setFlightCategoryName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        // Backend request firing
        updateFlightCategory(match.params.flightCategoryId, _id, token, {name: flightCategoryName})
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("")
                    setSuccess(true)
                    setFlightCategoryName("")
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
                    {`Failed to update flight category: ${error}`}
                </h4>
            )
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">
                        Enter a name for your flight category.
                    </p>
                    <input
                        type="text"
                        className={"form-control my-3"}
                        onChange={handleChange}
                        value={flightCategoryName}
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
            title={"Update a flight category here"}
            description={"Update an existing flight category"}
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

export default UpdateFlightCategory;