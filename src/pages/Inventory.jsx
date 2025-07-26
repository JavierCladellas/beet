
import '../styles/Page.css'
import '../styles/Form.css'

import { useState } from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import NumberInput from '../components/NumberInput.jsx';


const NewItemForm = ( ) => {
    const [isProduct, setIsProduct] = useState(true);
    const [isVariant, setIsVariant] = useState(false);

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



    return (
        <form>
            <h2>Nuevo Item</h2>

            <div className='form-row'>
                <div className='form-col'>

                    <Checkbox id="fis_product" label="Crear Producto?" checked_default={isProduct} on_change={isProductHandler}/>
                    <Checkbox id="fis_variant" label="Crear Variante?" checked_default={isVariant} on_change={isVariantHandler}/>

                    <TextInput id="fname" label="Nombre" required/>
                    <TextInput id="fsku" label="SKU" required/>
                    <TextInput type="textarea" id="fdescription" label="Descripción" required/>

                    <NumberInput id="fstock" label="Stock" required default_value="1"/>

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
                    <NumberInput id="fprice" label="Precio ($)" required min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})" />

                    <AttributeInputSection />

                </div>
                )}
            </div>

            <button className='action-button light-pink'>Crear</button>
        </form>
    )
};


const Inventory = ( props ) => {
return (
    <Page title="Inventario"
            create_button_text="+ Nuevo Item"
            modal_children={[<NewItemForm />]}
    />
);
}

export default Inventory;