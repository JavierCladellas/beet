
import '../styles/Page.css'
import '../styles/Form.css'

import { useState } from 'react';
import Page from '../components/Page.jsx';
import AttributeInputSection from '../components/AttributesInputSection.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';




const NewProductForm = ( ) => {
    const [isComposite, setIsComposite] = useState(false);
    const [isVariant, setIsVariant] = useState(false);

    const isCompositeHandler = (e) => {
        setIsComposite(e.target.checked);
    };
    const isVariantHandler = (e) => {
        setIsVariant(e.target.checked);
    };

    return (
        <form>
            <h2>Nuevo Producto</h2>

            <Checkbox id="fis_composite" label="Producto&nbsp;compuesto" checked_default={isComposite} on_change={isCompositeHandler}/>

            <Checkbox id="fis_variant" label="Variante" checked_default={isVariant} on_change={isVariantHandler}/>

            { isComposite && <TextInput id="fname" label="Nombre (override w item if not composite)" required/> }

            { isComposite && <TextInput id="fsku" label="SKU (override with item if not composite)" required/> }

            { isComposite && <TextInput type="textarea" id="fdescription" label="Descripción (override with item if not composite)" required/> }

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

            <AttributeInputSection />

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