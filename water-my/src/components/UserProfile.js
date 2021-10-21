import React, {useEffect, useState} from "react";
import "./UserProfile.css";
import react from "react";
import axiosWithAuth from "./axiosWithAuth";
import {Link} from "react-router-dom";

const initial_values = {
    username: "",
    phonenumber: "",
    password: ""
}

export default function UserProfile() {
    const [user, set_user] = useState(initial_values);

    useEffect(() => {
        axiosWithAuth().get("https://watermyplantsweb46.herokuapp.com/api/users")
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const update_user = () => {
        axiosWithAuth().put(`https://watermyplantsweb46.herokuapp.com/api/users/`, user)
            .then(res => {
                console.log(res.data)
                set_user([res.data, ...user])
            })
            .catch(err => {
                console.error(err);
            })
    }



    const change_input = (evt) => {
        console.log(evt)
    }


    return(
        <>
            <div id="profile-container">
                <form id="user-form">
                    <div id="inner-div">
                        <div >
                            <label>{user.username}</label>

                            <label htmlFor="password">Password:</label>
                            <input
                                value={user.password}
                                id="password"
                                name="password"
                                type="password"
                                onChange={change_input}
                            />
                            <label htmlFor="phonenumber">Phone Number:</label>
                            <input
                                value={user.phonenumber}
                                id="phonenumber"
                                name="phonenumber"
                                type="tel"
                                onChange={change_input}
                            />
                            <div className="errors">
                            </div>
                        </div>
                        <button id='signup-button'>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}