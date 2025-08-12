import { useState, useRef, forwardRef, useImperativeHandle, useEffect} from 'react';

import dev_env from '../../data/DevEnv.json';
import SelectItems from '../../components/selectItems.jsx';
import Checkbox from '../../components/Checkbox.jsx';
import TextInput from '../../components/TextInput.jsx';
import Dropdown from '../../components/Dropdown.jsx';
import UploadImage from '../../components/UploadImage.jsx';
import Modal from '../../components/Modal.jsx';
import Form from '../../components/Form.jsx';
import NumberInput from '../../components/NumberInput.jsx';


const ProductCreateForm = ( props ) => {
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
                if (!isVariable && selectedItems && selectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
            content={
            <div className='form-col'>
                <Checkbox id="is_variable" label="Producto Variable" checked_default={isVariable} on_change={isVariableHandler}/>

                <div className='form-col' style={{display:isVariable?"none":"flex"}} >
                    {selectedItems && selectedItems.length > 0 &&
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
                ]}/>
            </div>
            }
        />
    )
};


const ProductEditForm = (props) => {
    const selectItemsModalRef = useRef();
    const [selectedItems, setSelectedItems] = useState(props.selectedItems);

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
        <Form title={"Editar Producto "+ props.name}
            method="put"
            key="edit-product-form"
            action={props.isVariable?`products/${props.id}`:`products/variant/${props.id}`}
            create_button_text = "Editar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            asMultipart = {!props.isVariable}
            validate={() => {
                if (!props.isVariable && selectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
            content = {
                props.isVariable ?
                <div className='form-col'>
                    <TextInput id="name" label="Nombre" required default_value={props.name}/>
                    <TextInput type="textarea" id="description" label="Descripción" default_value={props.description}/>

                    <Dropdown id="category" label="Categoría" accept_empty default_value={props.category}
                        options = {categories}
                    />
                </div> :
                <div className='form-col' key="rerender-pls">

                    <div className='form-col'>
                        {selectedItems.length > 0 &&
                            <div className="dynamic-col form-col" style={{gap:"4px", alignItems:"flex-start", border: "1px dashed black", padding:"8px"}}>
                                {selectedItems.map((itemId, index) => (
                                    <p key={"edit-"+index}>{itemId.name}</p>
                                ))}
                            </div>
                        }

                        {/* <button type="button" className='action-button light-pink' onClick={(e) => {
                            e.preventDefault();
                            selectItemsModalRef.current?.open()}}
                        >
                            + Item
                        </button> */}

                    </div>
                    { selectedItems.map((item, index) => (
                        <input type="hidden" name="item_ids" value={item.id} key={"edit-"+index}/>
                    )) }

                    <TextInput id="name" label="Nombre" required default_value={props.name}/>
                    <TextInput id="sku" label="SKU" required default_value={props.sku}/>

                    <TextInput type="textarea" id="description" label="Descripción" default_value={props.description}/>

                    <NumberInput id="price" label="Precio ($)" required min="0" step="0.01" pattern="^\d+(,\d{1,2})" default_value={props.price}/>

                    <Dropdown id="category" label="Categoría" accept_empty default_value={props.category}
                        options = {categories}
                    />

                    <UploadImage id="image" label="Foto" default_value={props.image} />

                    <Modal ref={selectItemsModalRef} key="edit-selected-items-modal" children = {[
                        <SelectItems
                            selectedItems={[...selectedItems]}
                            onSelectionChange={(newItems) => setSelectedItems(newItems)}
                            key="edit-selected-items"
                            onConfirm={(s) => {
                                setSelectedItems(s);
                                selectItemsModalRef.current?.close();
                        }} />
                    ]} />

                </div>
            }
        />
    )

};

const ProductDeleteForm = (props) => {

    return (
        <Form title="Eliminar Producto"
            method="delete"
            action={`products/${props.id}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            content={
                <div className='form-col'>
                    <p>¿Seguro que quieres eliminar el producto <strong>{props.name}</strong>?</p>
                </div>
            }
            onSuccess={props.onSuccess}
        />
    )
};




export {ProductCreateForm, ProductDeleteForm, ProductEditForm};