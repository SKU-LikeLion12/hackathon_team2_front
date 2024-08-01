import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import onePunch from "../json/onePunch";

export default function OrientalMedicine() {
  const [hanbang, setHanbang] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const seoulRef = useRef(null);
  const jeonbukRef = useRef(null);
  const gyeongnamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHanbang = async () => {
      try {
        setHanbang(onePunch);
      } catch (error) {
        console.log("실패");
      }
    };

    fetchHanbang();
  }, []);

  const groupByLocation = (location) => {
    return hanbang.filter((item) => item.location === location);
  };

  const scrollToSection = (ref, region) => {
    setSelectedRegion(region);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="relative">
      <div className="relative z-[-20]">
        <img src={`${process.env.PUBLIC_URL}/img/hanbang.png`} alt="로고" />
        <div className="absolute left-[48%] top-[26%] font-['GmarketSans'] text-[40px] font-bold">
          한방
        </div>
      </div>

      <div>
        <div className="top-1/4 left-2 p-2 rounded-2xl w-[12%] mt-[5px] ml-[1%] fixed bg-[#F8F8F8F8] z-10 font-['GmarketSans']">
          <div
            onClick={() => scrollToSection(seoulRef, "서울")}
            className={`cursor-pointer p-2 my-2 rounded-3xl text-center font-['GmarketSans'] font-thin ${
              selectedRegion === "서울" ? "bg-[#47A5A5]" : "bg-[#E0EDE6]"
            }`}
          >
            서울
          </div>
          <div className="flex justify-center my-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/Line.png`}
              alt="Line"
              className="max-w-xs"
            />
          </div>
          <div
            onClick={() => scrollToSection(jeonbukRef, "전북특별자치도")}
            className={`cursor-pointer p-2 my-2 rounded-3xl text-center font-['GmarketSans'] font-thin ${
              selectedRegion === "전북특별자치도"
                ? "bg-[#47A5A5]"
                : "bg-[#E0EDE6]"
            }`}
          >
            전북특별자치도
          </div>
          <div className="flex justify-center my-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/Line.png`}
              alt="Line"
              className="max-w-xs max-h-[2%]"
            />
          </div>
          <div
            onClick={() => scrollToSection(gyeongnamRef, "경상남도")}
            className={`cursor-pointer p-2 my-2 rounded-3xl text-center font-['GmarketSans'] font-thin ${
              selectedRegion === "경상남도" ? "bg-[#47A5A5]" : "bg-[#E0EDE6]"
            }`}
          >
            경상남도
          </div>
        </div>

        <div className="ml-40">
          <div>
            <div
              ref={seoulRef}
              className="flex flex-col items-center justify-end"
            >
              <div className="flex flex-col w-full">
                <h1 className="text-[20px] font-['GmarketSans'] text-center mt-[3%]">
                  서울
                </h1>
                <hr className="flex w-[73%] my-4 ml-[14%] border-t border-gray-300" />
              </div>

              <div className="flex flex-wrap items-center justify-center space-x-3">
                {groupByLocation(0).map((item) => (
                  <div key={item.wellnessId}>
                    <img
                      src={`${process.env.PUBLIC_URL}/location/wellness${item.wellnessId}.png`}
                      alt={item.title}
                      onClick={() => {
                        navigateToPage("/detailInfo");
                      }}
                      className="cursor-pointer"
                    />
                    <div className="font-['GmarketSans'] mt-[8px]">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={jeonbukRef}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-[20px] font-['GmarketSans'] text-center mt-[3%]">
                전북특별자치도
              </h1>
              <hr className="flex w-[73%] my-4 ml-[14%] border-t border-gray-300" />
            </div>

            <div className="flex space-x-3">
              {groupByLocation(10).map((item) => (
                <div key={item.wellnessId}>
                  <img
                    src={`${process.env.PUBLIC_URL}/location/wellness${item.wellnessId}.png`}
                    alt={item.title}
                    onClick={() => {
                      navigateToPage("/detailInfo");
                    }}
                    className="cursor-pointer"
                  />
                  <div className="font-['GmarketSans'] mt-[8px]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={gyeongnamRef}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-[20px] font-['GmarketSans'] text-center mt-[3%]">
                경상남도
              </h1>
              <hr className="flex w-[73%] my-4 ml-[14%] border-t border-gray-300" />
            </div>

            <div className="flex space-x-3">
              {groupByLocation(13).map((item) => (
                <div key={item.wellnessId}>
                  <img
                    src={`${process.env.PUBLIC_URL}/location/wellness${item.wellnessId}.png`}
                    alt={item.title}
                    onClick={() => {
                      navigateToPage("/detailInfo");
                    }}
                    className="cursor-pointer"
                  />
                  <div className="font-['GmarketSans'] mt-[8px]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
