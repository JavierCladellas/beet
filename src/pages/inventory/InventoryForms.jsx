import { useState, useEffect } from 'react';

import dev_env from '../../data/DevEnv.json';
import Form from '../../components/Form.jsx';
import Dropdown from '../../components/Dropdown.jsx';
import AttributeInputSection from '../../components/AttributesInputSection.jsx';
import Checkbox from '../../components/Checkbox.jsx';
import TextInput from '../../components/TextInput.jsx';
import NumberInput from '../../components/NumberInput.jsx';
import UploadImage from '../../components/UploadImage.jsx';


const ItemCreateForm = ( props ) => {
    const [isProduct, setIsProduct] = useState(true);
    const [isVariant, setIsVariant] = useState(false);

    const [variantProductId, setVariantProductId] = useState();

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


    const [categories, setCategories] = useState([]);
    const [variableProducts, setVariableProducts] = useState([]);
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

        fetch(dev_env.url+"products")
            .then(response => response.json())
            .then(data => {
                setVariableProducts(data.filter((product) => product.is_variable).map((product) =>({value:product.id, label:product.name})))
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    },[]);


    return (

        <Form onCancel={cancelHandler}
            title ="Nuevo Item"
            method="post"
            action={isVariant ? `items/product/${variantProductId}/variant` : (isProduct ? "items/product" : "items") }
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

                        <Dropdown id="category" label="Categoría" placeholder = "Ninguna" accept_empty style={{display: !isVariant ? "flex" : "none"}}
                            options = {categories}
                        />
                        <Dropdown id="product_id" label="Producto" required={isVariant} style={{display: isVariant ? "flex" : "none"}}
                            options = {variableProducts}
                            onChange = {(e) => setVariantProductId(e.target.value)}
                        />
                        <NumberInput id="price" label="Precio ($)" required={isProduct||isVariant} style={{display: (isVariant||isProduct) ? "flex" : "none"}} min="0" default_value="0" step="0.01" pattern="^\d+(.\d{1,2})" />

                        <AttributeInputSection style={{display: isVariant ? "flex" : "none"}}/>

                    </div>
                </div>
            }
        />
    )
};

const ItemEditForm = ( props ) => {
    return (
        <Form title="Editar Item"
            method="put"
            action={`items/${props.id}`}
            create_button_text = "Guardar"
            asMultipart
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <TextInput id="name" label="Nombre" required default_value={props.name}/>
                    <TextInput id="sku" label="SKU" required default_value={props.sku}/>
                    <TextInput type="textarea" id="description" label="Descripción" default_value={props.description}/>

                    <NumberInput id="stock" label="Stock" required default_value={props.stock}/>

                    <UploadImage id="image" label="Upload" default_value={props.image}/>

                </div>
            }
        />
    )
};

const ItemDeleteForm = ( props ) => {
    return (
        <Form title={"Eliminar Item " + props.sku}
            method="delete"
            action={`items/${props.id}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <p>¿Estás seguro de que deseas eliminar el item <strong>{props.name}</strong>?</p>
                </div>
            }
        />
    )
};



export { ItemCreateForm, ItemEditForm, ItemDeleteForm };