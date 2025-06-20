import { Link } from 'react-router-dom';

//ADD REQUEST LOGIC FOR DISPLAYING PRODUCTS
import products from '../data/HomeCarousselProducts.json';
import "../styles/ProductCard.css";
import "../styles/Caroussel.css";
import ProductCard from './ProductCard';

const HomeCaroussel = (props) => {
    return (
        <div className="caroussel" tabIndex="0">
            {/* {<div className="arrow prev" >‹</div>} */}
            <div className="product-items">
                {products && products.map((product,index) => (
                    console.log(product),
                    <ProductCard product={product} key={index} />
                ))}
            </div>

            {/* {<div className="arrow next" >›</div>} */}
        </div>
    );
}

export default HomeCaroussel;