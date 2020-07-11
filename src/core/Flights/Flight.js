import React, {useEffect, useState} from 'react';
import Base from "../Base";
import {getAllFlights} from "../helper/coreapicalls";
import FlightCard from "./FlightCard";

function Flight() {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(undefined);

    const loadAllFlights = () => {
        getAllFlights()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setFlights(data)
                    }
                }
            })
    }

    useEffect(() => {
        loadAllFlights()
    }, []);

    const handleChange = key => event => {
        const value = event.target.value;
        if (key === "source") {
            setSource(value);
        } else if (key === "destination") {
            setDestination(value);
        }
    }

    const userSelectionForm = () => (
        <form>
            <div className="form-group mt-3">
                <input
                    onChange={handleChange("source")}
                    name={"source"}
                    className={"form-control"}
                    placeholder={"Source"}
                    value={source}
                />
            </div>

            <div className="form-group mt-3">
                <input
                    onChange={handleChange("destination")}
                    name={"destination"}
                    className={"form-control"}
                    placeholder={"Destination"}
                    value={destination}
                />
            </div>
        </form>
    )

    return (
        <Base title={"Flights Section"} description={"All the flights will be listed here."}>
            <div className="flight-container row">
                <div className="sidebar col-2">
                    <hr/>
                    <h5 className="text-center">
                        APPLY FILTERS
                    </h5>
                    <hr/>
                    <h5 className={"text-center"}>
                        Filter by Timings
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
                                    Early Morning
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
                                    Afternoon
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
                                    Evening
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
                                    Night
                                </span>
                            </label>
                        </p>
                    </form>
                    <hr/>
                </div>

                <div className="flight-content col-10">
                    {error}
                    {userSelectionForm()}
                    <hr style={{"backgroundColor": "white"}}/>

                    {flights.map((flight, index) => {
                        if (source && destination && flight.source === source && flight.destination === destination) {
                            // console.log("Inside 1st if block")
                            return (
                                <div className="mb-4" key={index}>
                                    <FlightCard flight={flight}/>
                                </div>
                            )
                        } else if (!destination && source && flight.source === source) {
                            // console.log("Inside 2nd if block")
                            return (
                                <div className="mb-4" key={index}>
                                    <FlightCard flight={flight}/>
                                </div>
                            )
                        } else if (!source && destination && flight.destination === destination) {
                            // console.log("Inside 3rd if block")
                            return (
                                <div className="mb-4" key={index}>
                                    <FlightCard flight={flight}/>
                                </div>
                            )
                        } else if (!source && !destination) {
                            // console.log("Inside else block")
                            return (
                                <div className="mb-4" key={index}>
                                    <FlightCard flight={flight}/>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Flight;
