import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { IoCart } from "react-icons/io5";

import '../styles/Navbar.css';
import '../styles/Cart.css';
import '../styles/HamburgerMenu.css';


const apiUrl = process.env.REACT_APP_BEET_API_URL;

const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => { setMenuActive(!menuActive); };
    const [cartQtty, setCartQtty] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const location = useLocation();
    const cartRef = useRef(null);

    const handleNavClick = (path) => {
        if (path === location.pathname) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setMenuActive(false);
    };

    const updateCartFromStorage = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        const qty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        setCartQtty(qty);
        const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
        setSubtotal(total);
    };

    useEffect(() => {
        updateCartFromStorage();
        window.addEventListener("storage", updateCartFromStorage);
        return () => {
            window.removeEventListener("storage", updateCartFromStorage);
        };
    }, []);

    // Close cart dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className='sticky'>
            <span className={`hamburger-icon ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                <i></i> <i></i> <i></i>
            </span>
            <div className={`navbar-buttons ${menuActive ? 'active' : ''}`}>
                {navbar_buttons.map((button) => (
                    <Link className="navbar-button" to={button.link} key={button.key} onClick={() => handleNavClick(button.link)}>
                        <p>{button.name}</p>
                    </Link>
                ))}
            </div>
            <div className='cart-icon-container' ref={cartRef}>
                <button
                    className='cart-icon'
                    onClick={() => setCartOpen(!cartOpen)}
                >
                    <IoCart />{cartQtty > 0 && <span>{cartQtty}</span>}
                </button>

                {cartOpen && cartQtty > 0 && (
                    <div className="cart-summary">
                        <ul className="cart-summary-list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-summary-item">
                                    <img src={apiUrl + item.image_url} alt={item.name} />
                                    <div className="cart-summary-details">
                                        <p className="cart-summary-name">{item.name}</p>
                                        <p className="cart-summary-qty">
                                            {item.qty} × $ {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary-subtotal">
                            <span>Subtotal:</span>
                            <span>$ {subtotal.toFixed(2)}</span>
                        </div>
                        <Link to="/cart" className="action-button light-pink " onClick={() => setCartOpen(false)}>
                            Ir al Carrito
                        </Link>
                        <br />
                        <Link to="/checkout" className="action-button pink " onClick={() => setCartOpen(false)}>
                            Pagar
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;