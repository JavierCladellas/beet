import { useRef } from 'react';



const Form = ( props ) => {
    const formRef = useRef();

    const cancelHandler = ( ) => {
        if (formRef.current) {
            formRef.current.reset();

            const fields = formRef.current.querySelectorAll('input, textarea');
            fields.forEach(field => {
                const event = new Event('input', { bubbles: true });
                field.dispatchEvent(event);
            });
        }
        props.onCancel?.();
    };

    return (
        <form ref={formRef}>
            <h2>{props.title}</h2>

            {props.content ?? <div></div> }

            <div className='form-row justify-end'>
                <button type="button" className='action-button light-gray' onClick={cancelHandler}>Cancelar</button>
                <button className='action-button light-pink'>Crear</button>
            </div>
        </form>
    )
};


export default Form;