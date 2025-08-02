import { useState, useRef } from 'react';
import '../styles/Form.css'
import Dropdown from './Dropdown';
import { FaTrash } from "react-icons/fa";

const AttributeInputRow = ( {index, onDelete} ) => {
return (
    <div className="form-row align-center tight">
        <Dropdown id={"fattribute_name_"+index}
                    label="Atributo" required
                    options={[
                        {"value":"color", "label":"Color"},
                        {"value":"size", "label":"Talla"},
                        {"value":"other", "label":"Otro"}
                    ]}
        />
        <Dropdown id={"fattribute_value_"+index}
                label="Valor" required
                options={[
                    {"value":"red", "label":"Rojo"},
                    {"value":"blue", "label":"Azul"},
                    {"value":"green", "label":"Verde"},
                    {"value":"other", "label":"Otro"}
                ]}
        />
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