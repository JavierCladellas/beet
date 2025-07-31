
import '../styles/Page.css'
import '../styles/Form.css'

import { useState, useRef } from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import NumberInput from '../components/NumberInput.jsx';
import Dropdown from '../components/Dropdown.jsx';
import UploadImage from '../components/UploadImage.jsx';
import Form from '../components/Form.jsx';

const NewItemForm = ( props ) => {
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
    const cancelHandler = () => {
        setIsProduct(true);
        setIsVariant(false);
    };

    return (

        <Form onCancel={cancelHandler}
            title ="Nuevo Item"
            method="post"
            action="items"
            asMultipart
            onSuccess={props.onSuccess}
            create_button_text = "Crear"
            cancel_button_text = "Cancelar"
            content = {
                <div className='form-row resp-col'>
                    <div className='form-col'>

                        <Checkbox id="is_product" label="Crear Producto?" checked_default={isProduct} on_change={isProductHandler}/>
                        <Checkbox id="is_variant" label="Crear Variante?" checked_default={isVariant} on_change={isVariantHandler}/>

                        <TextInput id="name" label="Nombre" required/>
                        <TextInput id="sku" label="SKU" required/>
                        <TextInput type="textarea" id="description" label="Descripción"/>

                        <NumberInput id="stock" label="Stock" required default_value="1"/>

                        <UploadImage id="image" label="Upload"/>

                    </div>

                    <div className='form-col' style={{display: (isProduct || isVariant ) ? "flex" : "none"}}>
                        <h3>{isProduct ? "Producto" : "Variante"}</h3>
                        <Dropdown id="fcategory" label="Categoría" required={isProduct} style={{display: isProduct ? "flex" : "none"}}
                            options = {[
                                {"value": "category1", "label": "Categoría 1"},
                                {"value": "category2", "label": "Categoría 2"},
                                {"value": "category3", "label": "Categoría 3"},
                                {"value": "other", "label": "Otra"}
                            ]}
                        />
                        <Dropdown id="fproduct" label="Producto" required={isVariant} style={{display: isVariant ? "flex" : "none"}}
                            options = {[
                                {"value": "product1", "label": "Producto 1"},
                                {"value": "product2", "label": "Producto 2"},
                                {"value": "product3", "label": "Producto 3"}
                            ]}
                        />
                        {/* <NumberInput id="fprice" label="Precio ($)" required={isProduct||isVariant} style={{display: (isVariant||isProduct) ? "flex" : "none"}} min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})" /> */}

                        <AttributeInputSection />

                    </div>
                </div>
            }
        />
    )
};



const Inventory = ( props ) => {
    const pageRef = useRef();

    const createForm = <NewItemForm
        key="new-item-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
        userRole = {props.userRole}
    />

    return (
        <Page title="Inventario"
                ref={pageRef}
                create_button_text="+ Nuevo Item"
                api_endpoint="items"
                checkboxSelection
                modal_children={[createForm]}
        />
    );
}

export default Inventory;