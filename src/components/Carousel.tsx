// src/components/Carousel.tsx
import React from 'react';

interface CarouselProps {
  currentSlide: number;
  sliderImages: string[];
  goToSlide: (index: number) => void;
  prevSlide: () => void;
  nextSlide: () => void;
}

const Carousel: React.FC<CarouselProps> = ({
  currentSlide,
  sliderImages,
  goToSlide,
  prevSlide,
  nextSlide,
}) => {
  return (
    <div className="position-relative mb-5">
      {/* SLIDER */}
      <div className="overflow-hidden rounded-3" style={{ height: '500px' }}>
        <div
          className="d-flex"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 1s ease',
            height: '100%',
          }}
        >
          {sliderImages.map((src: string, index: number) => (
            <div key={index} className="flex-shrink-0 w-100 h-100">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-100 h-100 object-fit-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* DOTS + ARROWS (Centered) */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex align-items-center gap-3 pb-3">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="bg-transparent border-0 text-dark fs-4"
          style={{ cursor: 'pointer' }}
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Dots */}
        <div className="d-flex gap-2">
          {sliderImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-circle border-0 p-1 ${
                currentSlide === i ? 'bg-dark' : 'bg-white border'
              }`}
              style={{ width: '12px', height: '12px', cursor: 'pointer' }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="bg-transparent border-0 text-dark fs-4"
          style={{ cursor: 'pointer' }}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;