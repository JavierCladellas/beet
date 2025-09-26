import { useRef, useState } from 'react';

import '../styles/Form.css'

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const Form = ( props ) => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        const modalRef = formRef.current.closest('.modal');
        if (modalRef) {
            modalRef.close();
            document.body.classList.remove('no-scroll');
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

            closeModal();
        }
        props.onCancel?.();
    };

    const onSuccess = (result) => {
        setLoading(false);
        closeModal();

        props.onSuccess?.(result);
    }

    const onError = (error) => {
        setLoading(false);
        props.onError?.(error);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (loading) return;
        setLoading(true);

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        if ( props.validate && !props.validate() ) {
            setLoading(false);
            return;
        }


        try {
            const response = await fetch(apiUrl + (props.action ?? '#'), {
                method: props.method ?? 'POST',
                credentials: 'include',
                withCredentials: true,
                headers: props.asMultipart ? {} : {
                    'Content-Type': "application/json",
                },
                body: props.asMultipart ? formData : JSON.stringify(data)
            });

            if (response.ok){
                onSuccess(response);
            }
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
                    <button type="button" className='action-button light-gray' onClick={cancelHandler} disabled={loading}>Cancelar</button>
                }
                { props.create_button_text &&
                    <button
                        className='action-button light-pink'
                        disabled={loading}
                    >
                        {loading ? <span className="spinner"></span> : props.create_button_text}
                    </button>
                }
            </div>
        </form>
    )
};


export default Form;