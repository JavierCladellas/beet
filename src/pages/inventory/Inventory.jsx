import { useRef } from "react"
import Modal from '../../components/Modal';
import { ItemCreateForm } from "./InventoryForms";
import InventoryTable from "./InventoryTable";


const Inventory = ( props ) => {
    const tableRef = useRef(null)
    const createModalRef = useRef(null);

    const createModal = <Modal key="new-item-modal" ref={createModalRef}
        children = {[
            <ItemCreateForm key="new-item-form"
                userRole = {props.userRole}
                onSuccess={()=> tableRef.current?.refresh()}
            />
        ]}
    />

    const table = <InventoryTable key="inventory-table" ref={tableRef}  userRole={props.userRole}/>

    return (
        <div className="page">
            <div className="title-row">
                <h1>Inventario</h1>
                <button className='action-button light-pink' onClick={() => createModalRef.current?.open()}>
                    + Nuevo Item
                </button>
            </div>

            {createModal}
            {table}

        </div>
    );

}

export default Inventory;