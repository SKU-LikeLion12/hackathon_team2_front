import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footer";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function Booking() {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/book/get/${id}`, {
          params: { bookId: id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        // 에러 처리 로직 추가
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id, user]);

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>예약 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-8 bg-white">
          {/* 상단 타이틀 */}
          <div className="mb-8 text-center">
            <h1 className="text-xl font-['GmarketSans']">
              {bookingDetails.nickName}님
            </h1>
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
                  <span className="font-medium border-b px-20 border-[#E1E1E1]">
                    {bookingDetails.nickName}
                  </span>
                </div>
                <div className="flex justify-between pb-2 font-thin">
                  <span className="text-gray-600">인원</span>
                  <span className="font-medium border-b px-20 border-[#E1E1E1]">
                    {bookingDetails.headCnt}
                  </span>
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">장소</span>
                  <span className="font-medium border-b px-20 border-[#E1E1E1]">
                    {bookingDetails.title}
                  </span>
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">날짜/시간</span>
                  <span className="font-medium border-b border-[#E1E1E1]">
                    {new Date(bookingDetails.checkIn).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">이메일</span>
                  <span className="font-medium border-b px-4 border-gray-300">
                    {bookingDetails.eleMail}
                  </span>
                </div>
                <div className="flex justify-between font-thin">
                  <span className="text-gray-600">예약 상태</span>
                  <span className="font-medium border-b px-20 border-gray-300">
                    {bookingDetails.isBook === 1
                      ? "수락"
                      : bookingDetails.isBook === 0
                      ? "대기"
                      : "취소"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 문의 내용 */}
          <div className="mb-8">
            <span className="text-gray-600 font-['GmarketSans'] font-thin">
              문의내용
            </span>
            <textarea
              className="w-full p-8 mt-2 border border-gray-300 font-['GmarketSans']"
              defaultValue={bookingDetails.content || ""}
              readOnly
            />
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
