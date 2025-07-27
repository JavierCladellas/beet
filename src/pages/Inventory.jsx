
import '../styles/Page.css'
import '../styles/Form.css'

import { useState } from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import NumberInput from '../components/NumberInput.jsx';
import Dropdown from '../components/Dropdown.jsx';


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

            <div className='form-row resp-col'>
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
                    { isProduct ?
                        <Dropdown id="fcategory" label="Categoría" required
                            options = {[
                                {"value": "category1", "label": "Categoría 1"},
                                {"value": "category2", "label": "Categoría 2"},
                                {"value": "category3", "label": "Categoría 3"},
                                {"value": "other", "label": "Otra"}
                            ]}
                        />
                    : <Dropdown id="fproduct" label="Producto" required
                        options = {[
                            {"value": "product1", "label": "Producto 1"},
                            {"value": "product2", "label": "Producto 2"},
                            {"value": "product3", "label": "Producto 3"}
                        ]}
                    />
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
            modal_children={[<NewItemForm key="new-item-form"/>]}
    />
);
}

export default Inventory;