import Section from "../components/Sections";
import { MemberCard } from "../components/Cards";


const About = (props) => {
    const sections = props.sections;

    return (
        <div className="page">
            <Section section = {sections.story} children = {[
                <img loading='lazy' key="signature" src={sections.story.children.signature} alt="Signature" className="signature"  style={{ maxWidth:"80px" }}/>
            ]} />
            <Section section = {sections.team} children = {[
                <div key="team-grid" className="grid-row wrap">
                    {sections.team.children.members.map((member, index) => (
                        <MemberCard member={member} key={index} />
                    ))}
                </div>
            ]} />
            <Section section = {sections.what_we_do} />
            <Section section = {sections.mission} />
            <Section section = {sections.signification} />
        </div>
    );

}

export default About;