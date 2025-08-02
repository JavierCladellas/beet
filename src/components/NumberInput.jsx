import "../styles/FormInput.css";
import { useState, useEffect, useRef } from "react";


const NumberInput = ( props ) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef(null);

    const [value, setValue] = useState(props.default_value ?? "");

    useEffect(() => {
        setValue(props.default_value);
        if (props.default_value)
            setIsEmpty(props.default_value === "");
    }, [props.default_value]);

    const inputHandler = (e) => {
        setValue(e.target.value);
        setIsEmpty(e.target.value.trim() === "");

        if ( props.checkAgainst ) {
            const other = document.getElementById(props.checkAgainst);
            if (other && value !== other.value) {
                e.target.setCustomValidity("The values do not match.");
            } else {
                e.target.setCustomValidity("");
            }
        }

    };

    return(
        <div className="number-input-container">
            <label htmlFor={props.id}>{props.label}</label>
            <input className={"number-input"+ (isEmpty?"":" not-empty")} type="number" required={props.required ?? false}
                id={props.id} name={props.id}
                ref = {inputRef}
                defaultValue={value}
                inputMode="decimal"
                step = {props.step ?? "1"}
                pattern={props.pattern ?? "\\d*"}
                min={props.min ?? "0"}
                onChange={inputHandler}
            />
        </div>

    )
}

export default NumberInput;