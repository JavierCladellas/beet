import { Link } from 'react-router-dom';
import HomeCaroussel from '../HomeCaroussel';
import PersonalizaStep from '../PersonalizaStep';
import ReviewCards from '../ReviewCards';
import FullCaroussel from '../FullCaroussel';



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
                        section.child.type == "personaliza_steps" ?
                        <PersonalizaStep steps={section.child.steps} /> :
                        section.child.type == "reviews" ?
                        <ReviewCards reviews={section.child.reviews} /> :
                        section.child.type == "full_caroussel" ?
                        <FullCaroussel images={section.child.images} /> :
                        null
                    : null}
                    {
                        section.button_text ?
                        <Link className={`action-button ${section.button_classes}`} to={section.button_link}>
                            <p>{section.button_text}</p>
                        </Link> :
                        null
                    }
                </div>
            </div>
        </section>
    );
};


export default FullSection;