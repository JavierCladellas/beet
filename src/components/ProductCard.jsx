import '../styles/ProductCard.css';

const ProductCard = (props) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={props.image} alt={props.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{props.name}</h3>
                <p className="product-description">{props.description}</p>
            </div>
        </div>
    );
}

export default ProductCard;