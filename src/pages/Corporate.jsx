import Section from "../components/Sections";
import { StepCard2, ReasonCard, ClientCard1 } from "../components/Cards";
import {useRef, useState} from 'react';
import "../styles/Grid.css";
import "../styles/Form.css";
import FullCarousel from "../components/FullCarousel";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import { Dropdown } from "../components/Dropdown";


const apiUrl = process.env.REACT_APP_BEET_API_URL;


const HowItWorksModal = (props) => {
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault();

        if ( ! formRef.current?.checkValidity())
        {
            alert("Por favor completa los campos requeridos.");
            return;
        }

        const formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());
        setIsLoading(true);



        fetch(apiUrl + "new_corporate_proposal", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        }).catch((error)=>{
            console.log("Error sumbitting data.");
        });

        props.confirmationModalRef.current?.open();
        props.ref.current?.close();
        document.body.classList.add('no-scroll');
    };



    return (
        <Modal ref={props.ref}
            children = {[
            <form key="how_it_works_form" ref={formRef} >
                <h2>Solicita tu propuesta</h2>
                <TextInput id="name" label="Tu nombre" required />
                <TextInput type="tel" id="whatsapp" label="Whatsapp" required pattern="^$|^\+?(?=(?:\D*\d){5,16}\D*$)[\d ]+$" />

                <TextInput id="company" label="Empresa" required />

                <Dropdown id="occasion" label="Ocasión" default_value="" placeholder="" required accept_empty options={[
                    {"value":"aniversario-empresarial", "label":"Aniversario Empresarial"},
                    {"value":"employee-rewards", "label":"Employee Rewards"},
                    {"value":"welcome-to-the-team-kits", "label":"Welcome to the Team kits"},
                    {"value":"welcome-kits-para-clientes-vip", "label":"Welcome kits para clientes VIP"},
                    {"value":"lanzamiento-de-marca", "label":"Lanzamiento de marca"},
                    {"value":"invitacion-a-evento", "label":"Invitación a evento"}
                ]} />

                <Dropdown id="quantity" label="Cantidad" accept_empty
                    default_value="1-12"
                    options={[
                        {"value":"1-12", "label":"1-12"},
                        {"value":"12-30", "label":"12-30"},
                        {"value":"+30", "label":"+30"}
                ]} />
                <Dropdown id="budget" label="Budget" accept_empty
                    default_value="- 15"
                    options={[
                        {"value":"-15", "label":"-15$"},
                        {"value":"20-30", "label":"20$-30$"},
                        {"value":"30-50", "label":"30$-$50"},
                        {"value":"+50", "label":"+$50"}
                ]} />
                <a href={false} className="action-button light-pink"
                    type="sumbit"
                    onClick={(e) => submitHandler(e)}
                >
                    Enviar
                </a>
            </form>
        ]}
    /> )
};

const ConfirmationModal = (props) => {
    return (
        <Modal ref={props.ref} key="confirmation-modal" className="small" children={[
            <p key="confirmation-msg">
                Gracias por tomarnos en cuenta! <br/>
                Hemos recibido tu info, pronto te contactaremos por WhatsApp.
            </p>
        ]}/>
    );
}



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
                <HowItWorksModal ref={modalRef} confirmationModalRef={confirmationModalRef} key="how_it_works_modal"/>,
                <ConfirmationModal ref={confirmationModalRef} key="confirmation-modal"/>
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
