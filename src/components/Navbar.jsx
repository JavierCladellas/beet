import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../styles/Navbar.css';
import '../styles/HamburgerMenu.css';


const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => { setMenuActive(!menuActive); };

    return (
        <nav className='sticky'>
            <span className={`hamburger-icon ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                <i></i> <i></i> <i></i>
            </span>
            <div className={`navbar-buttons ${menuActive ? 'active' : ''}`}>
                {navbar_buttons.map((button) => (
                    <Link className="navbar-button" to={button.link} key={button.key}>
                        <p>{button.name}</p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;