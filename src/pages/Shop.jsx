import { useEffect, useRef, useState } from "react";
import { ProductCard3 } from "../components/Cards";

import { ProductModal, AddedToCartAlert } from "../components/ProductModal";

import "../styles/Cart.css";
import "../styles/Grid.css";
import { useLocalStorage } from "../components/LocalStorage";

import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const apiUrl = process.env.REACT_APP_BEET_API_URL;


const Shop = (props) => {
    const productModalRef = useRef();
    const [productOpened, setProductOpened] = useState(null);
    const [alerts, setAlerts] = useState([]);

    const query = useQuery();
    const initialCategory = query.get("category");

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
    if (
        initialCategory &&
        props.products.length > 0 &&
        props.products.some(p => p.category?.name === initialCategory)
    ) {
        setSelectedCategories([initialCategory]);
    }
    }, [initialCategory, props.products]);

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
                { id: product.id, sku: product.sku, price: product.price, name: product.name, description: product.description, image_url: product.image_url, has_stock: product.has_stock, qty: Number(quantity) },
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

    const categories = [...new Set(props.products.map(p => p.category?.name).filter(Boolean))];

    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredProducts(props.products);
        } else {
            setFilteredProducts(props.products.filter(p =>
                selectedCategories.includes(p.category?.name)
            ));
        }
    }, [props.products, selectedCategories]);

    return (
        <div className="page">
            <div className="category-chips">
                {categories.map((cat) => (
                    <span
                        key={cat}
                        className={`chip ${selectedCategories.includes(cat) ? "active" : ""}`}
                        onClick={() => toggleCategory(cat)}
                    >
                        {cat}
                    </span>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.map((prod, index) =>
                    <ProductCard3
                        key={index}
                        product={prod}
                        cart={cart}
                        onAddToCartClick={() => {
                            addToCart(prod, 1)
                        }}
                        onUpdateCart={updateCart}
                        onCardClick={() => {
                            if (prod.has_stock){
                                setProductOpened(prod);
                                productModalRef.current?.open();
                            }
                        }}
                        apiUrl={apiUrl}
                    />
                )}
            </div>
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
        </div>
    )
}

export default Shop;