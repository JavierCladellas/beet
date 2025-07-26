import "../styles/FormInput.css";
import React, { useState } from "react";


const TextInput = ( props ) => {
    const [isEmpty, setIsEmpty] = useState(true);

    const inputHandler = (e) => {
        setIsEmpty(e.target.value.trim() === "");
    }
    const textAreaHandler = (e) => {
        inputHandler(e);
    }

    return(
        props.type === "textarea" ?
        <div className="input-container">
            <textarea className={"text-input"+ (isEmpty?"":" not-empty")} required={props.required ?? false} id={props.id} name={props.id} onChange={inputHandler}></textarea>
            <label htmlFor={props.id}>{props.label}</label>
        </div> :
        <div className="input-container text-input">
            <input className={"text-input"+ (isEmpty?"":" not-empty")} required={props.required ?? false} type={props.type ?? "text"} id={props.id} name={props.id} onChange={textAreaHandler}/>
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default TextInput;