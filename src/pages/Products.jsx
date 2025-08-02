// Comentarios en ordenes para cada producto
// Proponer variantes en producto si out of stock
//


import '../styles/Page.css'
import '../styles/Form.css'

import { useState, useRef, forwardRef, useImperativeHandle, useEffect} from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import Dropdown from '../components/Dropdown.jsx';
import UploadImage from '../components/UploadImage.jsx';
import Form from '../components/Form.jsx';
import NumberInput from '../components/NumberInput.jsx';

import dev_env from '../data/DevEnv.json'

const NewProductForm = ( props ) => {
    const [isVariable, setIsVariable] = useState(false);

    const isVariableHandler = (e) => {
        setIsVariable(e.target.checked);
    };

    const cancelHandler = () => {
        setIsVariable(false);
    }


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(dev_env.url+"categories")
            .then(response => response.json())
            .then(data => {
                let options = [{"value": "other", "label": "Otra"}];
                data.forEach(category => {
                    options.push({"value": category.name, "label": category.name});
                });
                setCategories(options);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    },[]);


    return (
        <Form title="Nuevo Producto"
            onCancel={cancelHandler}
            create_button_text = "Crear"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            method="post"
            action={isVariable?"products":"products/variant"}
            content={
            <div className='form-col'>
                <Checkbox id="is_variable" label="Producto Variable" checked_default={isVariable} on_change={isVariableHandler}/>

                <p style={{display:isVariable?"none":"flex"}}>Seleccionar items</p>

                <NumberInput id="price" label="Precio ($)" required min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})" style={{display:isVariable?"none":"flex"}}/>

                <TextInput id="name" label="Nombre" required/>

                <TextInput id="sku" label="SKU" required={!isVariable} style={{display:isVariable?"none":"flex"}}/>

                <TextInput type="textarea" id="description" label="Descripción"/>

                <Dropdown id="category" label="Categoría" placeholder = "Ninguna" accept_empty
                    options = {categories}
                />

                <UploadImage id="product_image" label="Foto" required={!isVariable} style={{display:isVariable?"none":"flex"}}/>
            </div>
            }
        />
    )
}

const Products = ( props ) => {
    const pageRef = useRef();

    const createForm = <NewProductForm
        key="new-product-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />;
    return (
        <Page title="Products"
            ref={pageRef}
            create_button_text="+ Nuevo Producto"
            api_endpoint="products"
            checkboxSelection
            modal_children={[createForm]}
        />
    );
}

export default Products;