import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";

export default function wellness() {
  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center font-['GmarketSans']">
        <AppBreadcrumb />
        <img
          src={`${process.env.PUBLIC_URL}/img/back.png`}
          alt="Background"
          className="relative z-[-20]"
        />

        <div className="absolute text-center bg-white rounded-3xl top-[45%] w-[50%] h-[30%] z-[-20]">
          <h1 className="flex justify-center mt-8 text-3xl ">웰니스란?</h1>
          <p className="mt-4">
            웰빙(well-being)과 행복(happiness) 건강(fitness)의 합성어로
            <br /> 신체와 정신은 물론 사회적으로 건강한 상태를 의미합니다.
          </p>
        </div>

        <div className="mt-[15%] block  ml-[30%] w-[70%] justify-center">
          <h2 className="justify-center mr-5 text-2xl ">▶ 웰니스 산업</h2>
          <p className="mt-10">
            스파와 온천, 관광, 직장, 부동산, 신체 활동 및 정신 건강, 미용,
            식습관, 영양 및 체중 감량, 의학 등이 포함됩니다.
          </p>
        </div>
        <div className="mt-[10%] block ml-[30%]  w-[70%] justify-center">
          <h2 className="mr-5 text-2xl ">▶ 웰니스 목표</h2>
          <p className="mt-10">
            신체적, 정신적, 사회적, 환경적 등 건강과 행복을 달성함으로
            극대화하는 개념,
            <br /> 단순히 질병이 없는 상태를 넘어서서 전반적인 삶의 질을
            향상시키는 것을 목표로 합니다.
          </p>
        </div>

        <div className="flex justify-center mt-20 mb-10">
          <img
            src={`${process.env.PUBLIC_URL}/img/donutchart.png`}
            alt="dountchart"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
