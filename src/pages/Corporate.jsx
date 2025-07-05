import Section from "../components/Sections";
import { StepCard2, ReasonCard, ClientCard1 } from "../components/Cards";
import {useRef} from 'react';
import "../styles/Grid.css";
import FullCarousel from "../components/FullCarousel";
import Modal from "../components/Modal";


const Corporate = (props) => {
    const sections = props.sections;
    const modalRef = useRef();

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
                <Modal ref={modalRef} key="how_it_works_modal"/>
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
