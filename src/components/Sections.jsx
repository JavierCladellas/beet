import { Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Section.css";

import "../styles/Images.css";
import "../styles/Button.css";

function parseInlineHTML(text) {
    const regex = /(<\/?[a-z]+>)/gi; // matches tags like <b>, </b>, <i>, </i>, etc.
    const parts = text.split(regex); // split by tags

    const tagStack = [];

    return parts.map((part, index) => {
        if (part.match(/^<([a-z]+)>$/i)) {
            // Opening tag
            tagStack.push(part.slice(1, -1));
            return null;
        } else if (part.match(/^<\/([a-z]+)>$/i)) {
            // Closing tag
            tagStack.pop();
            return null;
        } else {
            // Text content
            return tagStack.reduceRight((acc, tag) => {
                switch (tag) {
                    case 'b': return <b key={index}>{acc}</b>;
                    case 'i': return <i key={index}>{acc}</i>;
                    case 'u': return <u key={index}>{acc}</u>;
                    default:  return acc;
                }
            }, <Fragment key={index}>{part}</Fragment>);
        }
    });
}

function parseText(text) {
    return text.split('\n').map((line, i) => (
        <Fragment key={i}>
            {parseInlineHTML(line)}
            <br />
        </Fragment>
    ));
}

const Section = (props) => {
    const section = props.section;
    return (
        <section className={section.layout}>
            { section.image && <div className="image-container background-image" style={{ backgroundImage: `url(${section.image})` }}></div> }
            <div className={"content " + section.content_style}>
                { section.title && <h2>{parseText(section.title)}</h2> }
                { section.body_text && <p> {parseText(section.body_text)} </p> }
                { props.children && props.children.map( (child => { return child; } )) }
                { section.button_text && <Link className={"action-button " + section.button_style} to={section.button_link}>{section.button_text}</Link> }
            </div>
        </section>
    );
}

export default Section;