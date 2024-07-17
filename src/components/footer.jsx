import React from "react";

export default function footer() {
  return (
    <div className="flex flex-col w-full h-32 bg-[#F8F8F8] py-8 justify-center items-center">
      <div className="flex w-[70%] justify-center items-center text-sm font-semibold font-['Pretendard']">
        <div className="flex justify-center items-center">
          <div className="mx-8">|</div>
          {/* 이미지로 넣어야 하겠지?? <img src="" alt="" /> */}
          <div>멋쟁이사자처럼_대학</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-8">|</div>
          <div>성결대학교_2팀</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-8">|</div>
          <div>개인정보처리방침</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-8">|</div>
          <div>이용약관</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mx-8">|</div>
          <div>이메일수집거부</div>
        </div>
      </div>
      <div className="flex w-[70%] justify-center items-center text-sm font-medium font-['Pretendard'] mt-4">
        © 2024. SHIM_PLE Co. all rights reserved.
      </div>
    </div>
  );
}
