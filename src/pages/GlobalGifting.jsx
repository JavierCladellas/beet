import Section from "../components/Sections";


const GlobalGifting = (props) => {
    const sections = props.sections;

    return (
        <div className="page">
            <Section section={sections.hero} html_title={
                <h1>
                    <span className="title" style={{color:"white"}}> Global </span>
                    <span className="title" style={{color:"#FFF9C7"}}> Gifting </span>
                </h1>
            }/>
        </div>
    );
};

export default GlobalGifting;
