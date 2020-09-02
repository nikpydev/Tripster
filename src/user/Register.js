import React, {useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {register} from "../auth/helper";

function Register() {
    const [values, setValues] = useState({
        fName: "",
        lName: "",
        email: "",
        photo: "",
        password: "",
        error: "",
        success: false,
        formData: new FormData()
    });

    const {fName, lName, email, photo, password, error, success, formData} = values;

    const handleChange = key => event => {
        const value = key === "photo" ? event.target.files[0] : event.target.value;
        formData.set(key, value);
        setValues({...values, [key]: value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: undefined});
        register(formData)
            .then(data => {
                console.log("REGISTER USER ATTEMPT: ", data);
                if (data.error) {
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues({
                        ...values,
                        fName: "",
                        lName: "",
                        email: "",
                        password: "",
                        error: undefined,
                        success:true
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
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input
                                className={"form-control"}
                                type="password"
                                onChange={handleChange("password")}
                                value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Register
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
                        Registration successful. Please <Link to={"/Tripster/login"}>Login Here</Link>
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
                        {error ? "All fields are required" : ""}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title={"Registration Page"} description={"A page for user to register!"}>
            {successMessage()}
            {errorMessage()}
            {registrationForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    );
}

export default Register;
