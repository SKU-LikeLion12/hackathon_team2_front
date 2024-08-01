import React from "react";
import Footer from "../components/footer";
import Map from "../components/map";
import Search from "../components/search";
import SlidePlace from "./../components/slidePlace";
import DetailInfo from "./detailInfo";

export default function Home() {
  return (
    <div>
      <Search />
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 border-b-2 relative">
        <div className="mb-4 font-['GmarketSans'] font-medium text-xl">
          추천 장소
        </div>
        <SlidePlace />
      </div>
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 border-b-2">
        <div className="mb-4 font-['GmarketSans'] font-medium text-xl">
          신규 장소
        </div>
        <SlidePlace />
      </div>
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 mb-8 justify-center items-center ">
        <div className="flex flex-col mb-4 font-['GmarketSans'] text-xl justify-center items-center ">
          <div className="font-medium text-2xl">테마 지도</div>
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
