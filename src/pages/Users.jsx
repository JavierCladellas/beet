import '../styles/Page.css'
import '../styles/Form.css'

import { useRef } from 'react';

import Page from '../components/Page';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Form from '../components/Form';



const UserForm = ( props ) => {

    {/* Unrestricted CRUD on orders + products + users  */}
    {/* Same as super admin for now, maybe without order delete */}
    {/* CRUD without user management */}
    {/* Read/write on orders+products  */}
    {/* Read on orders and products */}
    {/* Viewer + update order status and minimal access */}
    const rolOpts = [];

    if (props.userRole === "superadmin") {
        rolOpts.push({"value": "superadmin", "label": "Super Admin"});
    }
    if (props.userRole === "admin" || props.userRole === "superadmin") {
        rolOpts.push({"value": "admin", "label": "Admin"});
    }
    if (props.userRole === "manager" || props.userRole === "admin" || props.userRole === "superadmin") {
        rolOpts.push({"value": "manager", "label": "Manager"});
        rolOpts.push({"value": "editor", "label": "Editor"});
        rolOpts.push({"value": "viewer", "label": "Viewer"});
        rolOpts.push({"value": "support", "label": "Support"});
    }


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


const onRowEdit = ( row ) => {
    console.log("Editing row:", row);
}

const onRowDelete = ( row ) => {
    console.log("Deleting row:", row);
}



const Users = ( props ) => {
    const pageRef = useRef();

    return (
        <Page title="Usuarios"
                ref={pageRef}
                create_button_text="+ Nuevo Usuario"
                modal_children={[<UserForm key="new-user-form"
                    onSuccess={() => {
                        pageRef.current?.refreshTable?.();
                    }}
                    userRole = {props.userRole}
                    />]}
                className="users-page"
                api_endpoint="users"
                onRowEdit={onRowEdit}
                onRowDelete={onRowDelete}
        />
    );
}

export default Users;