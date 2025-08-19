import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoCart } from "react-icons/io5";

import '../styles/Navbar.css';
import '../styles/Cart.css';
import '../styles/HamburgerMenu.css';


const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => { setMenuActive(!menuActive); };
    const [cartQtty, setCartQtty] = useState(0);
    const location = useLocation();

    const handleNavClick = (path) => {
        if (path === location.pathname) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setMenuActive(false);
    };
    const updateCartQtyFromStorage = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const qty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        setCartQtty(qty);
    };
    useEffect(() => {
        updateCartQtyFromStorage();
        window.addEventListener("storage", updateCartQtyFromStorage);
        return () => {
          window.removeEventListener("storage", updateCartQtyFromStorage);
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
            <div className='cart-icon-container'>
                <Link className='cart-icon' to="/cart" key="cart-btn">
                    <IoCart />{cartQtty > 0 && <span>{cartQtty}</span>}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;