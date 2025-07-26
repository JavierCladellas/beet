import "../styles/Dropdown.css";
import React, { useState } from "react";

const Dropdown = ( props ) => {

    const [selectedValue, setSelectedValue] = useState(props.default_value ?? "");
    const [customInput, setCustomInput] = useState("");


    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        if (e.target.value !== "other") {
            setCustomInput(""); // reset if not 'other'
        }
    };

    return(
        <div className="input-container">
            {selectedValue === "other" && (
                <input
                    type="text"
                    name={`${props.id}_custom`}
                    placeholder="Tu opción personalizada"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="custom-input"
                    required
                />
            )}
            <select id={props.id} name={props.id}
                    defaultValue={props.default_value ?? ""}
                    required={props.required??false}
                    onChange={handleChange}
                    className={selectedValue === "other"?"custom-select":""}
                    value={selectedValue}
                >
                {!props.default_value && <option value="" disabled hidden>Selecciona</option>}
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <label htmlFor={props.id}>{props.label}</label>

        </div>
    )
}


export default Dropdown;