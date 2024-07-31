import React from "react";
import Searchselect from "./searchselect";

export default function search() {
  return (
    <div
      className="flex flex-col justify-center items-center h-[80vh] w-full bg-slate-200 font-black font-['GmarketSans']"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/homeMainImg.png)`,
      }}
    >
      <>
        <div className="text-white text-4xl mb-20">
          쉼플과 함께하는 맞춤형 웰니스
        </div>{" "}
        <br />
        <Searchselect />
      </>
    </div>
  );
}
