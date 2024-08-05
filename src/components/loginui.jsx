import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleId = (e) => setId(e.target.value);

  const handlePw = (e) => setPw(e.target.value);

  const handleLogin = async () => {
    const data = {
      userId: id,
      password: pw,
    };

    try {
      const response = await axios.post(`${API_URL}/member/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const { token, name } = response.data;
      localStorage.setItem("token", response.data.token);
      // login({ userId: id, name }, response.data.token); // Pass token to login function

      // alert(`${name}님 환영합니다!`);
      navigate("/");
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
        <div className="font-['Pretendard'] text-3xl font-black my-8">
          SHIM_PLE
        </div>
        <div className="flex flex-col border-2 border-[#a1a1a1] w-[35%] rounded-2xl pt-12 pb-8 px-8">
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
          <div className="flex text-base justify-center mt-5 font-['Pretendard']">
            사장님이신가요?
            <Link to="/ownerlogin" className="ml-2 text-blue-600">
              사장님 로그인 하기
            </Link>
          </div>
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
    </div>
  );
}
