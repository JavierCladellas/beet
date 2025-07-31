import '../styles/Page.css'
import '../styles/Form.css'

import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import Page from '../components/Page';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Form from '../components/Form';




const getValidRolOptions = ( userRole ) => {
    let rolOpts = [];

    if (userRole === "superadmin") {
        rolOpts.push({"value": "superadmin", "label": "Super Admin"});
    }
    if (userRole === "admin" || userRole === "superadmin") {
        rolOpts.push({"value": "admin", "label": "Admin"});
    }
    if (userRole === "manager" || userRole === "admin" || userRole === "superadmin") {
        rolOpts.push({"value": "manager", "label": "Manager"});
        rolOpts.push({"value": "editor", "label": "Editor"});
        rolOpts.push({"value": "viewer", "label": "Viewer"});
        rolOpts.push({"value": "support", "label": "Support"});
    }

    return rolOpts;
}

const UserCreateForm = ( props ) => {

    // {/* Unrestricted CRUD on orders + products + users  */}
    // {/* Same as super admin for now, maybe without order delete */}
    // {/* CRUD without user management */}
    // {/* Read/write on orders+products  */}
    // {/* Read on orders and products */}
    // {/* Viewer + update order status and minimal access */}
    const rolOpts = getValidRolOptions(props.userRole);

    return (
        <Form title="Nuevo Usuario"
            method="post"
            action="users"
            create_button_text = "Crear"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <TextInput type="email" id="email" label="Email" required />
                    <TextInput type="password" id="password" label="Password" required pattern="^(?=.*\d).{8,}$"/>
                    <TextInput type="password" id="password_repeat" label="Repite la password" required checkAgainst={"password"}/>

                    <Dropdown id="role" label="Rol" required default_value="viewer"
                        options = {rolOpts} />
                </div>
            }
        />
    )
};



const UserEditForm = forwardRef((props, ref) => {
    const rolOpts = getValidRolOptions(props.userRole);

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useImperativeHandle(ref, () => ({ setUserId, setEmail, setRole }));

    return (
        <Form title="Editar Usuario"
            method="put"
            action={`users/${userId}`}
            create_button_text = "Guardar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <TextInput type="email" id="email" label="Email" required default_value={email} />
                    <Dropdown id="role" label="Rol" required default_value={role}
                        options = {rolOpts} />
                </div>
            }
        />
    )
});

const UserDeleteForm = forwardRef((props, ref) => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");

    useImperativeHandle(ref, () => ({
        setUserId,
        setEmail
    }));

    return (
        <Form title="Eliminar Usuario"
            method="delete"
            action={`users/${userId}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <p>¿Estás seguro de que quieres eliminar el usuario con email: <strong>{email}</strong>?</p>
                </div>
            }
        />
    )
});


const onRowEdit = ( editFormRef, row ) => {
    editFormRef.current?.setUserId(row.id);
    editFormRef.current?.setEmail(row.email);
    editFormRef.current?.setRole(row.role);
}

const onRowDelete = ( deleteFormRef, row ) => {
    deleteFormRef.current?.setUserId(row.id);
    deleteFormRef.current?.setEmail(row.email);
}



const Users = ( props ) => {
    const pageRef = useRef();
    const editFormRef = useRef();
    const deleteFormRef = useRef();



    const createForm = <UserCreateForm key="new-user-form"
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
        userRole = {props.userRole}
    />

    const editForm = <UserEditForm key="edit-user-form"
        ref={editFormRef}
        userRole={props.userRole}
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />

    const deleteForm = <UserDeleteForm key="delete-user-form"
        ref={deleteFormRef}
        onSuccess={() => {
            pageRef.current?.refreshTable?.();
        }}
    />

    return (
        <Page title="Usuarios"
                ref={pageRef}
                create_button_text="+ Nuevo Usuario"
                modal_children={[createForm]}
                modal_edit_children = {[editForm]}
                modal_delete_children = {[deleteForm]}
                className="users-page"
                api_endpoint="users"
                onRowEdit={(r) => onRowEdit(editFormRef,r)}
                onRowDelete={(r) => onRowDelete(deleteFormRef,r)}
        />
    );
}

export default Users;