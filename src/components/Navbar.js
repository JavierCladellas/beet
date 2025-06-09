import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../styles/Navbar.css';
import HamburgerMenu from './HamburgerMenu';


const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;
    const [menuActive, setMenuActive] = useState(false);

    return (  
        <div className="navbar-wrapper">
            <nav className="navbar">
            <div className="navbar-logo"></div>
                <HamburgerMenu menuActive={menuActive} setMenuActive={setMenuActive} />
                <div className={`navbar-buttons ${menuActive ? 'active' : ''}`}>
                    {navbar_buttons.map((button) => (
                        <Link className="navbar-button" to={button.link} key={button.key}>
                            <p>{button.name}</p>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;