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
