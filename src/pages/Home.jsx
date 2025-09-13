
import Section from "../components/Sections";
import { ProductCard3, ClientCard1 } from "../components/Cards";

import { ProductModal, AddedToCartAlert } from "../components/ProductModal";
import { useLocalStorage } from "../components/LocalStorage";

import "../styles/Grid.css";
import { useEffect, useRef, useState } from "react";
const apiUrl = process.env.REACT_APP_BEET_API_URL;

function getRandomElements(arr, x) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, x);
}

const ProductSection = (props) => {
    const productModalRef = useRef();
    const [productOpened, setProductOpened] = useState(null);
    const [alerts, setAlerts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useLocalStorage("cart", []);

    const addToCart = (product, quantity) => {
        const id = Date.now();
        const message = `${product.name} añadido al carrito`;
        setAlerts((prev) => [...prev, { id, message }]);


        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + Number(quantity) }
                        : item
                );
            }
            return [
                ...prevCart,
                { id: product.id, sku: product.sku, price: product.price, name: product.name, description: product.description, image_url: product.image_url, qty: Number(quantity) },
            ];
        });
        window.dispatchEvent(new Event("storage"));
    };

    const updateCart = (product, newQty) => {
        setCart((prevCart) => {
            if (newQty <= 0) {
                return prevCart.filter((item) => item.id !== product.id);
            }
            return prevCart.map((item) =>
                item.id === product.id ? { ...item, qty: newQty } : item
            );
        });
        window.dispatchEvent(new Event("storage"));
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const productModal = <ProductModal key="product-modal" ref={productModalRef}
        product={productOpened}
        cart={cart}
        onAddToCartClick={addToCart}
        onUpdateCart={updateCart}
    />


    useEffect(() => {
        setFilteredProducts(props.products);
    }, [props.products])


    return (
        <>
        <Section section={props.section} children={[
            <div className="grid-row" key="shop">
                {props.relevantProducts.map((product, index) => (
                    <ProductCard3
                        product={product}
                        key={index}
                        apiUrl={apiUrl}
                        cart={cart}
                        onAddToCartClick={() => {
                            addToCart(product, 1)
                        }}
                        onUpdateCart={updateCart}
                        onCardClick={() => {
                            setProductOpened(product);
                            productModalRef.current?.open();
                        }}
                    />
                ))}
            </div>
        ]} />

        {productModal}
        <div className="alert-container">
            {alerts.map((alert) => (
                <AddedToCartAlert
                    key={alert.id}
                    id={alert.id}
                    message={alert.message}
                    onClose={removeAlert}
                />
            ))}
        </div>
        </>
    );
}

const Home = (props) => {
    const sections = props.sections;

    const [relevantProducts, setRelevantProducts] = useState([]);

    useEffect(() => {
        setRelevantProducts(
            getRandomElements(props.products, 3)
        );
    }, [props.products])

    return (
        <div className="page">
            <Section section={sections.personaliza} />
            <ProductSection section={sections.shop} relevantProducts={relevantProducts} />
            <Section section={sections.corporate_gifting} />
            <Section section={sections.clients} children={[
                <div className="full-grid" key="clients">
                    {sections.clients.children.clients.map((client, index) => (
                        <ClientCard1 client={client} key={index} />
                    ))}
                </div>
            ]} />
            {/* <Section section={sections.eventos} /> */}
        </div>
    );

}

export default Home;