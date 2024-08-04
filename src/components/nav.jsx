import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const brandRef = useRef(null);
  const themeRef = useRef(null);
  const reservationRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        brandRef.current &&
        !brandRef.current.contains(event.target) &&
        themeRef.current &&
        !themeRef.current.contains(event.target) &&
        reservationRef.current &&
        !reservationRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b-[1px] border-gray-200">
      <div className="flex w-[80%] mx-auto py-4 font-['GmarketSans']">
        <div className="mr-12">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/navLogo.png`}
              alt="쉼플_로고"
              className="w-[80%]"
            />
          </Link>
        </div>
        <div ref={brandRef} className="relative text-lg mx-12 my-auto z-[5]">
          <div
            onClick={() => toggleDropdown("brand")}
            className="cursor-pointer"
          >
            브랜드 소개
          </div>
          {activeDropdown === "brand" && (
            <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-[25px] w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light'] z-[10]">
              <Link
                to="/wellness"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                웰니스란?
              </Link>
              <Link
                to="/shimple"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                SHIM_PLE 소개
              </Link>
            </div>
          )}
        </div>
        <div ref={themeRef} className="relative text-lg mx-12 my-auto">
          <div
            onClick={() => toggleDropdown("theme")}
            className="cursor-pointer"
          >
            테마 소개
          </div>
          {activeDropdown === "theme" && (
            <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-[25px] w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light'] z-[10]">
              <Link
                to="/beautySpa"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                뷰티/스파
              </Link>
              <Link
                to="/healingMeditation"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                힐링/명상
              </Link>
              <Link
                to="/natureForestTherapy"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                자연/숲 치유
              </Link>
              <Link
                to="/orientalMedicine"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                한방
              </Link>
            </div>
          )}
        </div>
        <div ref={reservationRef} className="relative text-lg mx-12 my-auto">
          <div
            onClick={() => toggleDropdown("reservation")}
            className="cursor-pointer"
          >
            예약 안내
          </div>
          {activeDropdown === "reservation" && (
            <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-[25px] w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light'] z-[10]">
              <Link
                to="/book"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                예약하기
              </Link>
              <Link
                to="/view"
                className="block px-4 py-4 my-2 text-gray-800 hover:bg-gray-200 hover:font-['GmarketSans']"
              >
                예약 조회
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
