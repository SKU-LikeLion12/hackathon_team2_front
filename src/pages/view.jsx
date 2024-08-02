import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/* import Nav from "../components/nav";
import Header from "../components/header"; */
import Footer from "../components/footer";

const API_URL = process.env.REACT_APP_API_URL;

export default function View() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const redirect = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
      if (redirect) {
        navigate("/login"); // 로그인 페이지로 리디렉션
      }
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/book/myPage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("로그인 후 사용 가능합니다.:", error);
      alert("로그인 후 사용 가능합니다.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      {/* <Header />
      <Nav /> */}
      <div className="flex items-center justify-center min-h-screen mt-4">
        <div className="w-full max-w-2xl bg-white">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-['GmarketSans'] mb-[8%]">예약 조회</h1>
            <hr className="flex justify-center my-8 border-t border-gray-300" />
          </div>

          {/* 예약 정보 */}
          <div className="flex justify-center mb-8">
            <table className="w-full border-collapse border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-200 p-2">
                    번호
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    장소
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    예약일
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    승인여부
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                        {index + 1}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center ">
                        {booking.title}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                        {booking.checkIn}
                      </td>
                      <td className="font-['GmarketSans'] border border-gray-300 p-2 text-center relative">
                        <div className="relative">
                          <div>{booking.isBook === 1 ? '수락' : booking.isBook === 0 ? '대기' : '취소'}</div>
                          {/* <img
                            src={`${process.env.PUBLIC_URL}/img/${booking.isBook === 1 ? 'o' : booking.isBook === 0 ? 'triangle' : 'x'}.png`}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="font-['GmarketSans'] text-center p-4">
                      예약한 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute font-['GmarketSans']">1</div>
            <img src={`${process.env.PUBLIC_URL}/img/next.png`} className="flex justify-center " />
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4">
            <button className="px-[20%] py-2 text-white bg-[#47A5A5] border border-gray-400 rounded-lg  font-['GmarketSans'] mt-[25%]"
            onClick={() => window.location.href = '/'}
            >홈으로 가기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
