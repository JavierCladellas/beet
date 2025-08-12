import { useRef } from "react"
import UserTable from './UserTable';
import { UserCreateForm } from './UserForms';
import Modal from '../../components/Modal';



const Users = ( props ) => {
    const tableRef = useRef(null)
    const createModalRef = useRef(null);

    const createModal = <Modal key="new-user-modal"
        ref={createModalRef}
        children={[
            <UserCreateForm key="new-user-form"
                userRole = {props.userRole}
                onSuccess={() => tableRef.current?.refresh()}
            />
        ]}
    />

    const table = <UserTable key="user-table" ref={tableRef} userRole={props.userRole}/>

    return (
        <div className="page">
            <div className="title-row">
                <h1>Usuarios</h1>
                <button className='action-button light-pink' onClick={() => createModalRef.current?.open()}>
                    + Nuevo Usuario
                </button>
            </div>

            {createModal}
            {table}

        </div>
    );
}

export default Users;