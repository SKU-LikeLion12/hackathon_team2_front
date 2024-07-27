import React from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex mx-auto bg-[#F8F8F8] h-[60px] items-center text-base">
        <div className="w-[90%]">
          <div className="flex space-x-4 mr-4 justify-end font-['Pretendard']">
            <Link to="/login">
              <div>로그인</div>
            </Link>
            <Link to="/signUp">
              <div>회원가입</div>
            </Link>
            <Link to="/support">
              <div>고객센터</div>
            </Link>
            <div>언어</div>
          </div>
        </div>
      </div>
    </>
  );
}
