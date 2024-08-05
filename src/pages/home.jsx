import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Map from "../components/map";
import Search from "../components/search";
import SlidePlace from "./../components/slidePlace";
import placesData from "../json/mainPage.json";

export default function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(placesData); // JSON 데이터를 상태로 설정
  }, []);

  return (
    <div>
      <Search />
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 border-b-2 relative">
        <div className="mb-4 font-['GmarketSans'] font-medium text-xl">
          추천 장소
        </div>
        <SlidePlace places={places.filter((place) => place.location === 0)} />{" "}
        {/* 추천 장소 */}
      </div>
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 border-b-2">
        <div className="mb-4 font-['GmarketSans'] font-medium text-xl">
          신규 장소
        </div>
        <SlidePlace places={places.filter((place) => place.location !== 0)} />{" "}
        {/* 신규 장소 */}
      </div>
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 mb-8 justify-center items-center ">
        <div className="flex flex-col mb-4 font-['GmarketSans'] text-xl justify-center items-center ">
          <div className="text-2xl font-medium">테마 지도</div>
          <div className="font-['GmarketSans-light'] text-lg font-bold">
            원하는 지역을 눌러보세요!
          </div>
        </div>
        <Map />
      </div>
      <Footer />
    </div>
  );
}
