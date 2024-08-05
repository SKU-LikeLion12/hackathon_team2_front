import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";

const API_URL = process.env.REACT_APP_API_URL;

export default function BeautySpa() {
  const [mainPageData, setMainPageData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const seoulRef = useRef(null);
  const gyeonggiRef = useRef(null);
  const incheonRef = useRef(null);
  const gangwondoRef = useRef(null);
  const choongbukRef = useRef(null);
  const choongnamRef = useRef(null);
  const daeguRef = useRef(null);
  const gwangjuRef = useRef(null);
  const jeonnamRef = useRef(null);
  const busanRef = useRef(null);
  const jeonbukRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMainPage = async () => {
      try {
        const response = await axios.get(`${API_URL}/mainPage`);
        const filteredData = response.data.filter((item) => item.theme === 0);
        setMainPageData(filteredData);
      } catch (error) {
        console.error("Error fetching mainPage:", error);
      }
    };

    fetchMainPage();
  }, []);

  const scrollToSection = (ref, region) => {
    setSelectedRegion(region);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPage = (path, id) => {
    navigate(`${path}/${id}`);
  };

  const groupByLocation = (locationId) => {
    return mainPageData.filter((item) => item.location === locationId);
  };

  const regions = [
    { name: "서울", ref: seoulRef, locationId: 0 },
    { name: "경기도", ref: gyeonggiRef, locationId: 1 },
    { name: "인천", ref: incheonRef, locationId: 2 },
    { name: "강원특별자치도", ref: gangwondoRef, locationId: 3 },
    { name: "충청북도", ref: choongbukRef, locationId: 4 },
    { name: "충청남도", ref: choongnamRef, locationId: 5 },
    { name: "대구", ref: daeguRef, locationId: 6 },
    { name: "광주", ref: gwangjuRef, locationId: 7 },
    { name: "전북특별자치도", ref: jeonbukRef, locationId: 8 },
    { name: "전라남도", ref: jeonnamRef, locationId: 9 },
    { name: "부산", ref: busanRef, locationId: 10 },
  ];

  return (
    <div className="relative">
      <div className="relative z-[-20] justify-center">
        <img src={`${process.env.PUBLIC_URL}/img/beautySpa.png`} alt="로고" />
        <div className="absolute left-[45%] top-[26%] font-['GmarketSans'] text-[40px] font-bold">
          뷰티 / 스파
        </div>
      </div>

      <div>
        <div className="top-[20%] left-2 p-2 rounded-2xl w-[12%] mt-[5px] ml-[1%] fixed bg-[#F8F8F8F8] z-10 font-['GmarketSans']">
          {regions.map((region) => (
            <div key={region.name}>
              <div
                onClick={() => scrollToSection(region.ref, region.name)}
                className={`cursor-pointer rounded-3xl text-center font-['GmarketSans'] font-thin ${
                  selectedRegion === region.name
                    ? "bg-[#47A5A5]"
                    : "bg-[#E0EDE6]"
                }`}
              >
                {region.name}
              </div>
              <div className="flex justify-center">
                <img
                  src={`${process.env.PUBLIC_URL}/img/Line.png`}
                  alt="Line"
                  className="max-w-xs max-h-[2%]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="ml-40">
          {regions.map((region) => (
            <div key={region.name}>
              <div
                ref={region.ref}
                className="flex flex-col items-center justify-end"
              >
                <div className="flex flex-col w-full">
                  <h1 className="text-[20px] font-['GmarketSans'] text-center mt-[3%]">
                    {region.name}
                  </h1>
                  <hr className="flex w-[73%] my-4 ml-[14%] border-t border-gray-300" />
                </div>

                <div className="flex flex-wrap items-center justify-center space-x-3">
                  {groupByLocation(region.locationId).map((item) => (
                    <div key={item.wellness_id}>
                      <img
                        src={`${process.env.PUBLIC_URL}/location/wellness${item.wellness_id}.png`}
                        alt={item.title}
                        onClick={() =>
                          navigateToPage("/detailInfo", item.wellness_id)
                        }
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
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
