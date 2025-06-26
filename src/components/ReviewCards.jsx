import '../styles/ReviewCards.css';
import { FaStar } from "react-icons/fa";

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


const ReviewCards = (props) => {

    const reviews = props.reviews;
    return (
        <div className='personaliza-reviews'>
            <div className="personaliza-review-cards">
                {reviews.map((step, index) => (
                    <ReviewCard key={index} review={step} />
                ))}
            </div>
            <div className='stars-container'>
                {[...Array(5)].map((_, i) => (
                    <FaStar className="star-icon" key = {i}/>
                ))}
            </div>
        </div>
    )
}


export default ReviewCards;