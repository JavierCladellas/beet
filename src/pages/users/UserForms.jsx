import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import Form from '../../components/Form';

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

const UserEditForm = ( props ) => {
    const rolOpts = getValidRolOptions(props.userRole);

    return (
        <Form title="Editar Usuario"
            method="put"
            action={`users/${props.id}`}
            create_button_text = "Guardar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <TextInput type="email" id="email" label="Email" required default_value={props.email} />
                    <Dropdown id="role" label="Rol" required default_value={props.role}
                        options = {rolOpts} />
                </div>
            }
        />
    )
};


const UserDeleteForm = ( props ) => {
    return (
        <Form title="Eliminar Usuario"
            method="delete"
            action={`users/${props.id}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <p>¿Estás seguro de que quieres eliminar el usuario con email: <strong>{props.email}</strong>?</p>
                </div>
            }
        />
    )
};



export { UserCreateForm, UserEditForm, UserDeleteForm };