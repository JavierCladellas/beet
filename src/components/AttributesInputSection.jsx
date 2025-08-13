import { useState, useRef, useEffect } from 'react';
import '../styles/Form.css'
import Dropdown from './Dropdown';
import { FaTrash } from "react-icons/fa";

import dev_env from '../data/DevEnv.json';

const AttributeInputRow = ( {index, onDelete, availableAttributes} ) => {
    const [attributeName, setAttributeName] = useState();
    const [attributeValue, setAttributeValue] = useState();

    const selectedAttribute = availableAttributes.find(att => att.name === attributeName);

    return (
        <div className="form-row align-center tight">
            <Dropdown id={"attribute_name_"+index}
                        label="Atributo" required
                        options={[
                            { value: "other", label: "Otro" },
                            ...availableAttributes.map(att => ({ value: att.name, label: att.name }))
                        ]}
                        onChange={(e) => setAttributeName(e.target.value)}
            />
            <Dropdown id={"attribute_value_"+index}
                    label="Valor" required
                    onChange={(e) => setAttributeValue(e.target.value)}
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
            <input type="hidden" name="attributes" value={JSON.stringify([{ name: attributeName, value: attributeValue }])}/>
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
        fetch(dev_env.url+"attributes")
        .then(response => response.json())
        .then( data => {
            setAvailableAttributes(data);
        })
        .catch(error => {
            console.error('Error fetching attributes:', error);
        })
    },[])

    const addAttributeRow = ( ) => {
        setAttributeRows(attributeRows => [...attributeRows, <AttributeInputRow key={attributeRows.length} index={attributeRows.length} />]);
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
            {attributeRows.map((row, index) => (
                <AttributeInputRow key={index}
                                index={index}
                                availableAttributes = {availableAttributes}
                                onDelete={deleteAttributeRow}
                />
            ))}
        </div>
        }

        <button className='transparent-add-button' type="button" onClick={addAttributeRow}>
            + Atributo
        </button>
    </div>

    )
};

export default AttributeInputSection;