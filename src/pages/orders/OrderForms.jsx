import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import Form from '../../components/Form';


const OrderCreateForm = ( props ) => {
    return (
        <Form title="Nueva Orden"
            method="post"
            action="orders"
            create_button_text = "Crear"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    {/* TODO */}
                </div>
            }
        />
    )
};

const OrderEditForm = ( props ) => {
    return (
        <Form title="Editar Orden"
            method="put"
            action={`orders/${props.id}`}
            create_button_text = "Guardar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    {/* TODO */}
                </div>
            }
        />
    )
};


const OrderDeleteForm = ( props ) => {
    return (
        <Form title="Eliminar Orden"
            method="delete"
            action={`orders/${props.id}`}
            create_button_text = "Eliminar"
            cancel_button_text = "Cancelar"
            onSuccess={props.onSuccess}
            content = {
                <div className='form-col'>
                    <p>¿Estás seguro de que quieres eliminar la orden : <strong>{props.code}</strong>?</p>
                </div>
            }
        />
    )
};



export { OrderCreateForm, OrderEditForm, OrderDeleteForm };