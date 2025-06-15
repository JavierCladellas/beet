import { Link } from 'react-router-dom';
import '../styles/HomeSection.css';



const HomeSection = (props) => {
    return (
        <section className={`home-section ${props.section_classes}`}
            style={props.background_image ? { backgroundImage: `url(${props.background_image})` } : {}}
        >
            {props.image ? <div className="image-container"
                style={{ backgroundImage: `url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            }>
            </div> : null}
            <div className="home-section-body">
                <h2 className="home-section-title">{props.title}</h2>
                <div className="home-section-content">
                    <p>{props.body_text}</p>
                    {props.children ? <div className="home-section-children">{props.children}</div> : null}
                </div>
                <Link className={`home-section-button ${props.button_classes}`} to={props.button_link}>
                    <p>{props.button_text}</p>
                </Link>
            </div>

        </section>
    )
}

export default HomeSection;