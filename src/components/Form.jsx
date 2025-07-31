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
        closeModal();

        props.onSuccess?.(result);
    }

    const onError = (error) => {
        props.onError?.(error);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data:', data);

        try {
            const response = await fetch(dev_env.url + (props.action ?? '#'), {
                method: props.method ?? 'POST',
                credentials: 'include',
                withCredentials: true,
                headers: {
                },
                body: props.asMultipart ? formData : JSON.stringify(data)
            });

            onSuccess(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Form submission failed');
            }
        } catch (error) {
            onError(error);
        }
    };

    return (
        <form ref={formRef} onSubmit={submitHandler}>
            <h2>{props.title}</h2>

            {props.content ?? <div></div> }

            <div className='form-row justify-end'>
                { props.cancel_button_text &&
                    <button type="button" className='action-button light-gray' onClick={cancelHandler}>Cancelar</button>
                }
                { props.create_button_text &&
                    <button className='action-button light-pink'>{props.create_button_text}</button>
                }
            </div>
        </form>
    )
};


export default Form;