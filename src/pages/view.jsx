import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useReservations } from "../contexts/ReservationContext";
import { useAuth } from "../contexts/AuthContext";
import { Paginator } from "primereact/paginator";
import "primeicons/primeicons.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function View() {
  const [paginatedBookings, setPaginatedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { reservations } = useReservations(); // Context에서 예약 목록 가져오기
  const { user } = useAuth(); // 로그인 상태 확인
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // 페이지 변경 시 호출되는 함수
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    // 로그인하지 않은 경우 홈으로 리다이렉트
    if (!user) {
      alert("로그인 우선 해주세요!");
      navigate("/login");
      return;
    }

    // API에서 예약 데이터를 가져오는 함수
    const fetchReservations = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/book/myPage`,
          { token: user.token, isOwner: 0 },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("예약 데이터: ", response.data);

        // 예약 데이터를 가공하여 상태에 저장
        const sortedBookings = response.data.sort(
          (a, b) => new Date(b.checkIn) - new Date(a.checkIn)
        );
        const mappedReservations = sortedBookings.map((res) => ({
          id: res.bookId,
          title: res.title,
          headCnt: `${res.headCnt}인`,
          checkIn: res.checkIn,
          status:
            res.isBook === 0 ? "대기중" : res.isBook === 1 ? "수락" : "거절",
        }));

        console.log("가공된 예약 데이터: ", mappedReservations);
        // setReservations(mappedReservations); // Context에 예약 데이터 저장
      } catch (error) {
        console.error("API 요청 실패:", error);
        if (error.response && error.response.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("예약 정보를 불러오지 못했습니다. 다시 시도해주세요.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user, navigate]);

  useEffect(() => {
    console.log("예약 상태 업데이트: ", reservations);
    setPaginatedBookings(reservations.slice(first, first + rows));
  }, [first, rows, reservations]); // reservations가 변경될 때마다 호출

  const handlePlaceClick = (bookId) => {
    console.log("Navigating to booking ID:", bookId);
    navigate(`/booking/${bookId}`);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

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
                    순서
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    제목
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    인원
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    체크인
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    승인여부
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.length > 0 ? (
                  paginatedBookings.map((reservation) => (
                    <tr
                      key={reservation.id}
                      onClick={() => handlePlaceClick(reservation.id)}
                    >
                      <td className="font-['GmarketSans'] font-thin border p-2 text-center">
                        {reservation.id}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border p-2 text-center">
                        {reservation.title}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border p-2 text-center">
                        {reservation.headCnt}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border p-2 text-center">
                        {reservation.checkIn}
                      </td>
                      <td className="font-['GmarketSans'] font-thin border p-2 text-center">
                        {reservation.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="font-['GmarketSans'] text-center p-4"
                    >
                      예약한 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mb-8">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={reservations.length}
              onPageChange={onPageChange}
              rowsPerPageOptions={[5, 10]}
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4">
            <button
              className="px-[20%] py-2 text-white bg-[#47A5A5] border border-gray-400 rounded-lg font-['GmarketSans'] mt-[25%]"
              onClick={() => navigate("/")}
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
