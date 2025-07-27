import { useRef } from 'react';

import dev_env from '../data/DevEnv.json'


const Form = ( props ) => {
    const formRef = useRef();

    const closeModal = () => {
        const modalRef = formRef.current.closest('.modal');
        if (modalRef) {
            modalRef.close();
        }
    }

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

            //Reset image upload previews
            const imageUploads = formRef.current.querySelectorAll('.image-upload-preview');
            imageUploads.forEach(upload => {
                upload.style.backgroundImage = '';
                upload.classList.remove('has-image');
            });

            //close the modal ref if it exists
            closeModal();
        }
        props.onCancel?.();
    };

    const onSuccess = (result) => {
        console.log("Form submitted successfully:", result);

        closeModal();

        props.onSuccess?.(result);
    }

    const onError = (error) => {
        console.error("Form submission failed:", error);
        props.onError?.(error);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(dev_env.url + (props.action ?? '#'), {
                method: props.method ?? 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            onSuccess(result);
        } catch (error) {
            console.error("Form submission error:", error);
            onError(error);
        }
    };

    return (
        <form ref={formRef} onSubmit={submitHandler}>
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