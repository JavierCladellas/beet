
import FullSection from "../components/sections/FullSection";
import HeroSection from "../components/sections/HeroSection";



const Personaliza = (props) => {
    const sections = props.sections;
    return (
        <div>
            {sections.map((section, index) => (
                section.type === "hero" ?
                    <HeroSection key={index} section={section} images={section.child.images} /> :
                section.type === "full_section" ?
                    <FullSection key={index} section={section} /> :
                null
            ))}
        </div>
    );
};

export default Personaliza;
