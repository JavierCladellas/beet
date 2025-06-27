import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import SideSection from "../components/sections/SideSection";
import FullSection from "../components/sections/FullSection";
import ClientsSection from "../components/sections/ClientSection";

import "../styles/Section.css";
import "../styles/Images.css";
import "../styles/Button.css";

const Home = (props) => {
    const sections = props.sections;
    // return (
    //     <div>
    //         {sections.map((section, index) => (
    //             section.type === "side_section" ?
    //                 <SideSection key={index} section={section} /> :
    //             section.type === "full_section" ?
    //                 <FullSection key={index} section={section} /> :
    //             section.type === "clients_grid" ?
    //                 <ClientsSection key={index} section={section} /> :
    //             null
    //         ))}
    //     </div>
    // )

    return (
    <div className="page">
        <section className="side left">
            <div className="image-container background-image"
                style={{ backgroundImage: `url(${sections[0].image})` }}
            >
            </div>
            <div className="content">
                <h2>{sections[0].title}</h2>
                <p>{sections[0].body}</p>
                <Link className="action-button light-pink" to={sections[0].button_link}>{sections[0].button_text}</Link>
            </div>
        </section>
        <section className="vertical">
            <div>
                <h2></h2>
                <p></p>
                {/* <GridH /> */}
                <button className="light-pink"></button>
            </div>
        </section>
        <section className="side right">
            <div className="image-container">
                <img />
            </div>
            <div>
                <h2></h2>
                <p></p>
                <button className="pink"></button> {/* Link ackshually */}
            </div>
        </section>
        <section className="vertical">
            <div>
                <h2></h2>
                {/* <Grid/> */}
            </div>
        </section>
        <section className="vertical">
            <img className="background" />
            <h2></h2>
            <p></p>
            <button className="light-pink"></button> {/* Link ackshually */}
        </section>
    </div>
    );

}

export default Home;