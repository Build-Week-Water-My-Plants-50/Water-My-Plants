import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import "./UserProfile.css";
import axiosWithAuth from "./axiosWithAuth";

const initialValues = {
    username: "",
    password:"",
    phonenumber: ""
};



export default function UserProfile() {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (evt) => {
        setFormValues({
            ...formValues,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().put('https://watermyplantsweb46.herokuapp.com/api/users', formValues)
            .then((res) => {

                push('./profile');
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setFormValues(initialValues)
            })
    };

    useEffect(() => {
        axiosWithAuth().get("https://watermyplantsweb46.herokuapp.com/api/users")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])



    return (
        <>
            <div id="profile-container">
                <form id="user-form" onSubmit={handleSubmit}>

                    <div id="inner-div">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                value={formValues.username}
                                id="username"
                                name="username"
                                type="text"
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                value={formValues.password}
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                            />
                            <label htmlFor="phonenumber">Phone Number:</label>
                            <input
                                value={formValues.phonenumber}
                                id="phonenumber"
                                name="phonenumber"
                                type="tel"
                                onChange={handleChange}
                            />
                            <div className="errors">
                            </div>
                        </div>
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}
















































