import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useAuth } from "../contexts/AuthContext";
import "primeicons/primeicons.css";
import { Paginator } from "primereact/paginator";

const API_URL = process.env.REACT_APP_API_URL;

export default function View() {
  const [bookings, setBookings] = useState([]);
  const [paginatedBookings, setPaginatedBookings] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        const redirect = window.confirm(
          "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
        );
        if (redirect) {
          navigate("/login");
        }
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/book/myPage`,
          { token: token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("예약 데이터: ", response.data);

        // 최신순으로 정렬 (예약일 기준)
        const sortedBookings = response.data.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
        
        setBookings(sortedBookings);
        setPaginatedBookings(sortedBookings.slice(first, first + rows)); // 초기 데이터 설정
      } catch (error) {
        console.error("API 요청 실패:", error);
        if (error.response && error.response.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("예약 정보를 불러오지 못했습니다. 다시 시도해주세요.");
        }
      }
    };

    fetchBookings();
  }, [user, navigate, first, rows]);

  useEffect(() => {
    setPaginatedBookings(bookings.slice(first, first + rows));
  }, [first, rows, bookings]);

  const handlePlaceClick = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div>
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
                {paginatedBookings.length > 0 ? (
                  paginatedBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                        {bookings.length - first - index} {/* 최신순 번호 */}
                      </td>
                      <td
                        className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center cursor-pointer text-blue-500"
                        onClick={() => handlePlaceClick(booking.id)}
                      >
                        {booking.title}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                        {booking.checkIn}
                      </td>
                      <td className="font-['GmarketSans'] border border-gray-300 p-2 text-center relative">
                        <div className="relative">
                          <div>
                            {booking.isBook === 1
                              ? "수락"
                              : booking.isBook === 0
                              ? "대기"
                              : "취소"}
                          </div>
                          <p className="hidden">{booking.bookId}</p>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="font-['GmarketSans'] text-center p-4"
                    >
                      예약한 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Paginator
            first={first}
            rows={rows}
            totalRecords={bookings.length}
            rowsPerPageOptions={[5, 10]}
            onPageChange={onPageChange}
            className="mt-4 mb-8"
          />

          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4">
            <button
              className="px-[20%] py-2 text-white bg-[#47A5A5] border border-gray-400 rounded-lg font-['GmarketSans'] mt-[25%]"
              onClick={() => (window.location.href = "/")}
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
