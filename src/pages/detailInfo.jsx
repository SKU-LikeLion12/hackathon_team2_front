import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";
import "primeicons/primeicons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppBreadcrumb } from "../components/BreadCrumb";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";
import "../index.css";

const { kakao } = window;
const API_URL = process.env.REACT_APP_API_URL;

export default function DetailInfo() {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    const fetchDetailInfo = async () => {
      try {
        // URL 경로에 wellnessId를 포함
        const response = await axios.get(`${API_URL}/detail/get/${id}`);
        setDetailInfo(response.data);
      } catch (error) {
        console.error("Error fetching detail info:", error);
      }
    };

    fetchDetailInfo();
  }, [id]);

  useEffect(() => {
    if (detailInfo) {
      try {
        const container = document.getElementById("kamap");
        const options = {
          center: new kakao.maps.LatLng(
            detailInfo.latitude,
            detailInfo.longitude
          ),
          level: 5,
        };

        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(
          detailInfo.latitude,
          detailInfo.longitude
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        const iwContent = `
          <div class="flex flex-col justify-center items-center p-4">
          ${detailInfo.name}
        </div>`;
        const iwPosition = new kakao.maps.LatLng(
          detailInfo.latitude,
          detailInfo.longitude
        );

        const infowindow = new kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        infowindow.open(map, marker);
      } catch (error) {
        console.error("Error initializing Kakao map:", error);
      }
    }
  }, [detailInfo]);

  return (
    <div className="relative">
      <div className="flex flex-col items-center mx-auto w-[80%] py-12 font-['GmarketSans']">
        <div className="w-full text-center font-bold text-2xl mb-8">
          <AppBreadcrumb />
          {detailInfo ? detailInfo.name : "Loading..."}
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
            {detailInfo && detailInfo.images && detailInfo.images.length > 0 ? (
              detailInfo.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="slide"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                  }}
                >
                  Slide {index + 1}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide style={{ backgroundColor: "gray" }}>
                {detailInfo ? "No images available" : "Loading..."}
              </SwiperSlide>
            )}
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
                <div className="description">
                  {detailInfo ? detailInfo.address : "Loading..."}
                </div>
              </li>
              <li className="flex flex-col">
                <span className="title">운영시간</span>
                <div className="description">
                  {detailInfo ? detailInfo.hours : "Loading..."}
                </div>
              </li>
              <li className="flex flex-col">
                <span className="title">전화상담 및 문의전화</span>
                <div className="description">
                  {detailInfo ? detailInfo.contact : "Loading..."}
                </div>
              </li>
              <li className="flex flex-col">
                <span className="title">링크주소</span>
                <div className="description">
                  {detailInfo ? detailInfo.link : "Loading..."}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
