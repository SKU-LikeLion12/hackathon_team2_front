import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function shimple() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="bg-[#EAF3EB] flex justify-center font-['GmarketSans']">
        <div className="w-full max-w-screen-lg px-8 bg-white">
          {/* 페이지 경로 */}
          <div className="py-4 text-[#707070]">
            <span>홈 &gt; 브랜드 소개 &gt; SHIM_PLE 소개</span>
          </div>

          {/* SHIM_PLE 소개 */}
          <div className="flex justify-center py-8">
            <img
              src={`${process.env.PUBLIC_URL}/img/SHIM_PLE.png`}
              alt="SHIM_PLE 로고"
              className="py-4"
            />
          </div>

          {/* 엠블럼 & BI */}
          <div className="py-8">
            <div className="flex justify-around">
              <h2 className="flex text-2xl">엠블럼 & BI</h2>
              <hr className="flex w-[75%] my-4 border-t border-gray-300" />
            </div>

            <div className="flex items-center justify-between">
              <img
                src={`${process.env.PUBLIC_URL}/img/why.png`}
                alt="SHIM_PLE 로고"
                className="py-4"
              />
            </div>
          </div>

          {/* 디자인 & 모티브 */}
          <div className="py-8 ">
            <div className="flex justify-around">
              <h2 className="flex text-2xl"> 디자인 & 모티브 </h2>
              <hr className="flex w-[75%] my-4 border-t border-gray-300" />
            </div>

            <div className="flex items-center justify-center py-4 mt-5">
              <img
                src={`${process.env.PUBLIC_URL}/img/color.png`}
                alt="컬러"
                className="px-4 mt-8"
              />
              <div>
                <p className="text-center mb-[10%]">디자인 모티브 - 쉼표</p>
                <img
                  src={`${process.env.PUBLIC_URL}/img/logo.png`}
                  alt="로고"
                  className="px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
