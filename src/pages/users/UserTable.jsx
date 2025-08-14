
import { useEffect,useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import dev_env from '../../data/DevEnv.json'
import Modal from '../../components/Modal';
import { UserDeleteForm, UserEditForm } from './UserForms';


const UserTable = forwardRef((props, ref) => {
    const [ tableData, setTableData ] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ deleteForm, setDeleteForm ] = useState(<UserDeleteForm key="delete-user-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-user-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState(<UserEditForm key="edit-user-form"/>);
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-user-modal" ref={editModalRef} children={[editForm]} />

    const tableColumns = [
        { field: "id", headerName:"", width:150, flex: 0},
        { field: "email", headerName:"Email", width:150, flex: 1,minWidth : 100, maxWidth: 400},
        { field: "role", headerName: "Role", width:150, flex: 1,minWidth : 100},

        {
            field:"actions", headerName: " ", width:100,
            sortable: false, filterable: false, disableExport: true,
            renderCell: (params) => (
                <>
                <IconButton aria-label="edit" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditForm(<UserEditForm key={`edit-user-form-${params.row.id}`} id={params.row.id} email={params.row.email} role={params.row.role} userRole={props.userRole} onSuccess={fetchTableData}/>)
                        editModalRef.current?.open();
                    }}
                >
                    <AiFillEdit />
                </IconButton>
                <IconButton aria-label="delete" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteForm(<UserDeleteForm key={`delete-user-form-${params.row.id}`} id={params.row.id} email={params.row.email} onSuccess={fetchTableData}/>)
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
        fetch(dev_env.url + "users", {
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




export default UserTable;
