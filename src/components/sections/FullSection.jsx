import { Link } from 'react-router-dom';
import HomeCaroussel from '../HomeCaroussel';



const FullSection = (props) => {
    const section = props.section;
    return (
        <section className={"full-width "+ section.section_classes } style={{
            backgroundImage: `url(${section.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="body">
                <h2>{section.title}</h2>
                <div className="section-content">
                    <p>{section.body}</p>
                    {section.child ?
                        section.child.type == "home_caroussel" ?
                        <HomeCaroussel /> :
                        null
                    : null}
                    <Link className={`action-button ${section.button_classes}`} to={section.button_link}>
                        <p>{section.button_text}</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};


export default FullSection;