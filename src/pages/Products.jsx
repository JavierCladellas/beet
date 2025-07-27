
import '../styles/Page.css'
import '../styles/Form.css'

import { useState } from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import Dropdown from '../components/Dropdown.jsx';
import UploadImage from '../components/UploadImage.jsx';
import Form from '../components/Form.jsx';




const NewProductForm = ( ) => {
    const [isComposite, setIsComposite] = useState(false);
    const [isVariant, setIsVariant] = useState(false);

    const isCompositeHandler = (e) => {
        setIsComposite(e.target.checked);
    };
    const isVariantHandler = (e) => {
        setIsVariant(e.target.checked);
    };

    const cancelHandler = () => {
        setIsComposite(false);
        setIsVariant(false);
    }


    return (
        <Form title="Nuevo Producto"
            onCancel={cancelHandler}
            content={
            <div className='form-col'>
                <Checkbox id="fis_composite" label="Producto&nbsp;compuesto" checked_default={isComposite} on_change={isCompositeHandler}/>

                <Checkbox id="fis_variant" label="Variante" checked_default={isVariant} on_change={isVariantHandler}/>

                { isComposite && <TextInput id="fname" label="Nombre (override w item if not composite)" required/> }

                { isComposite && <TextInput id="fsku" label="SKU (override with item if not composite)" required/> }

                { isComposite && <TextInput type="textarea" id="fdescription" label="Descripción (override with item if not composite)" required/> }

                { isVariant ?
                <Dropdown id="fproduct" label="Producto" required
                    options = {[
                        {"value": "product1", "label": "Producto 1"},
                        {"value": "product2", "label": "Producto 2"},
                        {"value": "product3", "label": "Producto 3"}
                    ]}
                />
                :
                <Dropdown id="fcategory" label="Categoría" required
                    options = {[
                        {"value": "category1", "label": "Categoría 1"},
                        {"value": "category2", "label": "Categoría 2"},
                        {"value": "category3", "label": "Categoría 3"}
                    ]}
                />
                }

                <AttributeInputSection />

                {isComposite && (
                    <UploadImage id="fproduct_image" label="Upload" required/>
                )}

                { isComposite ?
                <p>Seleccionar items</p>
                :
                <p>Seleccionar item</p>
                }
            </div>
            }
        />
    )
}

const Products = ( props ) => {
return (
    <Page title="Products"
        create_button_text="+ Nuevo Producto"
        modal_children={[<NewProductForm key = "new-product-form"/>]} />
);
}

export default Products;