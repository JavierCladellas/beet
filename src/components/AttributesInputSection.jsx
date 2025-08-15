import { useState, useRef, useEffect } from 'react';
import '../styles/Form.css'
import Dropdown from './Dropdown';
import { FaTrash } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const AttributeInputRow = ( {index, onDelete, availableAttributes, default_attribute_name, default_attribute_value} ) => {
    const [attributeName, setAttributeName] = useState(default_attribute_name??"");
    const [attributeValue, setAttributeValue] = useState(default_attribute_value??"");

    const selectedAttribute = availableAttributes.find(att => att.name === attributeName);

    return (
        <div className="form-row align-center tight">
            <Dropdown id={"attribute_name_"+index}
                        label="Atributo" required
                        options={[
                            { value: "other", label: "Otro" },
                            ...availableAttributes.map(att => ({ value: att.name, label: att.name }))
                        ]}
                        accept_empty
                        default_value={default_attribute_name}
                        onChange={(e) => setAttributeName(e.target.value)}
            />
            <Dropdown id={"attribute_value_"+index}
                    label="Valor" required
                    onChange={(e) => setAttributeValue(e.target.value)}
                    default_value={default_attribute_value}
                    accept_empty
                    options={[
                        { value: "other", label: "Otro" },
                        ...(selectedAttribute
                            ? selectedAttribute.attribute_values.map(val => ({
                                value: val.value,
                                label: val.value
                            }))
                            : [])
                    ]}
            />
            <input type="hidden" name="attribute_names" value={attributeName} />
            <input type="hidden" name="attribute_values" value={attributeValue} />

            <div className='icon-buttons-container'>
                <button className='icon-button' type="button" onClick={() => onDelete(index)} >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

const AttributeInputSection = ( props ) => {
    const [attributeRows, setAttributeRows] = useState([]);
    const attributesListRef = useRef(null);

    const [availableAttributes, setAvailableAttributes] = useState([])
    useEffect(()=>{
        fetch(apiUrl+"attributes")
        .then(response => response.json())
        .then( data => {
            setAvailableAttributes(data);
        })
        .catch(error => {
            console.error('Error fetching attributes:', error);
        })
    },[])

    useEffect( () => {
        if ( props.default_value ){
            let existingAttRows = [];
            props.default_value.forEach( (att,i) => (
                existingAttRows.push(<AttributeInputRow key={i}
                                index={i}
                                default_attribute_name = {att.attribute.name}
                                default_attribute_value = {att.attribute_value.value}
                                availableAttributes = {availableAttributes}
                                onDelete={deleteAttributeRow}
                />)
            ))
            setAttributeRows(existingAttRows);
        }
    },[availableAttributes,props.default_value]);

    const addAttributeRow = ( ) => {
        setAttributeRows(attributeRows => [...attributeRows, <AttributeInputRow key={attributeRows.length} index={attributeRows.length}  availableAttributes = {availableAttributes} onDelete={deleteAttributeRow}/>]);
        setTimeout(() => {
            if (attributesListRef.current) {
                attributesListRef.current.scrollTop = attributesListRef.current.scrollHeight;
            }
        }, 0);
    }

    const deleteAttributeRow = (indexToDelete) => {
        setAttributeRows(rows =>
            rows.filter((_, i) => i !== indexToDelete)
        );
    };


    return (
        <div className='form-col' style={props.style}>
        {attributeRows.length > 0 &&
        <div className="form-col dynamic-col" ref={attributesListRef}>
            {attributeRows}
        </div>
        }

        <button className='transparent-add-button' type="button" onClick={addAttributeRow}>
            + Atributo
        </button>
    </div>

    )
};

export default AttributeInputSection;