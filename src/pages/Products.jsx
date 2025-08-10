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
import { FaEye } from "react-icons/fa";

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
            validate={() => {
                if (!isVariable && selectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
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
                    <input type="hidden" name="item_ids" value={item.id} key={index}/>
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
                    <SelectItems key="select-items"
                    selectedItems={[...selectedItems]}
                    onSelectionChange={(s) => {
                        setSelectedItems(s);
                    }}
                    onConfirm={(s) => {
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


const ProductEditForm = forwardRef((props, ref) => {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productIsVariable, setProductIsVariable] = useState(false);
    const [productCategory, setProductCategory] = useState("")
    const [productSku, setProductSku] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productImage, setProductImage] = useState("")
    const [editSelectedItems, editSetSelectedItems] = useState([]);
    const editSelectItemsModalRef = useRef();

    useImperativeHandle(ref, () => ({
        setProductId, setProductName, setProductIsVariable,
        setProductDescription, setProductCategory, setProductSku,
        setProductPrice, setProductImage, editSetSelectedItems
    }));

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
        <Form title={"Editar Producto "+ productName}
            method="put"
            key="edit-product-form"
            action={`products/${productId}`}
            create_button_text = "Editar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            asMultipart = {!productIsVariable}
            validate={() => {
                if (!productIsVariable && editSelectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
            content = {
                productIsVariable ?
                <div className='form-col'>
                    <TextInput id="name" label="Nombre" required default_value={productName}/>
                    <TextInput type="textarea" id="description" label="Descripción" default_value={productDescription}/>

                    <Dropdown id="category" label="Categoría" accept_empty default_value={productCategory}
                        options = {categories}
                    />
                </div> :
                <div className='form-col'>

                    <div className='form-col'>
                        {editSelectedItems.length > 0 &&
                            <div className="dynamic-col form-col" style={{gap:"4px", alignItems:"flex-start", border: "1px dashed black", padding:"8px"}}>
                                {editSelectedItems.map((itemId, index) => (
                                    <p key={"edit-"+index}>{itemId.name}</p>
                                ))}
                            </div>
                        }

                        <button type="button" className='action-button light-pink' onClick={(e) => {
                            e.preventDefault();
                            editSelectItemsModalRef.current?.open()}}
                        >
                            + Item
                        </button>
                    </div>
                    { editSelectedItems.map((item, index) => (
                        <input type="hidden" name="item_ids" value={item.id} key={"edit-"+index}/>
                    )) }

                    <TextInput id="name" label="Nombre" required default_value={productName}/>
                    <TextInput id="sku" label="SKU" required default_value={productSku}/>

                    <TextInput type="textarea" id="description" label="Descripción" default_value={productDescription}/>

                    <NumberInput id="price" label="Precio ($)" required min="0" step="0.01" pattern="^\d+(,\d{1,2})" default_value={productPrice}/>

                    <Dropdown id="category" label="Categoría" accept_empty default_value={productCategory}
                        options = {categories}
                    />

                    <UploadImage id="image" label="Foto" default_value={productImage} />

                    <Modal ref={editSelectItemsModalRef} children = {[
                        <SelectItems
                            selectedItems={[...editSelectedItems]}
                                onSelectionChange={(s) => {
                                    editSetSelectedItems(s);
                                }}
                                key="edit-selected-items"
                                onConfirm={(s) => {
                                    editSetSelectedItems(s);
                                    editSelectItemsModalRef.current?.close();
                                }
                            } />
                    ]} />

                </div>
            }
        />
    )

});

const onRowEdit = ( editFormRef, row ) => {
    editFormRef.current?.setProductId(row.id)
    editFormRef.current?.setProductName(row.name)
    editFormRef.current?.setProductIsVariable(row.is_variable)
    editFormRef.current?.setProductDescription(row.description)
    editFormRef.current?.setProductCategory(row.category.name)
    editFormRef.current?.setProductSku(row.sku)
    editFormRef.current?.setProductPrice(row.price)
    editFormRef.current?.setProductImage(row.image_url ?? "")
    editFormRef.current?.editSetSelectedItems([...row.items]);
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

const renderCbs = {
    "category": (params) => (
        params.value ? params.value.name : ""
    ),
    "image_url": (params) => (
        params.value ?
        <img
            src={"http://localhost:8000/api/"+params.value}
            alt="preview"
            className='table-image-preview'
            onClick={(e) => e.stopPropagation()}
        /> :
        <span></span>
    ),
    "is_variable": (params) => (
        params.value ? "Sí" : "No"
    ),
    "items": (params) => (
        params.value && params.value.length ?
        <div className='form-row align-center'>
            {params.value.length}
            {/* <button type="button" className='icon-button light-pink' onClick={}><FaEye /></button> */}
        </div>
        :<div></div>
    ),
    "price": (params) =>(
        params.value ? ( "$ " + params.value ) : "$ -"
    )
}
const header_names = {
    "category": "Categoría",
    "image_url" : "Image",
    "is_variable": "Variable"
}

const Products = ( props ) => {
    const pageRef = useRef();
    const deleteFormRef = useRef();
    const editFormRef = useRef();

    const createForm = <NewProductForm
        key="new-product-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />;

    const editForm = <ProductEditForm
        key="edit-product-form"
        ref={editFormRef}
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
            onRowDelete={(r) => onRowDelete(deleteFormRef,r)}
            onRowEdit={(r) => onRowEdit(editFormRef,r)}
            modal_children={[createForm]}
            modal_delete_children={[deleteForm]}
            modal_edit_children={[editForm]}
            table_render_callbacks = {renderCbs}
            table_header_names = {header_names}
        />
    );
}

export default Products;