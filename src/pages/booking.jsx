import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Booking() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-8 bg-white ">
          {/* 상단 타이틀 */}
          <div className="mb-8 text-center">
            <h1 className="text-xl font-['GmarketSans']">멋쟁이 사자님</h1>
            <p className="text-xl font-['GmarketSans']">예약 완료되었습니다</p>
            <div className="flex items-center justify-center mt-4">
              <hr className="flex w-[100%] my-4 justify-center border-t-2 border-[#47A5A5]" />
            </div>
          </div>
          {/* 예약 정보 */}
          <div className="p-6 border border-gray-300 font-['GmarketSans']">
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between pb-2 font-thin">
                  <span className="text-gray-600">이름</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    멋쟁이 사자
                  </span>
                  <hr className="border-gray-300" />
                </div>

                <div className="flex justify-between font-thin">
                  <span className="text-gray-600 ">인원</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    2인
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">장소</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    서울한방진흥센터
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600 ">날짜/시간</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    2024.08.07
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">이메일</span>
                  <span className="font-medium border-b border-gray-300">
                    likelion@sungkyul.ac.kr
                  </span>
                  <hr className="border-gray-300 " />
                </div>
              </div>
            </div>
            {/* 문의 내용 */}
            <div className="mb-8">
              <span className="text-gray-600 font-['GmarketSans'] font-thin">
                문의내용
              </span>
              <textarea className="w-full p-8 mt-2 border border-gray-300"></textarea>
            </div>
          </div>
          {/* 하단 버튼 */}
          <hr className="flex w-[100%] my-4 justify-center border-t-2 border-[#47A5A5]" />
          <div className="flex justify-center space-x-4">
            <button className="px-12 py-2 text-black bg-white border border-gray-400 rounded-lg hover:bg-gray-200 font-['GmarketSans']">
              홈으로 가기
            </button>
            <button className="px-12 py-2 text-black bg-white border border-gray-400 rounded-lg hover:bg-gray-200 font-['GmarketSans']">
              예약 목록보기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
