
import '../styles/Page.css'
import '../styles/Button.css';
import '../styles/Form.css'
import '../styles/Checkbox.css'
import Modal from "../components/Modal.jsx";
import { useRef, useState } from 'react';


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


const NewItemForm = ( ) => {
    const [isProduct, setIsProduct] = useState(true);
    const [isVariant, setIsVariant] = useState(false);
    const [attributeRows, setAttributeRows] = useState([]);

    const isProductHandler = (e) => {
        setIsProduct(e.target.checked);
        if ( e.target.checked )
            setIsVariant(false);
    };
    const isVariantHandler = (e) => {
        setIsVariant(e.target.checked);
        if ( e.target.checked )
            setIsProduct(false);
    };

    const addAttributeRow = ( ) => {
        setAttributeRows(attributeRows => [...attributeRows, <AttributeInputRow key={attributeRows.length} index={attributeRows.length} />]);
    }


    return (
        <form>
            <h2>Nuevo Item</h2>

            <div className='form-row'>
                <div className='form-col'>

                    <div className="checkbox-container">
                        <label htmlFor='fis_product'>Crear Producto?</label>
                        <div className="checkbox-wrapper-3">
                            <input type="checkbox" id="fis_product"  name="fis_product" checked={isProduct} onChange={isProductHandler}/>
                            <label className="toggle" htmlFor="fis_product"><span></span></label>
                        </div>
                    </div>


                    <div className="checkbox-container">
                        <label htmlFor='fis_variant'>Crear Variante?</label>
                        <div className="checkbox-wrapper-3">
                            <input type="checkbox" id="fis_variant"  name="fis_variant" checked={isVariant} onChange={isVariantHandler}/>
                            <label className="toggle" htmlFor="fis_variant"><span></span></label>
                        </div>
                    </div>

                    <div className="input-container">
                        <input required type="text" id="fname" name="fname"/>
                        <label htmlFor="fname">Nombre</label>
                    </div>

                    <div className="input-container">
                        <input required type="text" id="fsku" name="fsku"/>
                        <label htmlFor="fsku">SKU</label>
                    </div>

                    <div className="input-container">
                        <textarea required type="text" id="fdescription" name="fdescription"/>
                        <label htmlFor="fdescription">Descripción</label>
                    </div>

                    <div className="number-input-container">
                        <label htmlFor="fstock">Stock</label>
                        <input required type="number" id="fstock" name="fstock" min="0" defaultValue="1" step="1" pattern="\d*" />
                    </div>

                    <p>Photo</p>

                </div>

                { (isProduct || isVariant )&& (
                <div className='form-col'>
                    <h3>{isProduct ? "Producto" : "Variante"}</h3>
                    { isProduct ? (
                    <div className="input-container">
                        <select required id="fcategory" name="fcategory" defaultValue="">
                            <option value="" disabled hidden></option>
                            <option value="admin">Admin</option>
                        </select>
                        <label htmlFor="fcategory">Product Category</label>
                    </div>
                    ) :
                    <div className="input-container">
                        <select required id="fproduct" name="fproduct" defaultValue="">
                            <option value="" disabled hidden></option>
                            <option value="admin">Admin</option>
                        </select>
                        <label htmlFor="fproduct">Producto</label>
                    </div>
                    }

                    <div className="number-input-container">
                        <label htmlFor="fprice">Precio ($)</label>
                        <input required type="number" id="fprice" name="fprice" min="0" defaultValue="0" step="0.01" pattern="^\d+(,\d{1,2})" />
                    </div>

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

                </div>
                )}
            </div>

            <button className='action-button light-pink'>Crear</button>
        </form>
    )
};


const Inventory = ( props ) => {
    const modalRef = useRef();

    return (
        <div className="page">
            <div className="title-row">
                <h1>Inventario</h1>
                <button className='action-button light-pink'  onClick={() => modalRef.current?.open()}>
                    + Nuevo Item
                </button>
            </div>
            <Modal ref={modalRef} key="inventory-modal" children = {[<NewItemForm key="new-item-form"/>]}/>
        </div>

    );
}

export default Inventory;