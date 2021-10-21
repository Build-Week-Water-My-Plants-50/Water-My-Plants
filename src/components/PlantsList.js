import React from "react";
import Plant from "./Plant";
import axiosWithAuth from "./axiosWithAuth";



export default function PlantsList(props) {
    const {plants, set_plant_values} = props;


        axiosWithAuth().get("https://watermyplantsweb46.herokuapp.com/api/plants")
            .then(res => {
                set_plant_values(res.data, ...plants)
            })
            .catch(err => {
                console.error(err)
            })

    return (
        <div>
            {
                plants.map(plant => {
                    return (
                        <Plant key={plant.plants_id} plant={plant}  plants={plants} set_plant_values={set_plant_values}/>
                    )
                })
            }

        </div>
    )
}














































