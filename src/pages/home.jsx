import React from "react";
import Header from "./../components/header";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Map from "../components/map";
import Search from "../components/search";
import SlidePlace from "./../components/slidePlace";

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
      <Search />
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5 border-b-2">
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
      <div className="w-[80%] mx-auto flex flex-col p-5 mt-5">
        <div className="mb-4 font-['GmarketSans'] font-medium text-xl">
          테마 지도
        </div>
        <Map />
      </div>
      <Footer />
    </div>
  );
}
