import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="border-b-[1px] border-gray-200">
      <div className="flex w-[80%] mx-auto py-4 font-['GmarketSans']">
        <div className="mr-12">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="50"
              fill="none"
              viewBox="0 0 192 60"
            >
              <path
                fill="#000"
                d="m69.29 35.94 1.59-2.55c1.74 1.17 3.36 1.71 5.25 1.71 1.68 0 2.82-.84 2.82-2.1 0-1.32-.75-2.22-4.02-3.6-3.6-1.5-5.01-3.24-5.01-5.79 0-3.57 2.7-5.91 6.84-5.91 2.25 0 4.02.72 5.22 1.56.33.24.39.6.18.96l-1.47 2.43c-1.23-.78-2.7-1.2-3.9-1.2-1.62 0-2.7.75-2.7 1.95 0 1.08.81 1.8 3.12 2.79 4.26 1.77 6 3.69 6 6.84 0 4.11-3.18 5.88-6.93 5.88-2.73 0-5.13-.54-6.69-1.8-.42-.33-.57-.75-.3-1.17Zm27.57-17.97h2.85c.69 0 1.05.33 1.05 1.02v17.28c0 1.62-.39 2.37-2.64 2.37h-1.26v-9.03h-7.02v6.66c0 1.62-.51 2.37-2.79 2.37h-1.11V17.97h2.85c.66 0 1.05.33 1.05 1.02v6.66h7.02v-7.68Zm7.062 0h2.82c.69 0 1.08.33 1.08 1.02v17.28c0 1.62-.54 2.37-2.79 2.37h-1.11V17.97Zm22.368 0h2.85c.66 0 1.05.33 1.05 1.02v17.28c0 1.62-.45 2.37-2.67 2.37h-1.23V24.63l-4.5 7.11c-.48.81-1.95.81-2.43.03l-4.41-7.14v11.64c0 1.62-.51 2.37-2.64 2.37h-1.26V17.97h3.9l5.64 8.91 5.7-8.91Zm19.374 21.69h-11.97c-.69 0-1.02-.33-1.02-.99v-2.46h11.97c.69 0 1.02.33 1.02.99v2.46Zm2.326-21.69h6.54c3.99 0 6.6 2.58 6.6 6.51 0 4.11-2.97 6.51-6.6 6.51h-2.52v5.28c0 1.62-.51 2.37-2.76 2.37h-1.26V17.97Zm3.9 9.42h2.46c1.86 0 2.88-1.11 2.88-2.91 0-1.77-1.02-2.88-2.88-2.88h-2.46v5.79Zm15.088 7.65h7.77c.69 0 1.05.3 1.05.99v2.61h-11.67c-.69 0-1.05-.33-1.05-1.02V17.97h2.85c.69 0 1.05.33 1.05 1.02v16.05Zm15.028-.03h7.8c.69 0 1.05.3 1.05.99v2.64h-11.67c-.69 0-1.05-.33-1.05-1.02V17.97h11.37c.69 0 1.08.33 1.08 1.02v2.61h-8.55v4.47h6.9c.69 0 1.08.3 1.08.99v2.55h-7.98v3.18c0 .93 0 1.62-.03 2.22Z"
              />
              <path
                fill="#96CCA8"
                fill-rule="evenodd"
                d="M12.001 17.35 12 17.146C12 7.676 20.059 0 30 0s18 7.676 18 17.145c0 9.47-8.059 17.146-18 17.146a18.78 18.78 0 0 1-5.972-.967l-.028.15v2.653l.214 2.246.215 2.449.642 2.245-4.928-3.878-1.929-2.245-1.5-2.245-.857-1.633L15 31.229l-1.286-2.654-1.285-4.49-.215-1.429-.214-2.45V17.35l.001.002Z"
                clip-rule="evenodd"
              />
              <path
                fill="#447B66"
                fill-opacity=".9"
                fill-rule="evenodd"
                d="M24.001 34.088 24 33.882c0-9.469 8.059-17.145 18-17.145s18 7.676 18 17.145c0 9.47-8.059 17.146-18 17.146a18.78 18.78 0 0 1-5.972-.966l-.028.15v4.898l.618 4.89-4.475-4.074-1.714-2.245-1.5-2.245L27 47.966l-1.286-2.654-1.285-4.49-.215-2.245L24 36.332v-2.246l.001.002Z"
                clip-rule="evenodd"
              />
              <path
                fill="#47A5A5"
                fill-opacity=".8"
                fill-rule="evenodd"
                d="m35.999 34.088.001-.206c0-9.469-8.059-17.145-18-17.145S0 24.413 0 33.882c0 9.47 8.059 17.146 18 17.146 2.093 0 4.103-.34 5.972-.966l.028.15v4.898L23.381 60l4.476-4.074 1.714-2.245 1.5-2.245L33 47.966l1.286-2.654 1.285-4.49.429-2.858v-3.878l-.001.002Z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="relative text-lg mx-12 my-auto z-[5]">
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
        <div className="relative text-lg mx-12 my-auto">
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
        <div className="relative text-lg mx-12 my-auto">
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
