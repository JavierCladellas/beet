import { Link } from 'react-router-dom';

import '../styles/Navbar.css';


const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;

    return (
        <nav>
            <div className="navbar-buttons">
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