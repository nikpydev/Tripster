import {API} from "../../backend";

//////////////////////////////////////////////////////////////
//////// USER CALLS
export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("ERROR: ", err)
        })
}

export const updateUser = (userId, token, userDetails) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: userDetails
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("ERROR: ", err)
        })
}
