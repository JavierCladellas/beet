import '../styles/HamburgerMenu.css';

const HamburgerMenu = ({ menuActive, setMenuActive }) => {
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <span className={`hamburger-icon ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
            <i></i>
            <i></i>
            <i></i>
        </span>
    )
}

export default HamburgerMenu;