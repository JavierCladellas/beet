import { useEffect, useState } from "react";
import { useLocalStorage } from "../components/LocalStorage";
import { PiTrashThin } from "react-icons/pi";
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BEET_API_URL;


const CartProductCard = (props) => {
    const [quantity, setQuantity] = useState(props.product?.qty ?? 1);

    useEffect(() => {
        if (props.product) {
            setQuantity(props.product.qty);
        }
    }, [props.product]);

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


    return (props.product &&
        <div className="cart-product-card">
            <div className="cart-product-card-image-container">
                <img src={apiUrl + props.product.image_url} alt="cart product" />
            </div>
            <div className="cart-product-card-content-container">
                <h3> {props.product.name} </h3>
                <p> {props.product.description} </p>
                <span> $ {(props.product.price)?.toFixed(2)} </span>

                <div className="cart-qty-controls-cart">
                    <button type="button" className="qty-btn" onClick={handleDecrease}>{quantity > 1 ? "–": <PiTrashThin/>}</button>
                    <span className="qty-display">{quantity ?? ""}</span>
                    <button type="button" className="qty-btn" onClick={handleIncrease}>+</button>
                </div>
            </div>
        </div>
    )
};

const Cart = (props) => {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [orderPrice, setOrderPrice] = useState(null);


    const updateCart = (product, newQty) => {
        setCart((prevCart) => {
            let updatedCart;

            if (newQty <= 0) {
                updatedCart = prevCart.filter((item) => item.id !== product.id);
            } else {
                const exists = prevCart.find((item) => item.id === product.id);
                if (exists) {
                    updatedCart = prevCart.map((item) =>
                        item.id === product.id ? { ...item, qty: Number(newQty) } : item
                    );
                } else {
                    updatedCart = [...prevCart, { ...product, qty: Number(newQty) }];
                }
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setOrderPrice(updatedCart.reduce((sum, prod) => sum + prod.price * prod.qty, 0));

            window.dispatchEvent(new Event("storage"));

            return updatedCart;
        });
    };

    useEffect(() => {
        const updateCartQtyFromStorage = () => {
            const parsedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(parsedCart);
            setOrderPrice(parsedCart.reduce((sum, prod) => sum + prod.price * prod.qty, 0));
        };

        updateCartQtyFromStorage();
        const handler = () => updateCartQtyFromStorage();
        window.addEventListener("storage", handler);
        return () => {
            window.removeEventListener("storage", handler);
        };
    }, []);



    return (
        <div className="page cart-page" style={{flexDirection:"row", justifyContent:"space-between"}}>
            <div className="cart-product-list-container">
                {cart && cart.map((prod) =>
                    <CartProductCard key={"prod_" + prod.id} product={prod} onUpdateCart={updateCart} />
                )}
            </div>
            <div className="checkout-card">
                <span><b>Productos</b></span>
                {
                    cart && cart.map(( prod ) =>
                    <div className="checkout-card-item" key={"prod_summary_" + prod.id}>
                        <p>{prod.qty} x {prod.name} </p> <span className="price"> {Number.isInteger((prod.price * prod.qty)) ? (prod.price * prod.qty) : (prod.price * prod.qty)?.toFixed(2)} $</span>
                    </div>
                )}

                <hr/>
                <div className="checkout-card-item">
                    <span>Subtotal </span> <span> {Number.isInteger(orderPrice) ? orderPrice : orderPrice?.toFixed(2)} $</span>
                </div>
                <Link className="action-button pink" to="/checkout"><p>Checkout</p></Link>
            </div>
        </div>
    );


};


export default Cart;