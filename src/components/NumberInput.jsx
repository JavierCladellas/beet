import "../styles/FormInput.css";


const NumberInput = ( props ) => {
return(
    <div className="number-input-container">
        <label htmlFor={props.id}>{props.label}</label>
        <input className="number-input" type="number" required={props.required ?? false}
            id={props.id} name={props.id}
            defaultValue={props.default_value ?? ""}
            step = {props.step ?? "1"}
            pattern={props.pattern ?? "\\d*"}
        />
    </div>

)
}

export default NumberInput;