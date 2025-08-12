import { useRef } from "react"
import Modal from '../../components/Modal';
import { ProductCreateForm } from "./ProductForms";
import ProductTable from "./ProductTable";


const Product = ( props ) => {
    const tableRef = useRef(null)
    const createModalRef = useRef(null);

    const createModal = <Modal key="new-product-modal" ref={createModalRef}
        children = {[
            <ProductCreateForm key="new-product-form"
                userRole = {props.userRole}
                onSuccess={()=> tableRef.current?.refresh()}
            />
        ]}
    />

    const table = <ProductTable key="product-table" ref={tableRef}  userRole={props.userRole}/>

    return (
        <div className="page">
            <div className="title-row">
                <h1>Productos</h1>
                <button className='action-button light-pink' onClick={() => createModalRef.current?.open()}>
                    + Nuevo Producto
                </button>
            </div>

            {createModal}
            {table}

        </div>
    );

}

export default Product;