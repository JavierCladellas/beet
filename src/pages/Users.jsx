import '../styles/Page.css'
import '../styles/Form.css'

import Page from '../components/Page';
import TextInput from '../components/TextInput';

const UserForm = ( ) => {
    return (
        <form>
            <h2>Nuevo Usuario</h2>
            <TextInput type="email" id="femail" label="Email" required />
            <TextInput type="password" id="fpassword" label="Password" required/>
            <TextInput type="password" id="fpassword_repeat" label="Repite la password" required/>

            <div className="input-container">
                <select required id="frole" name="frole" defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="super-admin">Super Admin</option> {/* Unrestricted CRUD on orders + products + users  */}
                    <option value="admin">Admin</option> {/* Same as super admin for now, maybe without order delete */}
                    <option value="manager">Manager</option>  {/* CRUD without user management */}
                    <option value="editor">Editor</option>  {/* Read/write on orders+products  */}
                    <option value="viewer">Viewer</option> {/* Read on orders and products */}
                    <option value="support">Support</option> {/* Viewer + update order status and minimal access */}
                </select>
                <label htmlFor="frole">Rol</label>
            </div>

            <button className='action-button light-pink'>Crear</button>
        </form>
    )
};



const Users = ( props ) => {
return (
    <Page title="Usuarios"
            create_button_text="+ Nuevo Usuario"
            modal_children={[<UserForm />]}
            className="users-page"
    />
);
}

export default Users;