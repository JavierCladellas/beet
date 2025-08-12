import { useEffect,useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import dev_env from '../../data/DevEnv.json'
import Modal from '../../components/Modal';

import { ProductDeleteForm, ProductEditForm } from './ProductForms';


const ProductTable = forwardRef((props, ref) => {
    const [ tableData, setTableData ] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ deleteForm, setDeleteForm ] = useState(<ProductDeleteForm key="delete-product-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-product-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState();
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-product-modal" ref={editModalRef} children={[editForm]} />


    const tableColumns = [
        { field: "id", headerName:"", width:0, flex: 0},
        { field: "name", headerName:"Nombre", flex: 1,minWidth : 100, maxWidth: 300},
        { field: "sku", headerName:"SKU", width:100, flex: 1,minWidth : 100, maxWidth: 150},
        { field: "price", headerName:"Precio", flex: 1,minWidth : 100, maxWidth: 150,
            renderCell:(params) =>( params.value ? ( "$ " + params.value ) : "$ -" )
        },
        { field: "category", headerName:"Categoría", flex: 1,minWidth : 100, maxWidth: 150,
            renderCell: (params) => ( params.value ? params.value.name : "" )
        },

        { field: "image_url", headerName:"", flex: 1,minWidth : 100, maxWidth: 300,
        sortable: false, filterable: false, disableExport: true,
        renderCell: (params) => (
            params.value ?
            <img
            src={"http://localhost:8000/api/"+params.value}
            alt="preview"
            className='table-image-preview'
            onClick={(e) => e.stopPropagation()}
            /> :
            <span></span>
        )},

        { field: "description", headerName:"Descripción", flex: 1,minWidth : 100},

        {
            field:"actions", headerName: " ", width:100,
            sortable: false, filterable: false, disableExport: true,
            renderCell: (params) => (
                <>
                <IconButton aria-label="edit" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(params.row)
                        setEditForm(<ProductEditForm key="edit-product-form"
                            id = {params.row.id} name = {params.row.name}
                            isVariable = {params.row.is_variable} description = {params.row.description}
                            category = {params.row.category.name} sku = {params.row.sku} price = {params.row.price}
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
                        setDeleteForm(<ProductDeleteForm key="delete-product-form"
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
        fetch(dev_env.url + "products", {
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
        </div>
    );


});



export default ProductTable;