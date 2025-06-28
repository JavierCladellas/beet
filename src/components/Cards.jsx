import '../styles/Cards.css';

const ProductCard1 = (props) => {
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

const ProductCard2 = (props) => {
    const product = props.product;
    return (
        <div className="product-card2">
            <img src={product.image} alt={product.name} />
            <div className="product-name">
                <h3>{product.name}</h3>
            </div>
        </div>
    );
}


const ClientCard1 = (props) => {
    const client = props.client;
    return (
        <div className="client-card">
            <img src={client.logo} alt={client.name} />
        </div>
    );
}


const StepCard1 = (props) => {
    const step = props.step;
    return (
        <div className="step-card">
            <div>
            <i className="step-number">{step.number}</i>
            <h3>{step.title}</h3>
            </div>
            <p>{step.description}</p>
        </div>
    );
}

const ReviewCard = (props) => {
    const review = props.review;
    return (
        <div className="review-card">
            <i className="review-icon">
                <img src="/icons/likes.png" alt="review icon"/>
            </i>
            <p>{review.comment}</p>
            <b> - {review.name}</b>
        </div>
    );
}



export { ProductCard1, ProductCard2, ClientCard1, StepCard1, ReviewCard};