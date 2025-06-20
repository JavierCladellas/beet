import ProductCard from "./ProductCard";
import '../styles/HomeSection.css'
import SideSection from "./sections/SideSection";
import FullSection from "./sections/FullSection";
import ClientsSection from "./sections/ClientSection";


const Home = (props) => {
    const sections = props.sections;
    return (
        <div>
            {sections.map((section, index) => (
                section.type === "side_section" ?
                    <SideSection key={index} section={section} /> :
                section.type === "full_section" ?
                    <FullSection key={index} section={section} /> :
                section.type === "clients_grid" ?
                    <ClientsSection key={index} section={section} /> :
                null
            ))}
        </div>
    )
}

export default Home;