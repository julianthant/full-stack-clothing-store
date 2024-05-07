'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getClothes } from '@/server/get-user-data/get-clothes';
import { ClothesComponent } from '@/components/utils/ClothesComponent';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useRef } from 'react';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ClothesCarousel = () => {
  const { data: products, isFetched } = useQuery({
    queryFn: async () => getClothes(0, 6993, 8, 'freshness'),
    queryKey: ['landing-page-new-arrivals'],
    refetchOnReconnect: false,
  });

  const sliderRef = useRef<Slider>(null);

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container group">
      <Slider {...settings} className="max-w-[1500px] mx-auto w-full">
        {isFetched &&
          products?.products.length > 0 &&
          products?.products?.map((product: any) => (
            <ClothesComponent
              key={product?.id}
              ID={product?.id}
              Name={product?.name}
              Price={product?.price.current.text}
              ItemImage={`https://${product?.imageUrl}`}
              HoverImage={`https://${product?.additionalImageUrls[0]}`}
            />
          ))}
      </Slider>

      <button
        className="item-center top-[40%] justify-center hover:bg-black max-sm:hidden disabled:hidden transition-all duration-500 ease-in-out transform -translate-x-3 opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-hover:flex absolute rounded-none left-6 bg-black stroke-white border-none py-2 px-2"
        onClick={previous}
      >
        <ArrowLeft className="w-5 h-5 stroke-white stroke-2" />
      </button>

      <button
        className="item-center top-[40%] justify-center hover:bg-black max-sm:hidden disabled:hidden transition-all duration-500 ease-in-out transform translate-x-3 opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-hover:flex absolute rounded-none right-6 bg-black stroke-white border-none py-2 px-2"
        onClick={next}
      >
        <ArrowRight className="w-5 h-5 stroke-white stroke-2" />
      </button>
    </div>
  );
};
