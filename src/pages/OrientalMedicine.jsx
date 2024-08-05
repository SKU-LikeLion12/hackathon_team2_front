import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import onePunch from "../json/onePunch";
import "primeicons/primeicons.css";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function OrientalMedicine() {
  const [hanbang, setHanbang] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const seoulRef = useRef(null);
  const jeonbukRef = useRef(null);
  const gyeongnamRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // AuthContext에서 user 가져오기

  const API_URL = process.env.REACT_APP_API_URL;

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
                        navigateToPage("/detailInfo", item.wellnessId);
                      }}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between">
                      <div className="font-['GmarketSans'] mt-[8px]">
                        {item.title}
                      </div>
                      <div
                        onClick={() => handleIconClick(item.wellnessId)}
                        className="cursor-pointer"
                      >
                        {bookmarkedItems[item.wellnessId] ? (
                          <i className="py-2 text-base text-center pi pi-bookmark-fill" />
                        ) : (
                          <i className="py-2 text-base text-center pi pi-bookmark" />
                        )}
                      </div>
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
                      navigateToPage("/detailInfo", item.wellnessId);
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between">
                    <div className="font-['GmarketSans'] mt-[8px]">
                      {item.title}
                    </div>
                    <div
                      onClick={() => handleIconClick(item.wellnessId)}
                      className="cursor-pointer"
                    >
                      {bookmarkedItems[item.wellnessId] ? (
                        <i className="py-2 text-base text-center pi pi-bookmark-fill" />
                      ) : (
                        <i className="py-2 text-base text-center pi pi-bookmark" />
                      )}
                    </div>
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
                      navigateToPage("/detailInfo", item.wellnessId);
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between">
                    <div className="font-['GmarketSans'] mt-[8px]">
                      {item.title}
                    </div>
                    <div
                      onClick={() => handleIconClick(item.wellnessId)}
                      className="cursor-pointer"
                    >
                      {bookmarkedItems[item.wellnessId] ? (
                        <i className="py-2 text-base text-center pi pi-bookmark-fill" />
                      ) : (
                        <i className="py-2 text-base text-center pi pi-bookmark" />
                      )}
                    </div>
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
