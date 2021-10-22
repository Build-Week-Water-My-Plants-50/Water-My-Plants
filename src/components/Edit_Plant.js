import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import schema from "../Form_Schema";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory } from "react-router-dom";


const initial_disabled = true;
const initial_form_values = {
    nickname: "",
    species: "",
    h2oFrequency: "",
    image:""
}
const initial_form_errors={
    nickname:"",
    species:"",
    h2oFrequency:"",
    image:""
}
export default function PlantEdit(props){
    const { plant, isToggled} = props
    const {push} = useHistory();
    const [edit_form_values, set_edit_form_values] = useState(initial_form_values);
    const [disabled, set_disabled] = useState(initial_disabled);
    const [errors, set_errors]=useState(initial_form_errors);


    const edit_plant = (new_plant) => {
        
        axiosWithAuth().put(`https://watermyplantsweb46.herokuapp.com/api/plants/${plant.plants_id}`,new_plant)
            .then(res => { 
                set_edit_form_values(initial_form_values)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => set_errors({...errors, [name]:""}) )
            .catch(err => set_errors({errors, [name]: err.errors[0]}))
    }

    const change= (name, value) =>{
        set_edit_form_values({ ...edit_form_values, [name]: value });
        validate(name, value);

    }

    const form_submit = () => {
        const new_plant = {
            nickname: edit_form_values.nickname.trim(),
            species: edit_form_values.species.trim(),
            h2oFrequency: edit_form_values.h2oFrequency.trim(),
            image: edit_form_values.image.trim()
        }
        edit_plant(new_plant);
    }

    useEffect(() => {
        schema.isValid(edit_form_values).then(valid => set_disabled(!valid))
    },[edit_form_values])


    const onSubmit = evt => {
        evt.preventDefault();
        form_submit();
    }

    const onChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        change(name, value);
    }

    return(
       
        <form className='plant-form-container' onSubmit={onSubmit} >
            <div className='form-inputs submit'>
                <h2>Edit New Plant</h2>
                <div className='errors'>
                    <div>{errors.nickname}</div>
                    <div>{errors.species}</div>
                    <div>{errors.h2oFrequency}</div>
                    <div>{errors.image}</div>
                </div>
            </div>

            <div className='form-group-inputs'>
                <h3>User Information</h3>
                <label>Nickname &nbsp;
                    <input
                        value={edit_form_values.nickname}
                        onChange={onChange}
                        name='nickname'
                        type='text'
                        placeholder={`Give a new nickname to ${plant.nickname} `}
                    />
                </label>
                <label>Species &nbsp;
                    <input
                        value={edit_form_values.species}
                        onChange={onChange}
                        name='species'
                        type='text'
                        placeholder={`Edit species of ${plant.nickname}`}
                    />
                </label>
                <label>How often do you water this plant? &nbsp;
                    <select name="h2oFrequency" onChange={onChange}>
                        <option value="">--Select One--</option>
                        <option value="none">None</option>
                        <option value="Twice a day">Twice a day</option>
                        <option value="Once a day">Once a day</option>
                        <option value="Every other day">Every other day</option>
                        <option value="Twice a week">Twice a week</option>
                    </select><br/><br/>
                </label>
                <label>Image: &nbsp;
                    <input
                        type="text"
                        onChange={onChange}
                        name='image'
                        value={edit_form_values.image}
                    />
                </label><br/>
                <button disabled={disabled} className="save-plant">Save New Plant</button>
            </div>
        </form>
        
    )
}