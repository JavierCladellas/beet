import '../styles/Modal.css'
import { IoMdClose } from "react-icons/io";

import { useRef,forwardRef, useImperativeHandle} from 'react';


const Modal = forwardRef((props, ref) => {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
    }));

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={() => dialogRef.current?.close()}>
                    <IoMdClose />
                </button>
                {props.children}
            </div>
        </dialog>
    );
});


export default Modal;