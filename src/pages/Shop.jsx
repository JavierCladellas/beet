import { useEffect, useRef, useState } from "react";
// import Section from "../components/Sections";
import { ProductCard3 } from "../components/Cards";
import Modal from "../components/Modal";
import { Link } from 'react-router-dom';
import "../styles/Cart.css";
import "../styles/Grid.css";
import { useLocalStorage } from "../components/LocalStorage";
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

    return <Modal ref={props.ref} children={[
        props.product &&
        <div className="product-modal-content" key="product-modal-content">
            <img src={apiUrl + props.product.image_url} alt="product" />
            <h3>{props.product.name}</h3>
            <span className="product-price">$ {props.product.price.toFixed(2)}</span>
            <p className="product-description">{props.product.description}</p>

            {props.cart?.find((i) => i.id === props.product.id)?.qty > 0 ? (
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
                <Link to="/cart" className="action-button pink">
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



const Shop = (props) => {
    const sections = props.sections;
    const productModalRef = useRef();
    const [productOpened, setProductOpened] = useState(null);
    const [alerts, setAlerts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useLocalStorage("cart", []);

    const addToCart = (product, quantity) => {
        const id = Date.now();
        const message = `${product.name} (${quantity}) añadido al carrito`;
        setAlerts((prev) => [...prev, { id, message }]);


        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + Number(quantity) }
                        : item
                );
            }
            return [
                ...prevCart,
                { id: product.id, sku: product.sku, price: product.price, name: product.name, description: product.description, image_url: product.image_url, qty: Number(quantity) },
            ];
        });
        window.dispatchEvent(new Event("storage"));
    };

    const updateCart = (product, newQty) => {
        setCart((prevCart) => {
            if (newQty <= 0) {
                return prevCart.filter((item) => item.id !== product.id);
            }
            return prevCart.map((item) =>
                item.id === product.id ? { ...item, qty: newQty } : item
            );
        });
        window.dispatchEvent(new Event("storage"));
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const productModal = <ProductModal key="product-modal" ref={productModalRef}
        product={productOpened}
        cart={cart}
        onAddToCartClick={addToCart}
        onUpdateCart={updateCart}
    />


    useEffect(() => {
        setFilteredProducts(props.products);
    }, [props.products])

    return (
        <div className="page">
            {/* <Section section = {sections.banner} /> */}

            <div className="products-grid">
                {filteredProducts.map((prod, index) =>
                    <ProductCard3
                        key={index}
                        product={prod}
                        cart={cart}
                        onAddToCartClick={() => addToCart(prod, 1)}
                        onUpdateCart={updateCart}
                        onCardClick={() => {
                            setProductOpened(prod);
                            productModalRef.current?.open();
                        }}
                        apiUrl={apiUrl}
                    />
                )}
            </div>
            {productModal}

            {/* <div className="alert-container">
                {alerts.map((alert) => (
                    <AddedToCartAlert
                        key={alert.id}
                        id={alert.id}
                        message={alert.message}
                        onClose={removeAlert}
                    />
                ))}
            </div> */}
        </div>
    )
}

export default Shop;