
import { useEffect,useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import Modal from '../../components/Modal';
import { OrderDeleteForm, OrderEditForm } from './OrderForms';
import Dropdown from '../../components/Dropdown';
import "../../styles/Cards.css";

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const statusOpts = [
    {value:"pending",label:"PENDIENTE"},
    {value:"processing",label:"PROCESANDO"},
    {value:"ready",label:"LISTA"},
    {value:"delivered",label:"ENTREGADA"},
    {value:"cancelled",label:"CANCELADA"}
]

const paymentStatusOpts = [
    {value:"pending",label:"PENDING"},
    {value:"accepted",label:"ACCEPTED"},
    {value:"denied",label:"DENIED"},
    {value:"refunded",label:"REFUNDED"}
]


const OrderTable = forwardRef((props, ref) => {
    const [ tableData, setTableData ] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ deleteForm, setDeleteForm ] = useState(<OrderDeleteForm key="delete-order-form"/>);
    const deleteModalRef = useRef(null);
    const deleteModal = <Modal key="delete-order-modal" ref={deleteModalRef} children={[ deleteForm ]} />

    const [editForm, setEditForm] = useState(<OrderEditForm key="edit-order-form"/>);
    const editModalRef = useRef(null);
    const editModal = <Modal key="edit-order-modal" ref={editModalRef} children={[editForm]} />


    const detailModalRef = useRef(null);
    const [detail, setDetail] = useState();
    const detailModal = <Modal key="detail-modal" ref={detailModalRef} children={[detail]}/>



    const tableColumns = [
        { field: "id", headerName:"", width:150, flex: 0},
        { field: "code", headerName:"Codigo", width: 150, flex:1},
        { field: "status", headerName: "Status", width: 125,
            renderCell: (params) => (
                params.value ?
                <Dropdown key="status" default_value={params.value}
                    onChange = {(e) => {
                        fetch( apiUrl + `orders/status/${params.row.id}`, {
                            method: 'PUT',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({status: e.target.value})
                        })
                        .then( response => response.json() )
                        .then( data => { return fetchTableData(); } )
                        .catch(error => { console.error("Error Updating status:", error); })
                    }}
                    options = {statusOpts}
                />
                : ""
            )
        },
        { field: "customer", headerName: "Cliente", minWidth: 200, flex:1,
            renderCell: (params) => (
                params.value ?
                <div style={{display:"flex",justifyContent:"space-between", paddingRight: "32px"}}>
                    {params.value.name}
                    <IconButton aria-label="edit" size="small"
                        onClick={
                            (e)=>{e.stopPropagation();
                            setDetail(
                                <div key="client-detail">
                                <h2>Orden <u>{params.row.code}</u></h2>
                                <br/>
                                <span style={{display:"flex", gap:"8px"}}>Nombre: <p><b>{params.value.name}</b></p> </span>
                                <span style={{display:"flex", gap:"8px"}}>Email: <p><b>{params.value.email}</b></p> </span>
                                <span style={{display:"flex", gap:"8px"}}>Cel: <p><b>{params.value.telephone}</b></p> </span>
                                </div>
                            )
                            detailModalRef.current?.open(); }
                        }
                    >
                        <AiFillEye/>
                    </IconButton>
                </div> :
                ""
            )
        },
        { field:"delivery", headerName: "Delivery", width: 350, minWidth:250, flex:2,
            renderCell: (params) => (
                params.value ?
                ( params.value.delivery_type === "pickup" ? "PickUp" :
                    <div style={{display:"flex",justifyContent:"space-between", paddingRight: "32px"}}>
                        {params.value.municipality}  -  {params.value.department} - {params.value.address}
                        <IconButton aria-label="edit" size="small"
                            onClick={
                                (e)=>{e.stopPropagation();
                                setDetail(
                                    <div key="delivery-detail">
                                    <h2>Orden <u>{params.row.code}</u></h2>
                                    <br/>
                                    <p>{params.value.municipality} - {params.value.department} <b>($ {params.value.delivery_amount})</b></p>
                                    <br/>
                                    <p>{params.value.address}</p>
                                    <br/>
                                    {params.row.special_notes ?
                                        <p>Notas: <br/> {params.row.special_notes} </p>
                                        : ""
                                    }
                                    </div>
                                )
                                detailModalRef.current?.open(); }
                            }
                        >
                            <AiFillEye/>
                        </IconButton>
                    </div>
                )
                : "")
        },

       { field: "total_amount", headerName: "Total", minWidth:70, flex:0.5,
            renderCell:(params) =>( params.value ? ( "$ " + params.value ) : "$ -" )
       },

        { field: "payment_method", headerName: "Pago (tipo)", width:100,
            renderCell: (params) => (params.value ?
                params.value === "card" ? "Card" : ( params.value === "bank_transfer" ? "Bank" : "" )
                : "")
        },

        { field: "payment_status", headerName: "Pago (status)", width:120,
            renderCell: (params) => (
                params.value ?
                <Dropdown key="status" default_value={params.value}
                    onChange = {(e) => {
                        fetch( apiUrl + `orders/payment_status/${params.row.id}`, {
                            method: 'PUT',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({payment_status: e.target.value})
                        })
                        .then( response => response.json() )
                        .then( data => {
                            return fetchTableData();
                        } )
                        .catch(error => { console.error("Error Updating status:", error); })
                    }}
                    options = {paymentStatusOpts}
                />
                : ""
            )
        },

        {field:"order_items", headerName: "", width:50,
            renderCell: (params) => (
                params.value ?
                <div style={{display:"flex",justifyContent:"space-between", paddingRight: "32px"}}>
                    {params.value.length}
                    <IconButton aria-label="edit" size="small"
                        onClick={
                            (e)=>{e.stopPropagation();
                            setDetail(
                                <div key="order-items-detail" style={{display:"flex", flexDirection:"column", gap:"32px"}}>
                                    <h2>Orden <u>{params.row.code}</u></h2>
                                    <div className='order-products'>
                                        {params.value.map((it)=>(
                                            <div className='order-product-card'>
                                                <div className='img-container'>
                                                    <img src= {apiUrl + it.variant.image_url} alt="order product"/>
                                                </div>
                                                <div className='order-product-card-content'>
                                                    <span><b>{it.variant.sku}</b></span>
                                                    <span>{it.variant.name}</span>
                                                    <span>Precio: <b>$ {it.variant.price * it.quantity}</b></span>
                                                    <span>Cantidad: <b>{it.quantity}</b></span>
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </div>

                                    <span style={{display:"flex", width:"100%", textAlign:"center", justifyContent:"center", gap:"8px"}}>Total: <b>$ {params.row.total_amount}</b></span>
                                </div>
                            )
                            detailModalRef.current?.open(); }
                        }
                    >
                        <AiFillEye/>
                    </IconButton>
                </div> : ""
            )
        },

        {field: "special_notes", headerName: "Notas", width:200, flex:1},

        {
            field:"actions", headerName: " ", width:20,
            sortable: false, filterable: false, disableExport: true,
            renderCell: (params) => (
                <>
                {/* <IconButton aria-label="edit" size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditForm(<OrderEditForm key={`edit-order-form-${params.row.id}`} id={params.row.id} userRole={props.userRole} onSuccess={fetchTableData}/>)
                        editModalRef.current?.open();
                    }}
                >
                    <AiFillEdit />
                </IconButton> */}
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
            {detailModal}
        </div>
    );
});




export default OrderTable;
