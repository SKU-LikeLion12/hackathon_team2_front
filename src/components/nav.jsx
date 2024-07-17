import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex w-[70%] mx-auto my-4 font-['GmarketSans']">
      <div className="flex mx-12 text-3xl">
        <img src="" alt="" /> SHIM_PLE
      </div>
      <div className="relative text-xl mx-12 my-auto">
        <div onClick={() => toggleDropdown("brand")} className="cursor-pointer">
          브랜드 소개
        </div>
        {activeDropdown === "brand" && (
          <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-4 w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light']">
            <Link
              to="wellness"
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
      <div className="relative text-xl mx-12 my-auto">
        <div onClick={() => toggleDropdown("theme")} className="cursor-pointer">
          테마 소개
        </div>
        {activeDropdown === "theme" && (
          <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-4 w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light']">
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
      <div className="relative text-xl mx-12 my-auto">
        <div
          onClick={() => toggleDropdown("reservation")}
          className="cursor-pointer"
        >
          예약 안내
        </div>
        {activeDropdown === "reservation" && (
          <div className="border-t-4 border-[#499A94] absolute left-1/2 transform -translate-x-1/2 mt-4 w-48 bg-[#F8F8F8] text-center font-['GmarketSans-light']">
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
  );
}

// export default function nav() {
//   return (
//     <div className="flex w-[70%] mx-auto my-4 font-['GmarketSans']">
//       <div className="flex mx-12 text-3xl">
//         <img src="" alt="" /> SHIM_PLE
//       </div>
//       <div className="text-xl mx-12">브랜드 소개</div>
//       <div className="text-xl mx-12">테마 소개</div>
//       <div className="text-xl mx-12">예약 안내</div>
//     </div>
//   );
// }
