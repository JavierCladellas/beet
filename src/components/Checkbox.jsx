import '../styles/Checkbox.css'


const Checkbox = ( props ) => {
return (
    <div className="checkbox-container" style={props.style}>
        <label htmlFor={props.id}>{props.label}</label>
        <div className="checkbox-wrapper-3">
            <input type="checkbox" id={props.id}  name={props.id} checked={props.checked_default} onChange={props.on_change}/>
            <label className="toggle" htmlFor={props.id}><span></span></label>
        </div>
    </div>
)
}


export default Checkbox;