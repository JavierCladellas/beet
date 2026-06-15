import Section from "../components/Sections";

const GlobalGifting = (props) => {
    const sections = props.sections;

    return (
        <div className="page">
            <Section section={sections.hero} html_title={
                <h1>
                    <span className="title bigger-title" style={{color:"white"}}> Strategic </span>
                    <span className="title bigger-title" style={{color:"#FFF9C7"}}> Gifting </span>
                </h1>
            }/>
            <Section section={sections.cruzando_fronteras} />
            <Section section={sections.quote} />
            {/* <Section section={sections.how_we_work} /> */}
        </div>
    );
};

export default GlobalGifting;
