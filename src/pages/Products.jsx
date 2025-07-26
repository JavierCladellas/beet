
import '../styles/Page.css'
import '../styles/Button.css';
import '../styles/Form.css'
import '../styles/Checkbox.css'

import { useState } from 'react';
import Page from '../components/Page.jsx';


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
    )
};


const NewProductForm = ( ) => {
    const [isComposite, setIsComposite] = useState(false);
    const [attributeRows, setAttributeRows] = useState([]);
    const [isVariant, setIsVariant] = useState(false);


    const isCompositeHandler = (e) => {
        setIsComposite(e.target.checked);
    };
    const isVariantHandler = (e) => {
        setIsVariant(e.target.checked);
    };

    const addAttributeRow = ( ) => {
        setAttributeRows(attributeRows => [...attributeRows, <AttributeInputRow key={attributeRows.length} index={attributeRows.length} />]);
    }

    return (
        <form>
            <h2>Nuevo Producto</h2>

            <div className="checkbox-container">
                <label htmlFor='fis_composite'>Producto&nbsp;compuesto</label>
                <div className="checkbox-wrapper-3">
                    <input type="checkbox" id="fis_composite"  name="fis_composite" checked={isComposite} onChange={isCompositeHandler}/>
                    <label className="toggle" htmlFor="fis_composite"><span></span></label>
                </div>
            </div>

            <div className="checkbox-container">
                <label htmlFor='fis_variant'>Variante</label>
                <div className="checkbox-wrapper-3">
                    <input type="checkbox" id="fis_variant"  name="fis_variant" checked={isVariant} onChange={isVariantHandler}/>
                    <label className="toggle" htmlFor="fis_variant"><span></span></label>
                </div>
            </div>

            { isComposite &&
            <div className="input-container">
                <input required type="text" id="fname" name="fname"/>
                <label htmlFor="fname">Nombre (override with item if not composite)</label>
            </div>
            }

            { isComposite &&
            <div className="input-container">
                <input required type="text" id="fsku" name="fsku"/>
                <label htmlFor="fsku">SKU (override with item if not composite)</label>
            </div>
            }

            { isComposite &&
            <div className="input-container">
                <textarea required type="text" id="fdescription" name="fdescription"/>
                <label htmlFor="fdescription">Descripción (override with item if not composite)</label>
            </div>
            }


            { isVariant ?
            <div className="input-container">
                <select required id="fproduct" name="fproduct" defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="fproduct">Producto</label>
            </div>
            :
            <div className="input-container">
                <select required id="fcategory" name="fcategory" defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="fcategory">Product Category</label>
            </div>
            }

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

            {isComposite && (
                <p>Photo</p>
            )}

            { isComposite ?
            <p>Seleccionar items</p>
            :
            <p>Seleccionar item</p>
            }


        </form>
    );
}

const Products = ( props ) => {
return (
    <Page title="Products"
        create_button_text="+ Nuevo Producto"
        modal_children={[<NewProductForm />]} />
);
}

export default Products;