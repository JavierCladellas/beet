import "../styles/FormInput.css";
import { useState, useEffect, useRef } from "react";


const NumberInput = ( props ) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [value, setValue] = useState(props.default_value ?? "");
    const inputRef = useRef(null);

    const inputHandler = (e) => {
        setValue(e.target.value);
        setIsEmpty(e.target.value.trim() === "");
    }

    useEffect(() => {
        setValue(props.default_value);
        if (props.default_value)
            setIsEmpty(props.default_value.trim() === "");
    }, [props.default_value]);


    useEffect(() => {
        const el = inputRef.current;
        const updateState = () => {
            if (el) {
                setIsEmpty(el.value.trim() === "");
            }
        };
        el?.addEventListener('input', updateState);
        updateState();
        return () => {
            el?.removeEventListener('input', updateState);
        };
    }, []);


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