import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <div className="footer-wrapper">
            <footer>
                <div className="footer-row logo-row">
                    <img loading='lazy' className="footer-logo beet-logo" src="/logos/beet.webp" alt="Logo" />
                    <img loading='lazy' className="footer-logo" src="/logos/signature2.webp" alt="Beet Signature"/>
                </div>

                <hr className="solid" />

                <div className="footer-row footer-row-content">
                    <div className="footer-col">
                        <p>
                            Conectamos e inspiramos personas a través
                            de regalos personalizados y experiencias
                            memorables, y de paso, te facilitamos la vida.
                        </p>
                        <br/>
                        <img loading='lazy' className="footer-logo" src="/logos/SSL.svg" alt="SSL Verified" />
                    </div>

                    <div className="footer-col">
                        <Link className="footer-nav-button" to={"shop"} key="shop">
                            <p>SHOP</p>
                        </Link>
                        <Link className="footer-nav-button" to={"personaliza"} key="personaliza">
                            <p>PERSONALIZA</p>
                        </Link>
                        <Link className="footer-nav-button" to={"corporate-gifting"} key="corporate-gifting">
                            <p>CORPORATE GIFTING</p>
                        </Link>
                        {/* <Link className="footer-nav-button" to={"events"} key="events" >
                            <p>EVENTOS</p>
                        </Link> */}
                        <Link className="footer-nav-button" to={"about"} key="about">
                            <p>ABOUT US</p>
                        </Link>
                        <Link className="footer-nav-button" to={"faq"} key="faq">
                            <p>FAQ</p>
                        </Link>
                        <Link className="footer-nav-button" to={"terms_and_conditions"} key="terms_and_conditions">
                            <p>TERMS & CONDITIONS</p>
                        </Link>
                    </div>

                    <div className="footer-col contact-col">
                            <p>
                                Alameda Manuel Enrique Araujo 212, CC Feria
                                Rosa, local 105-C, San Salvador, El Salvador
                            </p>
                        <div className="footer-contact">
                            <p>
                                <b>Teléfono:</b> <br/>
                                (503) 7602-5162
                            </p>
                            <p>
                                <b>Email:</b> <br/>
                                <a href="mailto:hello@beetgifts.com"> hello@beetgifts.com </a>
                            </p>
                        </div>
                    </div>
                </div>


                <hr className="solid" />

                <div className="footer-row copyright-row">
                    <div className='card-logos-container'>
                        <img src="/logos/Logos_Serfinsa_Blanco.png" alt="Serfinsa"/>
                        <img src="/logos/VISA.png" alt="Visa"/>
                        <img src="/logos/MASTERCARD.png" alt="MasterCard"/>
                        <img src="/logos/UNION PAY.png" alt="Union Pay"/>
                    </div>
                    <p>BEET ® by Chelú, S.A. de C.V. <br/>Est. 2013</p>
                    <div>
                    </div>
                </div>

            </footer>
        </div>
    );
}

export default Footer;