
import '../styles/Page.css'
import '../styles/Button.css';

import Modal from "../components/Modal.jsx";
import { useRef } from 'react';


const Page = ( props ) => {
    const modalRef = useRef();

return(
    <div className="page">
        <div className="title-row">
            <h1>{props.title}</h1>
            {props.create_button_text && (
            <button className='action-button light-pink' onClick={() => modalRef.current?.open()}>
                { props.create_button_text }
            </button>
            )}
        </div>
        <Modal ref={modalRef} children = {props.modal_children}/>
    </div>
);
}


export default Page;