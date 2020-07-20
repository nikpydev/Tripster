import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllUsers } from "./helper/adminapicalls";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const preload = () => {
    getAllUsers(userId, token).then((data) => {
      if (data) {
        if (data.error) {
          console.log("getAllUsers ERROR: ", data.error);
        } else {
          setUsers(data);
        }
      }
    });
  };

  useEffect(() => {
    preload();
  });

  return (
    <Base
      title={"View All Users"}
      description={"The Admin can view all users registered for this app."}
    >
      <h1 className="text-center">List of all app users</h1>
      <hr />

      {users.map((user, index) => {
        const { _id, fName, lName, role } = user;
        return (
          <div className="text-center" key={index}>
            <p>First Name: {fName}</p>
            <p>Last Name: {lName}</p>
            <p>User ID: {_id}</p>
            <p>
              Admin Priviledges:{" "}
              <span
                className={
                  role === 1 ? "badge badge-success" : "badge badge-danger"
                }
              >
                {role === 1 ? "GRANTED" : "DENIED"}
              </span>
            </p>
            <hr />
          </div>
        );
      })}
    </Base>
  );
};

export default ViewAllUsers;
