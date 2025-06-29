import { useCallback } from 'react';
import '../styles/Carousel.css'
import useEmblaCarousel from 'embla-carousel-react'
import ArrowCircle from '../assets/svg/arrow-circle.jsx';


const FullCarousel = ({ images, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        slidesToScroll: 3,
        containScroll: 'trimSnaps',
        ...options
    })

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])



  return (
    <div className="full-carousel embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
                {images.map((image, index) => (
                <div className="embla__slide" key={index}>
                    <img src={image} alt={`Carousel ${index}`} />
                </div>
                ))}
            </div>
        </div>

        <div className='arrow-container left-arrow'  onClick={onPrevButtonClick}>
            <ArrowCircle />
        </div>
        <div className='arrow-container right-arrow' onClick={onNextButtonClick}>
            <ArrowCircle />
        </div>
    </div>
  )
}

export default FullCarousel
