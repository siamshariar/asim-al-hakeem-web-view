import React, { useEffect } from 'react';
import Image from 'next/image';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle'; // Import Swiper styles bundle

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      quote: 'The life of this world is merely enjoyment of delusion',
      name: 'Quran 3:185',
    },
    {
      id: 2,
      quote: 'Indeed, the patient will be given their reward without account',
      name: 'Quran 39:10',
    },
    {
      id: 3,
      quote: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me',
      name: 'Quran 02:152',
    },
  ];

  // Initialize Swiper using useEffect after the component is fully mounted
  useEffect(() => {
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
      new Swiper(swiperElement, {
        modules: [Pagination, Autoplay],
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section className="testimonials bg-testimonials bg-cover bg-right bg-no-repeat bg-fixed section-spacing" style={{ backgroundAttachment: 'scroll' }}>
      <div className="testimonial__container page-container">
        <div className="flex flex-col items-center gap-x-14 xl:flex-row w-full">
          <div className="hidden xl:flex relative w-[300px] h-[300px]">
            <Image 
              src="/img/verse/quran.png" 
              alt="Quran" 
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>

          <div className="max-w-[98%] xl:max-w-[710px]">
            <div className="swiper h-[400px]">
              <div className="swiper-wrapper">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="swiper-slide">
                    <div className="h-full flex flex-col justify-center items-start">
                      <div className="max-w-[680px] mx-auto text-center xl:text-left">
                                                  <p
                          id={`quote-${testimonial.id}`}
                          className="font-light relative text-[34px] text-[#777F81] leading-[140%] lg:leading-[190%] text-center xl:text-left mb-7"
                        >
                          {/* Image Before Quote */}
                          <span className="inline-block mb-3 w-10 h-6 relative">
                            <Image
                              src="/img/bg/quote-left.svg"
                              alt="Quote Icon Left"
                              width={40}
                              height={24}
                              className="inline-block"
                            />
                          </span>

                          <span className="mx-2 text-2xl  sm:text-3xl md:text-3xl text-center lg:text-3xl">{testimonial.quote}</span>

                          {/* Image After Quote */}
                          <span className="inline-block mb-3 w-8 h-6 relative">
                            <Image
                              src="/img/bg/quote-right.svg"
                              alt="Quote Icon Right"
                              width={32}
                              height={24}
                              className="inline-block"
                            />
                          </span>
                        </p>
                        <div className="text-xl md:text-2xl lg:text-2xl center text-[#4c5354] font-semibold">{testimonial.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
