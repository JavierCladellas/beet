
import '../styles/Page.css'
import '../styles/Button.css';

import Modal from "../components/Modal.jsx";
import { useRef,useEffect,useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import Table from '../components/Table';

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const Page = forwardRef((props,ref) => {
    const modalRef = useRef();
    const modalEditRef = useRef();
    const deleteModalRef = useRef();
    const [table_data, setTableData] = useState([]);
    const [table_cols, setTableColumns] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchTableData = useCallback(() => {
        setLoading(true);
        fetch(apiUrl + props.api_endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                let columns = [];
                if (data.length > 0) {
                    columns = Object.keys(data[0]).map(key => ({
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        width: 150,
                    }));
                }
                setTableData(data);
                setTableColumns(columns);
            })
            .catch(error => {
                console.error("Error fetching:", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    }, [props.api_endpoint]);

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);


    useImperativeHandle(ref, () => ({
        refreshTable: fetchTableData
    }));

    const onRowEdit = ( modal_ref, rowEdit, row ) => {
        modal_ref.current?.open();
        rowEdit(row);
    };

    const onRowDelete = (modal_ref, rowDelete, row ) => {
        modal_ref.current?.open();
        rowDelete(row);
    }


    return(
        <div className="page">
            <div className="title-row">
                <h1>{props.title}</h1>
                {props.create_button_text && (
                <button className='action-button light-pink' onClick={() => modalRef.current?.open()}>
                    { props.create_button_text }
                </button>
                )}
            </div>
            {props.content ?? <div></div>}
            <Modal ref={modalRef} children = {props.modal_children}/>
            <Modal ref={modalEditRef} children={props.modal_edit_children}/>
            <Modal ref={deleteModalRef} children={props.modal_delete_children} />
            <Table
                rows={table_data}
                columns={table_cols}
                loading={loading}
                renderCallbacks ={props.table_render_callbacks}
                headerNames={props.table_header_names}
                checkboxSelection={props.checkboxSelection ?? false}
                onEdit={(row) => {onRowEdit(modalEditRef, props.onRowEdit, row)}}
                onDelete={(row) => {onRowDelete(deleteModalRef, props.onRowDelete, row)}}
            />
        </div>
    );
})


export default Page;