// Comentarios en ordenes para cada producto
// Proponer variantes en producto si out of stock
//


import '../styles/Page.css'
import '../styles/Form.css'

import { useState, useRef, forwardRef, useImperativeHandle, useEffect} from 'react';
import Page from '../components/Page.jsx';
import Checkbox from '../components/Checkbox.jsx';
import TextInput from '../components/TextInput.jsx';
import Dropdown from '../components/Dropdown.jsx';
import UploadImage from '../components/UploadImage.jsx';
import Form from '../components/Form.jsx';
import NumberInput from '../components/NumberInput.jsx';

import dev_env from '../data/DevEnv.json'
import Modal from '../components/Modal.jsx';
import SelectItems from '../components/selectItems.jsx';

const NewProductForm = ( props ) => {
    const [isVariable, setIsVariable] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const selectItemsModalRef = useRef();

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
            asMultipart = {!isVariable}
            action={isVariable?"products":"products/variant"}
            content={
            <div className='form-col'>
                <Checkbox id="is_variable" label="Producto Variable" checked_default={isVariable} on_change={isVariableHandler}/>

                <div className='form-col' style={{display:isVariable?"none":"flex"}} >
                    {selectedItems.length > 0 &&
                        <div className="dynamic-col form-col" style={{gap:"4px", alignItems:"flex-start", border: "1px dashed black", padding:"8px"}}>
                            {selectedItems.map((itemId, index) => (
                                <p key={index}>{itemId.name}</p>
                            ))}
                        </div>
                    }

                    <button type="button" className='action-button light-pink' onClick={(e) => {e.preventDefault(); selectItemsModalRef.current?.open()}}>
                        + Item
                    </button>
                </div>
                { selectedItems.map((item, index) => (
                    <input type="hidden" name="item_ids" value={item.id} />
                )) }

                <TextInput id="name" label="Nombre" required />

                <TextInput id="sku" label="SKU" required={!isVariable} style={{display:isVariable?"none":"flex"}} />


                <TextInput type="textarea" id="description" label="Descripción" />


                <NumberInput id="price" label="Precio ($)" required min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})" style={{display:isVariable?"none":"flex"}}/>

                <Dropdown id="category" label="Categoría" placeholder = "Ninguna" accept_empty
                    options = {categories}
                />

                <UploadImage id="image" label="Foto" style={{display:isVariable?"none":"flex"}} />

                <Modal ref={selectItemsModalRef} children = {[
                    <SelectItems key="select-items" onConfirm={(s) => {
                        setSelectedItems(s);
                        selectItemsModalRef.current?.close();
                    }} />
                ]}
                />
            </div>
            }
        />
    )
}

const ProductDeleteForm = forwardRef((props, ref) => {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");

    useImperativeHandle(ref, () => ({
        setProductId, setProductName
    }));

    return (
        <Form title="Eliminar Producto"
            method="delete"
            action={`products/${productId}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            content={
                <div className='form-col'>
                    <p>¿Seguro que quieres eliminar el producto <strong>{productName}</strong>?</p>
                </div>
            }
            onSuccess={props.onSuccess}
        />
    )
});

const onRowDelete = ( deleteFormRef, row ) => {
    deleteFormRef.current?.setProductId(row.id);
    deleteFormRef.current?.setProductName(row.name);
}

const Products = ( props ) => {
    const pageRef = useRef();
    const deleteFormRef = useRef();

    const createForm = <NewProductForm
        key="new-product-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />;

    const deleteForm = <ProductDeleteForm
        key="delete-product-form"
        ref={deleteFormRef}
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
            onRowDelete={(r) => onRowDelete(deleteFormRef,r)}
            modal_children={[createForm]}
            modal_delete_children={[deleteForm]}
        />
    );
}

export default Products;