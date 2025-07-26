import "../styles/Dropdown.css";

const Dropdown = ( props ) => {
return(
    <div className="input-container">
        <select id={props.id} name={props.id} defaultValue={props.default_value ?? ""} required={props.required??false}>
            {!props.default_value && <option value="" disabled hidden></option>}
            {props.options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
        <label htmlFor={props.id}>{props.label}</label>
    </div>
)
}


export default Dropdown;