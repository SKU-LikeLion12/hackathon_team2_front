import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // AuthContext를 import 합니다.

export default function Header() {
  const { user, logout } = useAuth(); // AuthContext에서 user와 logout을 가져옵니다.

  return (
    <div className="flex mx-auto bg-[#F8F8F8] h-[60px] items-center text-base">
      <div className="w-[90%]">
        <div className="flex space-x-4 mr-4 justify-end font-['Pretendard']">
          {!user ? (
            <>
              <Link to="/login">
                <div>로그인</div>
              </Link>
              <Link to="/signUp">
                <div>회원가입</div>
              </Link>
            </>
          ) : (
            <>
              <div>{`${user.name}님 환영합니다!`}</div>
              <button onClick={logout} className="text-[#47a5a5]">
                로그아웃
              </button>
            </>
          )}
          <Link to="/support">
            <div>고객센터</div>
          </Link>
          <div>언어</div>
          <Link to="/scrap">scrap</Link>
        </div>
      </div>
    </div>
  );
}