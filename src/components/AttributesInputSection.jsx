import { useState } from 'react';
import '../styles/Form.css'

const AttributeInputRow = ( {index} ) => {
return (
    <div className="form-row">
        <div className="input-container">
            <select required id={"fattribute_name_"+index} name={"fattribute_name_"+index} defaultValue="">
                <option value="" disabled hidden></option>
                <option value="admin">Admin</option>
            </select>
            <label htmlFor={"fattribute_name_"+index}>Atributo</label>
        </div>
        <div className="input-container">
            <select required id="fattribute_value0" name="fattribute_value0" defaultValue="">
                <option value="" disabled hidden></option>
                <option value="admin">Admin</option>
            </select>
            <label htmlFor="fattribute_value0">Valor</label>
        </div>
    </div>
);
}

const AttributeInputSection = ( props ) => {
    const [attributeRows, setAttributeRows] = useState([]);
    const addAttributeRow = ( ) => {
        setAttributeRows(attributeRows => [...attributeRows, <AttributeInputRow key={attributeRows.length} index={attributeRows.length} />]);
    }
    return (
        <div className='form-col'>
        {attributeRows.length > 0 &&
        <div className="form-col dynamic-col">
            {attributeRows.map((row, index) => (
                <AttributeInputRow key={index} index={index}/>
            ))}
        </div>
        }

        <button className='transparent-add-button rotate' type="button" onClick={addAttributeRow}>
            + Atributo
        </button>
    </div>

    )
};

export default AttributeInputSection;