import React from "react";

export default function searchselect() {
  return (
    <div className=" flex bg-white/50 w-[50%] p-5">
      <select
        name=""
        id=""
        className="mr-5 w-[40%] h-10 p-2 font-['GmarketSans-light'] text-sm font-light"
      >
        <option value="" className="">
          지역을 선택해주세요.
        </option>
      </select>
      <select
        name=""
        id=""
        className="mr-5 w-[40%] h-10 p-2 font-['GmarketSans-light'] text-sm font-light"
      >
        <option value="" className="">
          테마를 선택해주세요.
        </option>
      </select>
      <button className="w-[20%] bg-[#47A5A5] text-white font-['GmarketSans-light'] ">
        검색
      </button>
    </div>
  );
}
