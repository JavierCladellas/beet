import '../styles/Modal.css'
import { IoMdClose } from "react-icons/io";

import { useRef,forwardRef, useImperativeHandle, useEffect} from 'react';


const Modal = forwardRef((props, ref) => {
    const dialogRef = useRef();

    const modalClose = () => {
        dialogRef.current?.close();
        document.body.classList.remove('no-scroll');
    }
    const modalOpen = () => {
        dialogRef.current?.showModal();
        document.body.classList.add('no-scroll');
    }
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target === dialogRef.current) {
                modalClose();
            }
        };
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.addEventListener('click', handleOutsideClick);
        }
        return () => {
            if (dialog) {
                dialog.removeEventListener('click', handleOutsideClick);
            }
        };
    }, []);
    useImperativeHandle(ref, () => ({
        open: () => modalOpen(),
        close: () => modalClose(),
    }));

    return (
        <dialog ref={dialogRef} className={"modal "+props.className}>
            <div className="modal-content">
                <button className="close-button" onClick={() => modalClose()}>
                    <IoMdClose />
                </button>
                { props.children && props.children.map( (child => { return child; } )) }
            </div>
        </dialog>
    );
});


export default Modal;