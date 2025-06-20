import ClientsGrid from "../ClientsGrid";

const ClientsSection = ( props ) => {
    const section = props.section;
    return (
        <section className={"full-width "+ section.section_classes }>
            <div className="body">
                <h2>{section.title}</h2>
                <div className="section-content">
                    <ClientsGrid />
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;