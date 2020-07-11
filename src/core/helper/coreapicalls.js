import {API} from "../../backend";

export const getAllHotels = () => {
    return fetch(`${API}/hotels`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("getAllHotels() Error: ", err);
        })
}

export const getAllFlights = () => {
    return fetch(`${API}/flights`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("getAllFlights() Error: ", err);
        })
}

export const getAllHotelCities = () => {
    return fetch(`${API}/hotels/cities`)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}
