import { Link } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";


import '../styles/Navbar.css';

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const Navbar = (props) => {
    const navbar_buttons = props.navbar_buttons;


    const logout = async () => {
        try {
            const response = await fetch(apiUrl + "logout", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <nav>
            <div className="navbar-buttons">
            {navbar_buttons.map((button) => (
                <Link className="navbar-button" to={button.link} key={button.key}>
                    <p>{button.name}</p>
                </Link>
            ))}
            <button className='logout-btn' onClick={logout}><IoLogOutOutline width={"100%"} /></button>
            </div>

        </nav>
    );
}

export default Navbar;