// import React, {useEffect, useState} from "react";
// import "./UserProfile.css";
// import react from "react";
// import axiosWithAuth from "./axiosWithAuth";
// import {Link} from "react-router-dom";
// import * as yup from "yup";
// import schema from "../Form_Schema";
//
// const initial_values = {
//     username: "",
//     phonenumber: "",
//     password: ""
// }
// const initial_errors={
//     nickname:"",
//     species:"",
//     h2oFrequency:"",
//     image:""
// }
//
//
// export default function UserProfile() {
//     const [user, set_user] = useState([initial_values]);
//     const [errors, set_errors] = useState(initial_errors);
//
//     useEffect(() => {
//         axiosWithAuth().get("https://watermyplantsweb46.herokuapp.com/api/users")
//             .then(res => {
//                 console.log(res.data)
//             })
//             .catch(err => {
//                 console.error(err)
//             })
//     }, [])
//
//     const update_user = () => {
//
//         const updated_user = {
//             username: user.username,
//             phonenumber: user.phonenumber,
//             password: user.password
//         }
//         console.log(updated_user)
//         axiosWithAuth().put(`https://watermyplantsweb46.herokuapp.com/api/users`, updated_user)
//
//             .then(res => {
//                 set_user([res.data, ...user])
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }
//
//     // const validate = (name, value) => {
//     //     yup.reach(schema, name)
//     //         .validate(value)
//     //         .then(() => set_errors({...errors, [name]:""}) )
//     //         .catch(err => set_errors({errors, [name]: err.errors[0]}))
//     // }
//
//     const change= (name, value) =>{
//         set_user({ ...user, [name]: value });
//         // validate(name, value);
//
//     }
//
//
//     const onSubmit = evt =>{
//         evt.preventDefault();
//         update_user();
//     }
//
//
//     return(
//         <>
//             <div >
//                 <form onSubmit={onSubmit}>
//                     <div>
//                         <div >
//                             <label>{user.username}</label>
//
//
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 value={user.password}
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 onChange={change}
//                             />
//                             <label htmlFor="phonenumber">Phone Number:</label>
//                             <input
//                                 value={user.phonenumber}
//                                 id="phonenumber"
//                                 name="phonenumber"
//                                 type="tel"
//                                 onChange={change}
//                             />
//                             <div className="errors">
//                             </div>
//                         </div>
//                         <button>Save</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from "styled-components";
import "./UserProfile.css";
import axiosWithAuth from "./axiosWithAuth";


const initialValues = {
    username: "",
    password:"",
    phonenumber: ""
};



export default function Signup() {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
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
                setFormValues(formValues)
                console.log(formValues);
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














































