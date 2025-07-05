import Section from "../components/Sections";
import { StepCard2, ReasonCard, ClientCard1 } from "../components/Cards";
import {useRef} from 'react';
import "../styles/Grid.css";
import FullCarousel from "../components/FullCarousel";
import Modal from "../components/Modal";


const Corporate = (props) => {
    const sections = props.sections;
    const modalRef = useRef();
    const confirmationModalRef = useRef();

    return (
        <div className="page">
            <Section section={sections.hero}/>
            <Section
                section={sections.how_it_works}
                on_button_click={() => modalRef.current?.open()}
                children={[
                    <div key="how">
                        {[...Array(Math.floor(sections.how_it_works.children.steps.length/2))].map((_, index) => (
                            <div className="grid-row" key={index}>
                                {sections.how_it_works.children.steps.slice(index * 2, index * 2 + 2).map((step, stepIndex) => (
                                    <StepCard2 step={step} key={stepIndex} />
                                ))}
                            </div>
                        ))}
                    </div>,
                    <Modal ref={modalRef} key="how_it_works_modal"
                        children = {[
                        <form key="how_it_works_form">
                            {/* TODO: abstract and parameterize this */}
                            <div className="input-container">
                                <label htmlFor="fname">Tu nombre</label>
                                <input type="text" id="fname" name="fname"/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="ftel">Whatsapp</label>
                                <input type="tel" id="ftel" name="ftel"/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="fcompany">Empresa</label>
                                <input type="text" id="fcompany" name="fcompany"/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="foccasion">Ocasión</label>
                                <select id="foccasion" name="foccasion">
                                    <option value="aniversario-empresarial">Aniversario Empresarial</option>
                                    <option value="employee-rewards">Employee Rewards</option>
                                    <option value="welcome-to-the-team-kits">Welcome to the Team kits</option>
                                    <option value="welcome-kits-para-clientes-vip">Welcome kits para clientes VIP</option>
                                    <option value="lanzamiento-de-marca">Lanzamiento de marca</option>
                                    <option value="invitacion-a-evento">Invitación a evento</option>
                                    <option value="Otros">Otros</option>
                                    {/* TODO: otros sbhould take input text */}
                                </select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="fqtty">Cantidad</label>
                                <select id="fqtty" name="fqtty">
                                    <option value="1-12">1-12</option>
                                    <option value="12-30">12-30</option>
                                    <option value="+30">+30</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="fbudget">Budget</label>
                                <select id="fbudget" name="fbudget">
                                    <option value="-15">-15$</option>
                                    <option value="20-30">20$-$30</option>
                                    <option value="30-50">30$-$50</option>
                                    <option value="+50">+$50</option>
                                </select>
                            </div>
                            <button className="action-button light-pink"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    confirmationModalRef.current?.open();
                                    modalRef.current?.close()
                                }}
                            >
                                Enviar
                            </button>
                        </form>
                    ]}
                />,
                <Modal ref={confirmationModalRef} key="confirmation-modal" children={[
                    <p key="confirmation-msg">
                        Gracias por tomarnos en cuenta! <br/>
                        Hemos recibido tu info, proto te contactaremos por WhatsApp.
                    </p>
                ]}/>
            ]}/>
            <Section section = {sections.product_carousel} children = {[
                <FullCarousel key="product-carousel" images={sections.product_carousel.children.images} />
            ]}/>

            <Section section = {sections.why} children = {[
                <div key="why">
                    {[...Array(Math.floor(sections.why.children.reasons.length/3))].map((_, index) => (
                        <div className="grid-row" key={index}>
                            {sections.why.children.reasons.slice(index * 3, index * 3 + 3).map((reason, reasonIndex) => (
                                <ReasonCard reason={reason} key={reasonIndex} />
                            ))}
                        </div>
                    ))}
                </div>
            ]}/>

            <Section section = {sections.motivation} />

            <Section section = {sections.clients} children = {[
                <div className="full-grid" key="clients">
                    {sections.clients.children.clients.map((client, index) => (
                        <ClientCard1 client={client} key={index} />
                    ))}
                </div>
            ]}/>
        </div>
    );
};

export default Corporate;
