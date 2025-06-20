import { Link } from 'react-router-dom';



const SideSection = (props) => {
    const section = props.section;
    return (
        <section className={section.section_classes }>
            {section.image ? <div className="image-container" style={{ 
                backgroundImage: `url(${section.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div> : null}
            <div className="body">
                <h2>{section.title}</h2>
                <div className="section-content">
                    <p>{section.body}</p>
                    <Link className={`action-button ${section.button_classes}`} to={section.button_link}>
                        <p>{section.button_text}</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};


export default SideSection;