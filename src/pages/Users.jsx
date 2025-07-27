import '../styles/Page.css'
import '../styles/Form.css'

import { useRef } from 'react';

import Page from '../components/Page';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Form from '../components/Form';



const UserForm = ( props ) => {
    return (
        <Form title="Nuevo Usuario"
            method="post"
            action="users"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                <TextInput type="email" id="email" label="Email" required />
                <TextInput type="password" id="password" label="Password" required pattern="^(?=.*\d).{8,}$"/>
                <TextInput type="password" id="password_repeat" label="Repite la password" required checkAgainst={"password"}/>

                <Dropdown id="role" label="Rol" required default_value="viewer"
                    options = {[
                        {"value": "superadmin", "label": "Super Admin"},
                        {"value": "admin", "label": "Admin"},
                        {"value": "manager", "label": "Manager"},
                        {"value": "editor", "label": "Editor"},
                        {"value": "viewer", "label": "Viewer"},
                        {"value": "support", "label": "Support"}
                    ]} />
                    {/* Unrestricted CRUD on orders + products + users  */}
                    {/* Same as super admin for now, maybe without order delete */}
                    {/* CRUD without user management */}
                    {/* Read/write on orders+products  */}
                    {/* Read on orders and products */}
                    {/* Viewer + update order status and minimal access */}
                </div>
            }
        />
    )
};




const Users = ( props ) => {
    const pageRef = useRef();

    return (
        <Page title="Usuarios"
                ref={pageRef}
                create_button_text="+ Nuevo Usuario"
                modal_children={[<UserForm key="new-user-form"
                onSuccess={() => {
                    pageRef.current?.refreshTable?.();
                }}/>]}
                className="users-page"
                api_endpoint="users"
        />
    );
}

export default Users;