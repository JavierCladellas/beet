import { useEffect,useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import Modal from '../../components/Modal';

import { ProductDeleteForm, ProductEditForm } from './ProductForms';
import { VariantsModalContent } from './VariantForms';
import Checkbox from '../../components/Checkbox';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const ProductTable = forwardRef((props, ref) => {
    const [ tableData, setTableData ] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ deleteForm, setDeleteForm ] = useState(<ProductDeleteForm key="delete-product-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-product-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState();
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-product-modal" ref={editModalRef} children={[editForm]} />


    const [variantsModalContent, setVariantsModalContent] = useState(<VariantsModalContent key="variants-modal-content"/>)
    const variantsModalRef = useRef(null);
    const variantsModal = <Modal key="variants-modal" ref={variantsModalRef} children={[variantsModalContent]} className="full"/>

    const imageModalRef = useRef(null);
    const [imgBig, setImgBig] = useState();
    const imageModal = <Modal key="img-modal" ref={imageModalRef} children={[imgBig]} />

    const tableColumns = [
        { field: "id", headerName:"", width:0, flex: 0},

        { field:"visibility", headerName:"Visible", maxWidth:60,
            renderCell: (params) => (
                <div style={{height:"100%", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Checkbox style={{gap:"0"}}
                        id={"visible_" + params.row.id}
                        checked_default = {params.value}
                        on_change={ (e )=> {
                            e.stopPropagation();
                            fetch( apiUrl + `products/${params.row.id}/visibility`, {
                                method: 'PUT',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({visibility: e.target.checked})
                            })
                            .then( response => response.json() )
                            .then( data => { return fetchTableData(); } )
                            .catch(error => { console.error("Error Updating visibility:", error); })
                        }}
                    />
                </div>
            )
        },

        { field: "name", headerName:"Nombre", flex: 1,minWidth : 100, maxWidth: 300},
        { field: "sku", headerName:"SKU", width:100, flex: 1,minWidth : 100, maxWidth: 150},
        { field: "has_stock", headerName:"Stock", maxWidth:55,
            renderCell: (params) => ( params.value ?
                <IconButton aria-label="edit" size="small">
                    <FaCheckCircle color="green" />
                </IconButton>
                :
                <IconButton aria-label="edit" size="small">
                    <FaExclamationCircle color="red"/>
                </IconButton>
            )
        },
        { field: "price", headerName:"Precio", flex: 1,minWidth : 100, maxWidth: 150,
            renderCell:(params) =>( params.value ? ( "$ " + params.value ) : "$ -" )
        },
        { field: "category", headerName:"Categoría", flex: 1,minWidth : 100, maxWidth: 150,
            renderCell: (params) => ( params.value ? params.value.name : "" )
        },

        { field: "variants", headerName:"Variantes", width:100, flex:1, minWidth:100, maxWidth:150,
            sortable: false, filterable: false,
            renderCell: (params) => (
                params.row.variants ?
                    <div style={{display:"flex", alignItems:"center", justifyContent:"", gap:"32px"}}>
                        {params.row.variants.length}
                        <IconButton aria-label="edit" size="small"
                            onClick={
                                (e)=>{e.stopPropagation();
                                setVariantsModalContent(<VariantsModalContent key={`variants-modal-content-${params.row.id}`}
                                    id={params.row.id} name={params.row.name} variants={params.row.variants}
                                    onFormSubmitSuccess={ () => { fetchTableData(); }}
                                />)
                                variantsModalRef.current?.open(); }
                            }
                        >
                            <AiFillEye/>
                        </IconButton>
                    </div>
                : ""
            )
        },

        { field: "image_url", headerName:"", flex: 1,minWidth : 100, maxWidth: 300,
        sortable: false, filterable: false, disableExport: true,
        renderCell: (params) => (
            params.value ?
            <img
            src={apiUrl+params.value}
            alt="preview"
            style={{cursor:"pointer"}}
            className='table-image-preview'
            onClick={(e) => {
                e.stopPropagation();
                setImgBig(<img src={apiUrl+params.value} className='image-full-modal' alt="item"/>);
                imageModalRef.current?.open();
            }}
            /> :
            <span></span>
        )},

        { field: "items", headerName:"items", flex:1, width:80, maxWidth:80,
        renderCell: (params) => (
            params.value && params.value.length ? params.value.length : " -"
        )
        },

        { field: "description", headerName:"Descripción", flex: 1,minWidth : 100},

        {
            field:"actions", headerName: " ", width:100,
            sortable: false, filterable: false, disableExport: true,
            renderCell: (params) => (
                <>
                <IconButton aria-label="edit" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditForm(<ProductEditForm key={`edit-product-form-${params.row.id}`}
                            id = {params.row.id} name = {params.row.name}
                            isVariable = {params.row.is_variable} description = {params.row.description}
                            category = {params.row.category ? params.row.category.name : ""} sku = {params.row.sku} price = {params.row.price}
                            image = {params.row.image_url} selectedItems = {params.row.items}
                            onSuccess={fetchTableData}
                        />)
                        editModalRef.current?.open();
                    }}
                >
                    <AiFillEdit />
                </IconButton>
                <IconButton aria-label="delete" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteForm(<ProductDeleteForm key={`delete-product-form-${params.row.id}`}
                            id={params.row.id} name={params.row.name}
                            onSuccess={fetchTableData}
                        />)
                        deleteModalRef.current?.open();
                    }}
                >
                    <MdDelete />
                </IconButton>
                </>
            )
        }
    ];


    const fetchTableData = useCallback(()=> {
        setLoading(true);
        fetch(apiUrl + "products", {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => { setTableData(data); })
        .catch(error => { console.error("Error fetching:", error); })
        .finally(() => { setTimeout(() => { setLoading(false); }, 500); });
    },[]);

    useImperativeHandle(ref, () => ({
        refresh: fetchTableData
    }));

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);



    return (
        <div>
            <DataGrid
                rows={tableData}
                columns={tableColumns}
                pageSizeOptions={[5, 10, 100]}
                sx={{ border: 0 }}
                loading={ loading }
                slotProps={{ loadingOverlay: { variant: 'circular-progress', noRowsVariant: 'circular-progress' } }}
                initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false
                      },
                    },
                }}
            />
            {deleteModal}
            {editModal}
            {variantsModal}
            {imageModal}
        </div>
    );


});



export default ProductTable;