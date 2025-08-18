
import Section from "../components/Sections";
import {ProductCard1,ClientCard1} from "../components/Cards";

import "../styles/Grid.css";
import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_BEET_API_URL;

function getRandomElements(arr, x) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, x);
  }

const Home = (props) => {
    const sections = props.sections;

    const [relevantProducts, setRelevantProducts ] = useState([]);

    useEffect( () => {
        setRelevantProducts(
            getRandomElements(props.products.filter((prod) => !prod.is_variable, 3))
        );
    }, [props.products])

    return (
    <div className="page">
        <Section section={sections.personaliza} />
        <Section section={sections.shop} children = {[
            <div className="grid-row" key="shop">
                { relevantProducts.map((product, index) => (
                    <ProductCard1 product={product} apiUrl = {apiUrl} key={index} />
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
        {/* <Section section={sections.eventos} /> */}
    </div>
    );

}

export default Home;