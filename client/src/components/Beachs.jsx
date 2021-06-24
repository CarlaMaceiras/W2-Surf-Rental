import React from "react";
import SportEquipment from "./SportEquipment";

const Beach = (props) => {
    return (
        <div>
        <h3>Saludos</h3>
        <p>{props.name}</p>
        <SportEquipment />                {/*SportEquipment es un componente anidado con Beach. Solo está en App.js el componente "Beach", pero aparece también "SportEquipment porque está anidado en "Beach"*/}
        </div>

    )
};

export default Beach;