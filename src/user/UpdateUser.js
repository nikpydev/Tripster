import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper";
import {getUser, updateUser} from "./helper/userapicalls";

function UpdateUser() {
    const {user: {_id}, token} = isAuthenticated();

    const [values, setValues] = useState({
        fName: "",
        lName: "",
        email: "",
        photo: "",
        error: "",
        success: false,
        formData: ""
    });

    const {fName, lName, email, photo, error, success, formData} = values;

    // We need to getUser only because simply using isAuthenticated() we'll get the
    // user details saved within the browser and it might not be up to date.
    const preload = () => {
        getUser(_id, token)
            .then(data => {
                console.log("UPDATE USER: ", data);
                if (data) {
                    if (data.error) {
                        setValues({
                            ...values,
                            error: data.error
                        })
                    } else {
                        setValues({
                            ...values,
                            fName: data.fName,
                            lName: data.lName,
                            email: data.email,
                            formData: new FormData()
                        })
                    }
                }
            })
    }

    useEffect(() => {
        preload()
    }, []);

    const handleChange = key => event => {
        const value = key === "photo" ? event.target.files[0] : event.target.value;
        formData.set(key, value);
        setValues({...values, [key]: value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: ""});
        updateUser(_id, token, formData)
            .then(data => {
                console.log("UPDATE USER ATTEMPT: ", data);
                if (data.error) {
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues({
                        ...values,
                        fName: data.fName,
                        lName: data.lName,
                        email: data.email,
                        error: "",
                        success: true
                    })
                }
            })
            .catch(err => {
                console.log("CAUGHT AT FRONTEND: Error In Registration: ", err);
            })
    }

    const registrationForm = () => {
        return (
            <div className={"row"}>
                <div className="col-md-6 offset-sm-3 text-left">
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
                            <label className="text-light">
                                First Name
                            </label>
                            <input
                                className={"form-control"}
                                type="text" onChange={handleChange("fName")}
                                value={fName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Last Name
                            </label>
                            <input
                                className={"form-control"}
                                type="text" onChange={handleChange("lName")}
                                value={lName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input
                                className={"form-control"}
                                type="email"
                                onChange={handleChange("email")}
                                value={email}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block mb-3">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                    >
                        Updated profile successfully. The changes will be reflected once you login again. Go Back
                        to <Link to={isAuthenticated().user.role < 1 ? "/user/dashboard" : "/admin/dashboard"}>Dashboard</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className={"row"}>
                <div className={"col-md-6 offset-sm-3 text-left"}>
                    <div
                        className="alert alert-danger"
                        style={{display: error ? "" : "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base
            title={"Update Profile Here"}
            description={"A page for user to update their profile"}
            className={"container bg-info p-4"}
        >
            <Link
                to={isAuthenticated().user.role < 1 ? "/user/dashboard" : "/admin/dashboard"}
                className={"btn btn-md btn-dark mb-3"}
            >
                {isAuthenticated().user.role < 1 ? "User Dashboard" : "Admin Dashboard"}
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 mt-3">
                    {successMessage()}
                    {errorMessage()}
                    {registrationForm()}
                    {/*<p className="text-white text-center">*/}
                    {/*    {JSON.stringify(values)}*/}
                    {/*</p>*/}
                </div>
            </div>
        </Base>
    );
}

export default UpdateUser;
