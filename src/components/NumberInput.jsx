import "../styles/FormInput.css";
import { useState } from "react";


const NumberInput = ( props ) => {
    const [isEmpty, setIsEmpty] = useState(true);

    const inputHandler = (e) => {
        setIsEmpty(e.target.value.trim() === "");
    }
return(
    <div className="number-input-container">
        <label htmlFor={props.id}>{props.label}</label>
        <input className={"number-input"+ (isEmpty?"":" not-empty")} type="number" required={props.required ?? false}
            id={props.id} name={props.id}
            defaultValue={props.default_value ?? ""}
            step = {props.step ?? "1"}
            pattern={props.pattern ?? "\\d*"}
            min={props.min ?? "0"}
            onChange={inputHandler}
        />
    </div>

)
}

export default NumberInput;