import { Link } from 'react-router-dom';

import '../styles/Navbar.css';


const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;

    const toggleMenu = () => {
        document.querySelector('.navbar-buttons').classList.toggle('active');  
        document.querySelector('.navbar').classList.toggle('to-col');
    }

    return (  
        <div className="navbar-wrapper">
            <nav className="navbar">
            <div className="navbar-logo"></div>
                <div className="navbar-buttons">
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