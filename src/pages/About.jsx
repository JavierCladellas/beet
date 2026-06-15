import Section from "../components/Sections";
import { MemberCard, StepCard3 } from "../components/Cards";


const About = (props) => {
    const sections = props.sections;

    return (
        <div className="page">
            <Section section = {sections.story} children = {[
                <img loading='lazy' key="signature" src={sections.story.children.signature} alt="Signature" className="signature"  style={{ maxWidth:"80px" }}/>
            ]} />
            <Section section = {sections.how_we_roll} children = {[
                <div key="how_we_roll" className="grid-row wrap small-cards">
                    { sections.how_we_roll.children.map((step, index) => (
                        <StepCard3 step={step} />
                    ))}
                </div>
            ]} />
            <Section section = {sections.what_we_do} />
            {/* <Section section = {sections.mission} /> */}
            {/* <Section section = {sections.signification} /> */}
        </div>
    );

}

export default About;
