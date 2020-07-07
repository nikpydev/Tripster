import {API} from "../../backend";

/////////////////////////////////////////////////////////////////////
/////////// FLIGHT CATEGORY CALLS
// Create a Flight Category:-
export const createFlightCategory = (userId, token, categoryName) => {
    return fetch(`${API}/flight-category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// Get a Flight Category:-
export const getFlightCategory = categoryId => {
    return fetch(`${API}/flight-category/${categoryId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

// Get all Flight Categories:-
export const getAllFlightCategories = () => {
    return fetch(`${API}/flight-categories`)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// Update a Flight Category:-
export const updateFlightCategory = (categoryId, userId, token, categoryName) => {
    return fetch(`${API}/flight-category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

// Delete a Flight Category:-
export const deleteFlightCategory = (categoryId, userId, token) => {
    return fetch(`${API}/flight-category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

/////////////////////////////////////////////////////////////////////
/////////// HOTEL CATEGORY CALLS
// Create a Hotel Category:-
export const createHotelCategory = (userId, token, categoryName) => {
    return fetch(`${API}/hotel-category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// Get a Hotel Category:-
export const getHotelCategory = categoryId => {
    return fetch(`${API}/hotel-category/${categoryId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

// Get all Hotel Categories:-
export const getAllHotelCategories = () => {
    return fetch(`${API}/hotel-categories`)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

// Update a Hotel Category:-
export const updateHotelCategory = (categoryId, userId, token, categoryName) => {
    return fetch(`${API}/hotel-category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

// Delete a Hotel Category:-
export const deleteHotelCategory = (categoryId, userId, token) => {
    return fetch(`${API}/hotel-category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

/////////////////////////////////////////////////////////////////////
/////////// FLIGHT CALLS
// Create a Flight
export const createFlight = (userId, token, productDetails) => {
    return fetch(`${API}/flight/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productDetails)
        // body: productDetails
    })
        .then(response => {
            console.log("RESPONSE: ", response)
            return response.json()
        })
        .catch(err => {
            console.log("ERROR: ", err.toString())
        })
}

// Get all Flights
export const getAllFlights = () => {
    return fetch(`${API}/flights`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

// Get a Flight
export const getFlight = (productId) => {
    return fetch(`${API}/flight/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

// Update a Flight
export const updateFlight = (productId, userId, token, productDetails) => {
    return fetch(`${API}/flight/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productDetails)
    })
        .then(response => {
            console.log("Admin API call", response)
            return response.json()
        })
        .catch(err => {
            console.log("Admin API call", err)
        })
}

// Delete a Flight
export const deleteFlight = (productId, userId, token) => {
    return fetch(`${API}/flight/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

/////////////////////////////////////////////////////////////////////
/////////// HOTEL CALLS
// Create a Hotel
export const createHotel = (userId, token, productDetails) => {
    return fetch(`${API}/hotel/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: productDetails
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

// Get all Hotels
export const getAllHotels = () => {
    return fetch(`${API}/hotels`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

// Get a Hotel
export const getHotel = (productId) => {
    return fetch(`${API}/hotel/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

// Update a Hotel
export const updateHotel = (productId, userId, token, productDetails) => {
    return fetch(`${API}/hotel/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: productDetails
    })
        .then(response => {
            console.log("Admin API call", response)
            return response.json()
        })
        .catch(err => {
            console.log("Admin API call", err)
        })
}

// Delete a Hotel
export const deleteHotel = (productId, userId, token) => {
    return fetch(`${API}/hotel/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
