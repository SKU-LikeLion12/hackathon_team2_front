import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

// Mock function to simulate fetching reservation data
const fetchReservationData = (id) => {
  return {
    people: "2인",
    dateTime: "2024.08.07",
    place: "서울한방진흥센터",
    query: "",
  };
};

export default function Booking() {
  const { id } = useParams();
  const { user } = useUser(); // Context에서 사용자 정보 가져오기
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    const data = fetchReservationData(id);
    setReservation(data);
  }, [id]);

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
                  <span className="text-gray-600">닉네임</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {user.nickName}
                  </span>
                  <hr className="border-gray-300" />
                </div>

                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">이메일</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {user.eleMail}
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600 ">인원</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {reservation.people}
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">장소</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {reservation.place}
                  </span>
                  <hr className="border-gray-300" />
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600 ">날짜/시간</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {reservation.dateTime}
                  </span>
                  <hr className="border-gray-300" />
                </div>
              </div>
            </div>
            {/* 문의 내용 */}
            <div className="mb-8">
              <span className="text-gray-600 font-['GmarketSans'] font-thin">
                문의내용
              </span>
              <textarea
                className="w-full p-8 mt-2 border border-gray-300"
                value={reservation.query}
                readOnly
              ></textarea>
            </div>
          </div>
          {/* 하단 버튼 */}
          <hr className="flex w-[100%] my-4 justify-center border-t-2 border-[#47A5A5]" />
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <button className="px-12 py-2 text-black bg-white border border-gray-400 rounded-lg hover:bg-gray-200 font-['GmarketSans']">
                홈으로 가기
              </button>
            </Link>
            <Link to="/view">
              <button className="px-12 py-2 text-black bg-white border border-gray-400 rounded-lg hover:bg-gray-200 font-['GmarketSans']">
                예약 목록보기
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
