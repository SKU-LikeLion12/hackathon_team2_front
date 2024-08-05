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

const SlidePlace = ({ places }) => {
  // 랜덤으로 장소 데이터 배열을 섞는 함수
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // 섞인 배열에서 처음 6개의 장소를 선택
  const randomPlaces = shuffleArray(places).slice(0, 6);

  return (
    <div className="max-w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {randomPlaces.map((place) => (
          <SwiperSlide key={place.wellnessId}>
            <div className="flex items-center justify-center h-64">
              <img
                src={`${process.env.PUBLIC_URL}/img/resourceEnd/${place.location}/${place.wellnessId}/1.png`} //아마자 추가 해야됨
                alt={place.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col m-1">
              <div className="font-['GmarketSans'] text-lg">{place.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlidePlace;
