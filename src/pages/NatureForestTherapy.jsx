import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import natureForest from "../json/natureForest.json"; 
import "primeicons/primeicons.css";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function NatureForest() {
  const [mainPageData, setNature] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("강원특별자치도");
  const [bookmarkedItems, setBookmarkedItems] = useState({}); // 상태 선언
  const gangwondoRef = useRef(null);
  const choongbukRef = useRef(null);
  const choongnamRef = useRef(null);
  const jeonnamRef = useRef(null);
  const gyeongnamRef = useRef(null);
  const gyeongbukRef = useRef(null);
  const ulsanRef = useRef(null);
  const jejuRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // AuthContext에서 user 가져오기

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNature = async () => {
      try {
        setNature(natureForest);
      } catch (error) {
        console.log("실패");
      }
    };

    fetchNature();
  }, []);

  const scrollToSection = (ref, region) => {
    setSelectedRegion(region);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleIconClick = async (id) => {
    if (!user) {
      alert("로그인 후 북마크를 할 수 있습니다.");
      return;
    }

    const isBookmarked = !bookmarkedItems[id];
    setBookmarkedItems((prev) => ({
      ...prev,
      [id]: isBookmarked,
    }));

    if (isBookmarked) {
      try {
        const response = await axios.post(`${API_URL}/scrap/add`, {
          token: user.token,
          wellnessId: id,
        });
        console.log("북마크 추가 성공:", response.data);
      } catch (error) {
        console.error(
          "북마크 추가 실패:",
          error.response ? error.response.data : error.message
        );
        alert("북마크 추가 실패");
        console.error("북마크 추가 실패:", error);
        // 북마크 실패 시 상태 롤백
        setBookmarkedItems((prev) => ({
          ...prev,
          [id]: !isBookmarked,
        }));
      }
    }
  };

  const navigateToPage = (path, id) => {
    navigate(`${path}/${id}`);
  };

  const groupByLocation = (locationId) => {
    return mainPageData.filter((item) => item.location === locationId);
  };

  const regions = [
    { name: "강원특별자치도", ref: gangwondoRef, locationId: 7 },
    { name: "충청북도", ref: choongbukRef, locationId: 8 },
    { name: "충청남도", ref: choongnamRef, locationId: 9 },
    { name: "전라남도", ref: jeonnamRef, locationId: 11 },
    { name: "경상남도", ref: gyeongnamRef, locationId: 13 },
    { name: "경상북도", ref: gyeongbukRef, locationId: 12 },
    { name: "울산", ref: ulsanRef, locationId: 5 },
    { name: "제주특별자치도", ref: jejuRef, locationId: 14 },
  ];

  return (
    <div className="relative">
      <div className="relative z-[-20] justify-center">
        <img src={`${process.env.PUBLIC_URL}/img/forest.png`} alt="로고" />
        <div className="absolute left-[45%] top-[26%] font-['GmarketSans'] text-[40px] font-bold">
          자연 / 숲 치유
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
                        src={`${process.env.PUBLIC_URL}/img/resourceEnd/${item.location}/${item.wellness_id}/${item.theme}.png`}                  
                        alt={item.title}
                        onClick={() =>
                          navigateToPage("/detailInfo", item.wellness_id)
                        }
                        className="cursor-pointer"
                      />
                      <div className="font-['GmarketSans'] mt-[8px]">
                        {item.title}
                      </div>
                      <div
                        onClick={() => handleIconClick(item.wellness_id)}
                        className="cursor-pointer"
                      >
                        {bookmarkedItems[item.wellness_id] ? (
                          <i className="py-2 text-base text-center pi pi-bookmark-fill" />
                        ) : (
                          <i className="py-2 text-base text-center pi pi-bookmark" />
                        )}
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
