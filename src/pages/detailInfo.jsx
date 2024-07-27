import React, { useEffect } from "react";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppBreadcrumb } from "../components/BreadCrumb";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";
import "../index.css";

const { kakao } = window;

//기능 구현해야 할 부분 : 이미지 및 지도 위치, 가게 정보 동적 처리, 좋아요 및 리뷰 동적 처리

export default function DetailInfo() {
  useEffect(() => {
    const container = document.getElementById("kamap"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.3902250644638, 126.645426431439), // 지도의 중심좌표
      level: 5, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    const markerPosition = new kakao.maps.LatLng(
      37.3902250644638,
      126.645426431439
    );

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);

    // 인포윈도우에 표출될 내용
    const iwContent = `
    <div class="flex flex-col justify-center items-center p-4">
    장소명 
    
  </div>`;
    // 인포윈도우 표시 위치
    const iwPosition = new kakao.maps.LatLng(
      37.3902250644638,
      126.645426431439
    );

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시
    infowindow.open(map, marker);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col items-center mx-auto w-[80%] py-12 font-['GmarketSans']">
        <div className="w-full text-center font-bold text-2xl mb-8">
          <AppBreadcrumb />
          상호명
        </div>
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            slidesPerView={2}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            style={{ height: "400px" }}
          >
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundColor: "gray",
              }}
            >
              Slide 1
            </SwiperSlide>
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundColor: "gray",
              }}
            >
              Slide 2
            </SwiperSlide>
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundColor: "gray",
              }}
            >
              Slide 3
            </SwiperSlide>
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundColor: "gray",
              }}
            >
              Slide 4
            </SwiperSlide>
            <SwiperSlide
              className="slide"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundColor: "gray",
              }}
            >
              Slide 5
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full text-center mt-8">시설 안내</div>
        <div className="flex space-x-5 justify-center items-center mt-12">
          <div>좋아요</div>
          <div>리뷰</div>
          <Link to="/book">
            <button className="bg-[#47A5A5] font-['GmarketSans-light'] font-semibold text-white text-xl rounded-xl px-32 py-3">
              예약하기
            </button>
          </Link>
        </div>
        <div className="flex mt-12 w-[90%] justify-center border-t-[2px] border-[#E1E1E1] py-8">
          <div
            id="kamap"
            className="h-80 w-[400px] bg-black border-8 border-gray-300"
          >
            카카오 지도
          </div>
          <div className="detailli flex flex-col h-80 ml-10">
            <ul className="flex flex-col h-full justify-between">
              <li className="flex flex-col">
                <span className="title">오시는 길</span>
                <div className="description">설명</div>
              </li>
              <li className="flex flex-col">
                <span className="title">운영시간</span>
                <div className="description">설명</div>
              </li>
              <li className="flex flex-col">
                <span className="title">전화상담 및 문의전화</span>
                <div className="description">설명</div>
              </li>
              <li className="flex flex-col">
                <span className="title">링크주소</span>
                <div className="description">설명</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
