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
            //Reset select elements
            const selects = formRef.current.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
            });

            //Reset dynamic-cols by removing its content
            const dynamicCols = formRef.current.querySelectorAll('.dynamic-col');
            dynamicCols.forEach(col => {
                col.innerHTML = '';
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