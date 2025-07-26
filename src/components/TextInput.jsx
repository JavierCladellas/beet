import "../styles/FormInput.css";


const TextInput = ( props ) => {
return(
    props.type === "textarea" ?
    <div className="input-container">
        <textarea required={props.required ?? false} id={props.id} name={props.id}></textarea>
        <label htmlFor={props.id}>{props.label}</label>
    </div> :
    <div className="input-container">
        <input required={props.required ?? false} type={props.type ?? "text"} id={props.id} name={props.id}/>
        <label htmlFor={props.id}>{props.label}</label>
    </div>
)
}

export default TextInput;