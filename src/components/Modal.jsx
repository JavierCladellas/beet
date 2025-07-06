import '../styles/Modal.css'
import { IoMdClose } from "react-icons/io";

import { useRef,forwardRef, useImperativeHandle} from 'react';


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