import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const API_URL = process.env.REACT_APP_API_URL;

export default function Loginui() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const handleLogin = async () => {
    const url = `${API_URL}/member/SignUpOwnerRequest`; // API 엔드포인트
    const data = {
      userId: id,
      password: pw,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 서버로부터 받은 토큰 출력 (나중에 실제 사용)
      console.log("로그인 성공:", response.data.token);
      // 예: localStorage에 토큰 저장
      localStorage.setItem("token", response.data.token);
      // 로그인 성공 후 페이지 이동
      // window.location.href = '/somewhere';
    } catch (error) {
      console.error(
        "로그인 실패:",
        error.response ? error.response.data : error.message
      );
      alert(
        "로그인 실패: " + (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-20">
        <div className="font-['Pretendard'] text-3xl font-black my-8 inline-block align-baseline">
          SHIM_PLE
          <span className="ml-2 text-2xl text-[#484848]">: 사장님</span>
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
              type="password"
              value={pw}
              placeholder="비밀번호"
              className="border-[2px] rounded-b-lg p-2"
              onChange={handlePw}
            />
          </div>
          <button
            className="flex justify-center items-center bg-[#47A5A5] rounded-2xl p-3 text-white text-lg font-['Pretendard'] font-medium mt-8"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
        <div className="flex items-center justify-center">
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
      <Footer />
    </div>
  );
}
