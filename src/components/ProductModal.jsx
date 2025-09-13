import Modal from "../components/Modal";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";

import { IoCart } from "react-icons/io5";
import { PiTrashThin } from "react-icons/pi";

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const ProductModal = (props) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (props.product) {
            const existing = props.cart?.find((item) => item.id === props.product.id);
            setQuantity(existing?.qty || 0);
        }
    }, [props.product, props.cart]);

    const handleDecrease = () => {
        const newQty = Math.max(quantity - 1, 0);
        setQuantity(newQty);
        props.onUpdateCart?.(props.product, newQty);
    };

    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        props.onUpdateCart?.(props.product, newQty);
    };

    const handleAddToCart = () => {
        setQuantity(1);
        props.onAddToCartClick?.(props.product, 1);
    };
    const product = props.product;
    return <Modal ref={props.ref} children={[
        product &&
        <div className="product-modal-content" key="product-modal-content">
            <img src={apiUrl + product.image_url} alt="product" />
            <h3>{product.name}</h3>
            <span className="product-price">$ {product.price.toFixed(2)}</span>
            <p className="product-description">{product.description}</p>

            {props.cart?.find((i) => i.id === product.id)?.qty > 0 ? (
                <div className="cart-qty-controls" style={{ position: "static", marginTop: "12px" }}>
                    <button type="button" className="qty-btn" onClick={handleDecrease}>{quantity > 1 ? "–": <PiTrashThin/>}</button>
                    <span className="qty-display">{quantity}</span>
                    <button type="button" className="qty-btn" onClick={handleIncrease}>+</button>
                </div>
            ) : (
                <button type="button"
                    className="add-to-cart-action-btn action-button pink"
                    onClick={handleAddToCart}
                >
                    Añadir al carrito
                </button>
            )}
            {quantity > 0 &&
                <Link to="/cart" className="action-button pink" onClick={ () => {document.body.classList.remove('no-scroll');}}>
                    <IoCart style={{width:"20px", marginRight:"8px"}}/> <p>Ver Carrito </p>
                </Link>
            }
        </div>
    ]} />
}


const AddedToCartAlert = ({ id, message, onClose }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        const removeTimer = setTimeout(() => onClose?.(id), 4000);
        return () => { clearTimeout(timer); clearTimeout(removeTimer); };
    }, [id, onClose]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose?.(id), 500);
    };

    return (
        <div className={`added-to-cart-alert ${visible ? "show" : "hide"}`}>
            <span>{message}</span>
            <button className="alert-close-btn" onClick={handleClose}>
                ×
            </button>
        </div>
    );
};

export {ProductModal, AddedToCartAlert}