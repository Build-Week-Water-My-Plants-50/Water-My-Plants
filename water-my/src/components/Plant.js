import React, {useEffect, useState} from "react";
import axiosWithAuth from "./axiosWithAuth";
import { useHistory } from "react-router-dom";
import PlantEdit from "./Edit_Plant.js"

export default function Plant(props) {
    const { push } = useHistory();
    const { plant, plants, set_plant_values} = props;
    const [isToggled, setIsToggled] = useState(false)



    const delete_plant = () => {

        axiosWithAuth().delete(`https://watermyplantsweb46.herokuapp.com/api/plants/${plant.plants_id}`, plant)
            .then(res => {
                console.log(res);
              push('/PlantsList');
            })
            .catch(err => {
                console.error(err)
            })
    }


    const edit_plant = () => {
        console.log(plant)
        axiosWithAuth().put(`https://watermyplantsweb46.herokuapp.com/api/plants/${plant.plants_id}`,plant)
            .then(res => {
                console.log(res.data)
                set_plant_values([res.data, ...plants])
                console.log(plant)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const update_form = evt => {
        const update_plant = {
            nickname: evt.nickname,
            species: evt.species,
            h2oFrequency: evt.h2oFrequency,
            image: evt.image
        }
        edit_plant()
    }


    return (
        <>
            <div className="plant-card">
                <h3>Plant Info</h3>
                <p>Nickname: {plant.nickname}</p>
                <p>Species: {plant.species}</p>
                <p>Water frequency? {plant.h2oFrequency}</p>
                <img src={`${plant.image}`} alt={`Image of a ${plant.nickname}.`}/>
                <button onClick={() => setIsToggled(!isToggled)}>Edit</button>
                <button onClick={delete_plant}>Delete Plant</button>
                {isToggled && <PlantEdit plant={plant} isToggled={isToggled} set_plant_values={set_plant_values} plants={plants}/>}
            </div>

        </>
    )

}