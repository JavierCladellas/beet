import Section from "../components/Sections";
import { ProductCard2, StepCard1, ReviewCard } from "../components/Cards";
import HeroCarousel from "../components/HeroCarousel";
import { FaStar } from "react-icons/fa";

import "../styles/Grid.css";
import FullCarousel from "../components/FullCarousel";



const Personaliza = (props) => {
    const sections = props.sections;

    return (
        <div className="page">
            <Section section={sections.hero} children={[
                <HeroCarousel key="hero" images={sections.hero.children.images} />
            ]} />
            <Section section =  {sections.steps} children = {[
                <div className="grid-row" key="steps">
                    {sections.steps.children.steps.map((step, index) => (
                        <StepCard1 step={step} key={index} />
                    ))}
                </div>
            ]}/>
            <Section section = {sections.product_carousel} children = {[
                <FullCarousel key="product-carousel" images={sections.product_carousel.children.images} />
            ]}/>
            <Section section = {sections.suggestions} children = {[
                <div className="grid-row" key="products2">
                    {sections.suggestions.children.products.map((product, index) => (
                        <ProductCard2 product={product} key={index} />
                    ))}
                </div>
            ]}/>
            <Section section = {sections.reviews} children = {[
                <div className="grid-row" key="reviews">
                    {sections.reviews.children.reviews.map((review, index) => (
                        <ReviewCard review = {review} key={index} />
                    ))}
                </div>,
                <div className='stars-container' key="stars">
                    {[...Array(5)].map((_, i) => (
                        <FaStar className="star-icon" key = {i}/>
                    ))}
                </div>
            ]}/>
            <Section section = {sections.contact} />
        </div>
    );
};

export default Personaliza;
