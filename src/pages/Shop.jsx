import { useEffect, useState } from "react";
import Section from "../components/Sections";
import { ProductCard3 } from "../components/Cards";

import "../styles/Grid.css";


const apiUrl = process.env.REACT_APP_BEET_API_URL;

const Shop = ( props ) => {
    const sections = props.sections;

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect( () => {
        setFilteredProducts(props.products);
    }, [props.products])

    return (
        <div className="page">
            {/* <Section section = {sections.banner} /> */}

            <div className="products-grid">
                {filteredProducts.map( (prod, index) =>
                    <ProductCard3 key={index}
                        product = {prod}
                        apiUrl = {apiUrl}/>
                )}
            </div>

        </div>
    )
}

export default Shop;