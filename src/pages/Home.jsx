
import Section from "../components/Sections";
import {ProductCard1,ClientCard1} from "../components/Cards";

import "../styles/Grid.css";



const Home = (props) => {
    const sections = props.sections;

    return (
    <div className="page">
        <Section section={sections.personaliza} />
        <Section section={sections.shop} children = {[
            <div className="grid-row" key="shop">
                { sections.shop.children.products.map((product, index) => (
                    <ProductCard1 product={product} key={index} />
                )) }
            </div>
        ]} />
        <Section section={sections.corporate_gifting} />
        <Section section={sections.clients} children = {[
            <div className="full-grid" key="clients">
                {sections.clients.children.clients.map((client, index) => (
                    <ClientCard1 client={client} key={index} />
                ))}
            </div>
        ]}/>
        <Section section={sections.eventos} />
    </div>
    );

}

export default Home;