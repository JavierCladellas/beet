import { useRef } from "react"
import OrderTable from './OrderTable';
import { OrderCreateForm } from './OrderForms';
import Modal from '../../components/Modal';

const Orders = ( props ) => {
    const tableRef = useRef(null)
    const createModalRef = useRef(null);

    const createModal = <Modal key="new-order-modal"
        ref={createModalRef}
        children={[
            <OrderCreateForm key="new-order-form"
                userRole = {props.userRole}
                onSuccess={() => tableRef.current?.refresh()}
            />
        ]}
    />
    const table = <OrderTable key="order-table" ref={tableRef} userRole={props.userRole}/>

    return (
        <div className="page">
            <div className="title-row">
                <h1>Ordenes</h1>
                <button className='action-button light-pink' onClick={() => createModalRef.current?.open()}>
                    + Nueva Orden
                </button>
            </div>

            {createModal}
            {table}

        </div>
    );
}

export default Orders;