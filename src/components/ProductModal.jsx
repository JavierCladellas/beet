import Modal from "../components/Modal";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import { IoCart } from "react-icons/io5";
import { PiTrashThin } from "react-icons/pi";
import { Dropdown } from "./Dropdown";

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const ProductModal = (props) => {
    const product = props.product;
    const [quantity, setQuantity] = useState(0);

    const [selectedAttributes, setSelectedAttributes ] = useState({});

    useEffect(() => {
        if (product) {
            const existing = props.cart?.find((item) => item.id === product.variants[0].id);
            setQuantity(existing?.qty || 0);

            setSelectedAttributes(
                Object.fromEntries(
                    product.attributes.map(attr => {
                        const found = product.variants[0].variant_attributes.find(
                            var_attr => var_attr.attribute.id == attr.id
                        );
                        return [attr.id, found?.attribute_value.id];
                    })
                )
            );
        }
    }, [product]);

    const currentVariant = product?.variants.find( ( variant ) => (
        variant.variant_attributes.every(var_attr =>
            selectedAttributes[var_attr.attribute.id] == var_attr.attribute_value.id
        )
    ) );

    const updateQuantity = () => {
        if (!currentVariant) return;
        const existing = props.cart?.find(item => item.id === currentVariant.id);
        setQuantity(existing?.qty || 0);
    }

    useEffect(() => {
        updateQuantity();
    }, [currentVariant, props.cart]);

    const handleDecrease = () => {
        const newQty = Math.max(quantity - 1, 0);
        setQuantity(newQty);
        props.onUpdateCart?.(currentVariant, newQty);
    };

    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        props.onUpdateCart?.(currentVariant, newQty);
    };

    const handleAddToCart = () => {
        setQuantity(1);
        props.onAddToCartClick?.(currentVariant, 1);
    };



    return <Modal ref={props.ref} children={[
        product && currentVariant &&
        <div className="product-modal-content" key="product-modal-content">
            <img src={apiUrl + currentVariant.image_url} alt="product" />
            <div className="product-modal-body">
                <h3 className="product-title">{currentVariant.name}</h3>
                <span className="product-price">$ {currentVariant.price.toFixed(2)}</span>
                <p className="product-description">{parse(product.description.replace(/\n/g, "<br/>"))}</p>



                {
                    product.attributes.length > 0 && product.variants.length > 1 &&
                    product.attributes.map( (attr) => {
                        const current_variant_attribute = currentVariant.variant_attributes.find( (var_attr) => (var_attr.attribute.id == attr.id) )
                        if (current_variant_attribute === undefined)
                            return
                        return <Dropdown key="attribute-dropdown" id="variant_attribute" label = {attr.name} accept_empty required
                            default_value = {current_variant_attribute.attribute_value.id}
                            options = {
                                product.variants.map( (variant) => {
                                    const variant_attribute = variant.variant_attributes.find( (var_attr) => (var_attr.attribute.id == attr.id) );
                                    if (variant_attribute === undefined)
                                        return
                                    return { "value":variant_attribute.attribute_value.id,"label":variant_attribute.attribute_value.value }
                                })
                            }

                            onChange = { (e) => {
                                const selected_attr_value_id = e.target.value;
                                setSelectedAttributes( prev => ({
                                        ...prev,
                                        [attr.id]: parseInt(selected_attr_value_id)
                                }));
                            } }
                        />
                    })
                }




                {props.cart?.find((i) => i.id === currentVariant.id)?.qty > 0 ? (
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
                    <Link to="/cart" className="see-cart-btn action-button pink" onClick={ () => {document.body.classList.remove('no-scroll');}}>
                        <IoCart style={{width:"20px", marginRight:"8px"}}/> <p>Ver Carrito </p>
                    </Link>
                }
            </div>
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