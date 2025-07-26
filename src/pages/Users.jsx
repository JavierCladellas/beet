
import '../styles/Page.css'
import '../styles/Button.css';
import '../styles/Form.css'
import Modal from "../components/Modal.jsx";
import { useRef } from 'react';

const UserForm = ( ) => {
    return (
        <form>
            <h2>Nuevo Usuario</h2>
            <div className="input-container">
                <input required type="email" id="femail" name="femail"/>
                <label htmlFor="femail">Email</label>
            </div>
            <div className="input-container">
                <input required type="password" id="fpassword" name="fpassword"/>
                <label htmlFor="fpassword">Password</label>
            </div>
            <div className="input-container">
                <input required type="password" id="fpassword_repeat" name="fpassword_repeat"/>
                <label htmlFor="fpassword_repeat">Repite la password</label>
            </div>
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
    const modalRef = useRef();

    return (
        <div className="page">
            <div className="title-row">
                <h1>Users</h1>
                <button className='action-button light-pink' onClick={() => modalRef.current?.open()}>
                    + Nuevo Usuario
                </button>
            </div>
            <Modal ref={modalRef} key="users_modal" children = {[<UserForm key="userForm"/>]}/>
        </div>
    );
}

export default Users;