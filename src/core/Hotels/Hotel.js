import React, {useState, useEffect} from 'react';
import Base from "../Base";
import {getAllHotels} from "../helper/coreapicalls";
import HotelCard from "./HotelCard";

function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(undefined);

    const loadAllHotels = () => {
        getAllHotels()
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setHotels(data)
                    }
                }
            })
    }

    useEffect(() => {
        loadAllHotels()
    }, []);


    return (
        <Base title={"Hotels Section"} description={"All the hotels will be listed here."}>
            <div className="hotel-container row">
                <div className="sidebar col-2">
                    Filters Section
                </div>

                <div className="hotel-content col-10">
                    <hr style={{"backgroundColor": "white"}}/>

                    {hotels.map((hotel, index) => {
                        return (
                            <div className="mb-4" key={index}>
                                <HotelCard hotel={hotel}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Hotel;