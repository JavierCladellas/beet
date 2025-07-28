
import '../styles/Page.css'
import '../styles/Button.css';

import Modal from "../components/Modal.jsx";
import { useRef,useEffect,useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import dev_env from '../data/DevEnv.json'
import Table from '../components/Table';


const Page = forwardRef((props,ref) => {
    const modalRef = useRef();
    const [table_data, setTableData] = useState([]);
    const [table_cols, setTableColumns] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchTableData = useCallback(() => {
        setLoading(true);
        fetch(dev_env.url + props.api_endpoint, {
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
        <Table
            rows={table_data}
            columns={table_cols}
            loading={loading}
            onEdit={props.onRowEdit}
            onDelete={props.onRowDelete}
        />
        <Modal ref={modalRef} children = {props.modal_children}/>
    </div>
);
})


export default Page;