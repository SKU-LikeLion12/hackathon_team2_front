import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Loginui() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-28">
        <div className="font-['Pretendard'] text-3xl font-black my-8">
          SHIM_PLE
        </div>
        <div className="flex flex-col border-2 border-[#a1a1a1] w-[35%] rounded-2xl py-12 px-8">
          <div className="flex flex-col font-['Pretendard'] text-gray-500">
            <input
              type="text"
              value={id}
              placeholder="아이디"
              className="border-[2px] border-b-0 rounded-t-lg p-2"
              onChange={handleId}
            />
            <input
              type="text"
              value={pw}
              placeholder="비밀번호"
              className="border-[2px] rounded-b-lg p-2"
              onChange={handlePw}
            />
          </div>
          <button className="flex justify-center items-center bg-[#47A5A5] rounded-2xl p-3 text-white text-lg font-['Pretendard'] font-medium mt-8">
            로그인
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="font-['Pretendard'] font-semibold my-8 text-sm mr-3">
            비밀번호 찾기
          </div>
          <div className="mx-3 font-['Pretendard'] font-semibold my-8 text-sm">
            |
          </div>
          <div className="font-['Pretendard'] font-semibold my-8 text-sm mx-3">
            아이디 찾기
          </div>
          <div className="mx-3 font-['Pretendard'] font-semibold my-8 text-sm">
            |
          </div>
          <Link to="/signup">
            <div className="font-['Pretendard'] font-semibold my-8 text-sm mx-3">
              회원가입
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
