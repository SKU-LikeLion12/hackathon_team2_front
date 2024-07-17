// src/components/slidePlace.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SlidePlace = () => {
  return (
    <div className="max-w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {/* 얘도 동적으로 처리해서 나중에는 mockData 삭제하고 DB로 받아오기 */}
        <SwiperSlide>
          <div className="h-64 bg-red-500 flex items-center justify-center text-white">
            Slide 1
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 bg-green-500 flex items-center justify-center text-white">
            Slide 2
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 bg-blue-500 flex items-center justify-center text-white">
            Slide 3
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 bg-yellow-500 flex items-center justify-center text-white">
            Slide 4
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 bg-purple-500 flex items-center justify-center text-white">
            Slide 5
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 bg-pink-500 flex items-center justify-center text-white">
            Slide 6
          </div>
          <div className="flex flex-col m-1">
            <div className="font-['GmarketSans-light'] mb-1">지역</div>
            <div className="font-['GmarketSans'] text-lg">장소</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlidePlace;
