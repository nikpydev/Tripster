import React, {useState} from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import {createHotelCategory} from "./helper/adminapicalls";

function AddHotelCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(false);

    const {user: {_id}, token} = isAuthenticated()

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to={"/admin/dashboard"} className={"btn btn-sm btn-success mb-3"}>
                    Admin Home
                </Link>
            </div>
        )
    }

    const handleChange = event => {
        setError(undefined);
        setCategoryName(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setError(undefined);
        setSuccess(false);

        // Backend request firing
        createHotelCategory(_id, token, {name: categoryName})
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setError(undefined);
                        setSuccess(true);
                        setCategoryName("");
                    }
                }
            })
    }

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success">
                    Category created successfully
                </h4>
            )
        }
    }

    const warningMessage = () => {
        if (error) {
            return (
                <h4 className={"text-warning"}>
                    {`Failed to create category: ${error}`}
                </h4>
            )
        }
    }

    const myHotelCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">
                        Enter the name of your Hotel Category.
                    </p>
                    <input
                        type="text"
                        className={"form-control my-3"}
                        onChange={handleChange}
                        value={categoryName}
                        autoFocus
                        required
                        placeholder={"For e.g. 5-Star"}
                    />
                    <button
                        className="btn btn-outline-info"
                        onClick={handleSubmit}
                    >
                        Create Hotel Category
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Base
            title={"Create a category here"}
            description={"Add a new Hotel category"}
            className={"container bg-info p-4"}
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myHotelCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default AddHotelCategory;