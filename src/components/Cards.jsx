import { FiTarget } from 'react-icons/fi';
import '../styles/Cards.css';
import { PiHandshakeLight, PiLightbulbFilament } from 'react-icons/pi';
import { BsLightning } from 'react-icons/bs';
import { LuPackageCheck } from 'react-icons/lu';
import { GiHumanTarget } from 'react-icons/gi';
import { Fragment } from "react";



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

const MemberCard = (props) => {
    const member = props.member;
    return (
        <div className="member-card">
            <div className="member-image-container">
                <img loading='lazy' src={member.image} alt={member.name} />
            </div>
            <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-description">{member.role}</p>
            </div>
        </div>
    );
}

const ProductCard1 = (props) => {
    const product = props.product;
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img loading='lazy' src={product.image} alt={product.name}/>
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
}

const ProductCard2 = (props) => {
    const product = props.product;
    return (
        <div className="product-card2">
            <img loading='lazy' src={product.image} alt={product.name} />
            <div className="product-name">
                <h3>{product.name}</h3>
            </div>
        </div>
    );
}


const ClientCard1 = (props) => {
    const client = props.client;
    return (
        <div className="client-card">
            <img loading='lazy' src={client.logo} alt={client.name} />
        </div>
    );
}


const StepCard1 = (props) => {
    const step = props.step;
    return (
        <div className="step-card">
            <div>
            <i className="step-number">{step.number}</i>
            <h3>{step.title}</h3>
            </div>
            <p>{step.description}</p>
        </div>
    );
}


const StepCard2 = (props) => {
    const step = props.step;
    return (
        <div className="step-card2">
            <div>
                <i className="step-number2">{step.number}</i>
                <h3>{step.title}</h3>
            </div>
            <div>
                <div></div>
                <p>{step.description}</p>
            </div>
        </div>
    );
}

const ReviewCard = (props) => {
    const review = props.review;
    return (
        <div className="review-card">
            <i className="review-icon">
                <img loading='lazy' src="/icons/likes.webp" alt="review icon" />
            </i>
            <p>{parseText(review.comment)}</p>
            <b> - {parseText(review.name)}</b>
        </div>
    );
}


function iconFactory(iconName) {
    switch (iconName) {
        case 'target':
            return <FiTarget/>
        case "lightbulb":
            return <PiLightbulbFilament/>
        case "lightning":
            return <BsLightning/>
        case "package":
            return <LuPackageCheck/>
        case "handshake":
            return <PiHandshakeLight/>
        case "human_target":
            return <GiHumanTarget/>
        default:
    }
}

const ReasonCard = (props) => {
    const reason = props.reason;
    return (
        <div className="reason-card">
            <div className="reason-icon">
            {iconFactory(reason.icon)}
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
        </div>
    );
}


export { MemberCard, ProductCard1, ProductCard2, ClientCard1, StepCard1, StepCard2, ReviewCard, ReasonCard};