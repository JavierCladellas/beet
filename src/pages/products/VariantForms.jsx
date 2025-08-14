import { useEffect,useState, useRef } from 'react';
import Form from '../../components/Form';
import SelectItems from '../../components/selectItems';
import Modal from '../../components/Modal';
import NumberInput from '../../components/NumberInput';
import TextInput from '../../components/TextInput';
import UploadImage from '../../components/UploadImage';
import { DataGrid } from '@mui/x-data-grid';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IconButton } from '@mui/material';
import AttributeInputSection from '../../components/AttributesInputSection';


const VariantCreateForm = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const selectItemsModalRef = useRef();


    return (
        <Form title={"Nueva Variante de "+props.productName}
            create_button_text = "Crear"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            method="post"
            asMultipart = {true}
            action={`products/${props.productId}/variants`}
            validate={() => {
                if (selectedItems && selectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
            content={
            <div className='form-col'>
                <div className='form-col' >
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
                { selectedItems && selectedItems.map((item, index) => (
                    <input type="hidden" name="item_ids" value={item.id} key={index}/>
                )) }


                <TextInput id="name" label="Nombre" required />

                <TextInput id="sku" label="SKU" required />

                <NumberInput id="price" label="Precio ($)" required min="0" default_value="0" step="0.01" pattern="^\d+(,\d{1,2})"/>

                <AttributeInputSection />

                <UploadImage id="image" label="Foto" />

                <Modal ref={selectItemsModalRef} children = {[
                    <SelectItems key="select-items"
                    selectedItems={[...selectedItems]}
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

const VariantEditForm = ( props ) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const selectItemsModalRef = useRef();

    useEffect(()=>{
        setSelectedItems(props.selectedItems);
    },[props.selectedItems])

    return (
        <Form title={"Editar Variante "+props.name}
            create_button_text = "Editar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            method="put"
            asMultipart = {true}
            action={`variants/${props.id}`}
            validate={() => {
                if (selectedItems && selectedItems.length === 0) {
                    alert("Debe seleccionar al menos un item.");
                    return false;
                }
                return true;
            }}
            content={
            <div className='form-col'>
                <div className='form-col' >
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
                { selectedItems && selectedItems.map((item, index) => (
                    <input type="hidden" name="item_ids" value={item.id} key={index}/>
                )) }


                <TextInput id="name" label="Nombre" required default_value={props.name} />

                <TextInput id="sku" label="SKU" required default_value={props.sku}/>

                <NumberInput id="price" label="Precio ($)" required min="0" default_value={props.price} step="0.01" pattern="^\d+(,\d{1,2})"/>

                <AttributeInputSection default_value={props.variant_attributes} />

                <UploadImage id="image" label="Foto" default_value={props.image} />

                <Modal ref={selectItemsModalRef} children = {[
                    <SelectItems key="select-items"
                    selectedItems={[...selectedItems]}
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

const VariantDeleteForm = ( props ) => {
    return (
        <Form title={"Eliminar Variante " + props.sku }
            method="delete"
            action={`variants/${props.id}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            content={
                <div className='form-col'>
                    <p>¿Seguro que quieres eliminar la variante <strong>{props.name}</strong>?</p>
                </div>
            }
            onSuccess={props.onSuccess}
        />
    )
};




const VariantsModalContent = (props) => {
    const newVariantModal = useRef(null);

    const [variants, setVariants] = useState([]);

    const [ deleteForm, setDeleteForm ] = useState(<VariantDeleteForm key="delete-variant-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-variant-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState();
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-variant-modal" ref={editModalRef} children={[editForm]} />

    const imageModalRef = useRef(null);
    const [imgBig, setImgBig] = useState();
    const imageModal = <Modal key="img-modal" ref={imageModalRef} children={[imgBig]} />

    useEffect(()=>{
        setVariants(props.variants);
    },[props.variants]);


    return (
        <div className="form-col">
            <h2>Variantes de <b>{props.name}</b></h2>
            <DataGrid
                sx={{width:"100%"}}
                columns={[
                    { field: "id", headerName:"", width:0, flex: 0},
                    { field: "sku", headerName:"SKU", width:100, flex: 1,minWidth : 100, maxWidth: 150},
                    { field: "name", headerName:"Nombre", flex: 1,minWidth : 100},
                    { field: "price", headerName:"Precio", flex: 1,minWidth : 100, maxWidth: 150,
                        renderCell:(params) =>( params.value ? ( "$ " + params.value ) : "$ -" )
                    },
                    { field: "image_url", headerName:"", flex: 1,minWidth : 100, maxWidth: 300,
                    sortable: false, filterable: false, disableExport: true,
                    renderCell: (params) => (
                        params.value ?
                        <img
                        src={"http://localhost:8000/api/"+params.value}
                        alt="preview"
                        className='table-image-preview'
                        style={{cursor:"pointer"}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setImgBig(<img src={"http://localhost:8000/api/"+params.value} className='image-full-modal' alt="item"/>);
                            imageModalRef.current?.open();
                        }}
                        /> :
                        <span></span>
                    )},
                    { field: "items", headerName:"items", flex:1, width:80, maxWidth:80,
                    renderCell: (params) => (
                        params.value ? params.value.length : ""
                    )
                    },
                    {
                        field:"actions", headerName: " ", width:100,
                        sortable: false, filterable: false, disableExport: true,
                        renderCell: (params) => (
                            <>
                            <IconButton aria-label="edit" size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditForm(<VariantEditForm key={`edit-variant-form-${params.row.id}`}
                                        id={params.row.id} name={params.row.name} sku={params.row.sku}
                                        price={params.row.price} selectedItems={params.row.items} image={params.row.image_url}
                                        variant_attributes = {params.row.variant_attributes}
                                        onSuccess={ async (res) => {
                                            props.onFormSubmitSuccess(res);
                                            if ( res.ok ){
                                                const updatedVariant = await res.json();
                                                setVariants(prev =>
                                                    prev.map(v => v.id === updatedVariant.id ? updatedVariant : v)
                                                );
                                            }
                                        }}
                                    />)
                                    editModalRef.current?.open();
                                }}
                            >
                                <AiFillEdit />
                            </IconButton>
                            <IconButton aria-label="delete" size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteForm(<VariantDeleteForm key={`delete-variant-form-${params.row.id}`}
                                        id={params.row.id} name={params.row.name} sku={params.row.sku}
                                        onSuccess={ async (res) => {
                                            props.onFormSubmitSuccess(res);
                                            if (res.ok){
                                                setVariants(variants.filter((variant) => variant.id !== params.row.id));
                                            }
                                        }}
                                    />)
                                    deleteModalRef.current?.open();
                                }}
                            >
                                <MdDelete />
                            </IconButton>
                            </>
                        )
                    }
                ]}
                rows={variants}
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false
                      },
                    },
                }}
            />
            <button
                className="select-items-button action-button light-pink"
                type="button"
                onClick={(e) => {newVariantModal.current?.open()}}
            >
                + Nueva Variante
            </button>
            <Modal key="new-variant-modal" ref={newVariantModal}
                children={[
                    <VariantCreateForm key={`new-variant-form-${props.id}`}
                        productId={props.id} productName={props.name}
                        onSuccess={ async (res) => {
                            props.onFormSubmitSuccess(res);
                            if (res.ok){
                                const newVar = await res.json();
                                setVariants([...variants, newVar]);
                            }
                        }}
                    />
                ]}
            />
            {deleteModal}
            {editModal}
            {imageModal}
        </div>
    )
}

export {VariantsModalContent,VariantCreateForm,VariantEditForm}