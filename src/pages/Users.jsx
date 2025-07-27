import '../styles/Page.css'
import '../styles/Form.css'

import Page from '../components/Page';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Form from '../components/Form';

const UserForm = ( ) => {
    return (
        <Form title="Nuevo Usuario"
            content = {
                <div className='form-col'>
                <TextInput type="email" id="femail" label="Email" required />
                <TextInput type="password" id="fpassword" label="Password" required/>
                <TextInput type="password" id="fpassword_repeat" label="Repite la password" required/>

                <Dropdown id="frole" label="Rol" required default_value="viewer"
                    options = {[
                        {"value": "super-admin", "label": "Super Admin"},
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
return (
    <Page title="Usuarios"
            create_button_text="+ Nuevo Usuario"
            modal_children={[<UserForm key="new-user-form"/>]}
            className="users-page"
    />
);
}

export default Users;