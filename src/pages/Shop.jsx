import { useEffect, useRef, useState } from "react";
// import Section from "../components/Sections";
import { ProductCard3 } from "../components/Cards";
import Modal from "../components/Modal";

import "../styles/Grid.css";


const apiUrl = process.env.REACT_APP_BEET_API_URL;



const ProductModal = ( props ) => {
    return <Modal ref = {props.ref} children = {[
        <div className="product-modal-content">
            <img src={apiUrl+props.product?.image_url} />
            <h3>{props.product?.name}</h3>
            <span className="product-price">$ {props.product?.price.toFixed(2)}</span>
            <p className="product-description">{props.product?.description}</p>
            <button className="add-to-cart-action-btn action-button pink">Anadir al carrito</button>
        </div>
    ]} />
}





const Shop = ( props ) => {
    const sections = props.sections;
    const productModalRef = useRef();
    const [productOpened, setProductOpened] = useState(null);

    const [filteredProducts, setFilteredProducts] = useState([]);


    const productModal = <ProductModal ref = {productModalRef} product = {productOpened}/>

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
                        onCardClick = { (e) => {
                            setProductOpened(prod);
                            productModalRef.current?.open();
                        } }
                        apiUrl = {apiUrl}/>
                )}
            </div>
            {productModal}
        </div>
    )
}

export default Shop;