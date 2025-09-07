
import { useEffect,useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import Modal from '../../components/Modal';
import { OrderDeleteForm, OrderEditForm } from './OrderForms';

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const OrderTable = forwardRef((props, ref) => {
    const [ tableData, setTableData ] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ deleteForm, setDeleteForm ] = useState(<OrderDeleteForm key="delete-order-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-order-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState(<OrderEditForm key="edit-order-form"/>);
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-order-modal" ref={editModalRef} children={[editForm]} />

    const tableColumns = [
        { field: "id", headerName:"", width:150, flex: 0},
        { field: "code", headerName:"Codigo", width: 150},
        { field: "customer", headerName: "Cliente"  },

        {
            field:"actions", headerName: " ", width:100,
            sortable: false, filterable: false, disableExport: true,
            renderCell: (params) => (
                <>
                <IconButton aria-label="edit" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditForm(<OrderEditForm key={`edit-order-form-${params.row.id}`} id={params.row.id} userRole={props.userRole} onSuccess={fetchTableData}/>)
                        editModalRef.current?.open();
                    }}
                >
                    <AiFillEdit />
                </IconButton>
                <IconButton aria-label="delete" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteForm(<OrderDeleteForm key={`delete-order-form-${params.row.id}`} id={params.row.id} code={params.row.code} onSuccess={fetchTableData}/>)
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
        fetch(apiUrl + "orders", {
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




export default OrderTable;
