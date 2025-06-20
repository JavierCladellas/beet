import '../styles/ProductCard.css';

const ProductCard = (props) => {
    const product = props.product;
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
}

export default ProductCard;