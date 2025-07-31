
import '../styles/Page.css'
import '../styles/Form.css'

import { useState, useRef, forwardRef, useImperativeHandle} from 'react';
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
                        <NumberInput id="fprice" label="Precio ($)" required={isProduct||isVariant} style={{display: (isVariant||isProduct) ? "flex" : "none"}} min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})" />

                        <AttributeInputSection />

                    </div>
                </div>
            }
        />
    )
};

const ItemEditForm = forwardRef((props, ref) => {
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");

    useImperativeHandle(ref, () => ({
        setItemId, setItemName, setSku, setDescription, setStock, setImage
    }));

    return (
        <Form title="Editar Item"
            method="put"
            action={`items/${itemId}`}
            create_button_text = "Guardar"
            cancel_button_text = "Cancelar"
            asMultipart
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <TextInput id="name" label="Nombre" required default_value={itemName}/>
                    <TextInput id="sku" label="SKU" required default_value={sku}/>
                    <TextInput type="textarea" id="description" label="Descripción" default_value={description}/>

                    <NumberInput id="stock" label="Stock" required default_value={stock}/>

                    <UploadImage id="image" label="Upload" default_value={image}/>

                </div>
            }
        />
    )
});

const onRowEdit = ( editFormRef, row ) => {
    editFormRef.current?.setItemId(row.id);
    editFormRef.current?.setItemName(row.name);
    editFormRef.current?.setSku(row.sku);
    editFormRef.current?.setDescription(row.description);
    editFormRef.current?.setStock(row.stock);
    editFormRef.current?.setImage("http://localhost:8000/api/"+row.image_url);
}


const ItemDeleteForm = forwardRef((props, ref) => {
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");

    useImperativeHandle(ref, () => ({
        setItemId, setItemName
    }));

    return (
        <Form title="Eliminar Item"
            method="delete"
            action={`items/${itemId}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <p>¿Estás seguro de que deseas eliminar el item <strong>{itemName}</strong>?</p>
                </div>
            }
        />
    )
});

const onRowDelete = ( deleteFormRef, row ) => {
    deleteFormRef.current?.setItemId(row.id);
    deleteFormRef.current?.setItemName(row.name);
}



const Inventory = ( props ) => {
    const pageRef = useRef();
    const editFormRef = useRef();
    const deleteFormRef = useRef();

    const createForm = <NewItemForm
        key="new-item-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
        userRole = {props.userRole}
    />
    const editForm = <ItemEditForm
        key = "edit-item-form"
        ref={editFormRef}
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />

    const deleteForm = <ItemDeleteForm
        key = "delete-item-form"
        ref={deleteFormRef}
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />

    return (
        <Page title="Inventario"
                ref={pageRef}
                create_button_text="+ Nuevo Item"
                api_endpoint="items"
                checkboxSelection
                onRowEdit={(r) => onRowEdit(editFormRef,r)}
                onRowDelete={(r) => onRowDelete(deleteFormRef,r)}
                modal_children={[createForm]}
                modal_edit_children = {[editForm]}
                modal_delete_children = {[deleteForm]}
        />
    );
}

export default Inventory;