import { Link } from "react-router-dom";
import "../styles/Section.css";

import "../styles/Images.css";
import "../styles/Button.css";

const Section = (props) => {
    const section = props.section;
    return (
        <section className={section.layout}>
            { section.image && <div className="image-container background-image" style={{ backgroundImage: `url(${section.image})` }}></div> }
            <div className={"content " + section.content_style}>
                { section.title && <h2>{section.title}</h2> }
                { section.body_text && <p>{section.body_text}</p> }
                { props.children && props.children.map( (child => { return child; } )) }
                { section.button_text && <Link className={"action-button " + section.button_style} to={section.button_link}>{section.button_text}</Link> }
            </div>
        </section>
    );
}

export default Section;