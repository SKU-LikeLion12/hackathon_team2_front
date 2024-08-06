import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footer";
import { useAuth } from "../contexts/AuthContext";
import { useReservations } from "../contexts/ReservationContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function Master() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedRow, setSelectedRow] = useState(null);
  const [title, setTitle] = useState(""); // 상태에 title 추가
  const { user } = useAuth();
  const { reservations, setReservations, updateReservationStatus } =
    useReservations();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/book/myPage`,
          { token: user.token, isOwner: 1 },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("예약 데이터: ", response.data);

        // 제목을 API 응답에서 첫 번째 예약의 title로 설정
        if (response.data.length > 0) {
          setTitle(response.data[0].title);
        }

        setReservations(
          response.data.map((res) => ({
            id: res.bookId,
            title: res.title,
            headCnt: `${res.headCnt}인`,
            checkIn: res.checkIn,
            status:
              res.isBook === 0 ? "대기중" : res.isBook === 1 ? "수락" : "거절",
          }))
        );
      } catch (error) {
        console.error("API 요청 실패:", error);
        alert("예약 정보를 불러오지 못했습니다. 다시 시도해주세요.");
      }
    };

    fetchReservations();
  }, [user, setReservations]);

  const togglePopup = (event, rowIndex) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setSelectedRow(rowIndex);
    setPopupVisible(!popupVisible);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedRow !== null) {
      const reservationId = reservations[selectedRow].id;
      updateReservationStatus(reservationId, newStatus);
    }
    setPopupVisible(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen mt-4">
        <div className="w-full max-w-2xl bg-white">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-['GmarketSans'] mb-[4%]">예약 조회</h1>
            <p className="font-['GmarketSans'] font-thin">
              {title || "장소명"}
            </p>{" "}
            {/* 동적으로 제목 표시 */}
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
                {reservations.length > 0 ? (
                  reservations.map((reservation, index) => (
                    <tr key={reservation.id}>
                      <td
                        className={`font-['GmarketSans'] font-thin border p-2 text-center ${
                          index === reservations.length - 1
                            ? "border-b-2 border-b-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        {reservation.id}
                      </td>
                      <td
                        className={`font-['GmarketSans'] font-thin border p-2 text-center ${
                          index === reservations.length - 1
                            ? "border-b-2 border-b-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        {reservation.title}
                      </td>
                      <td
                        className={`font-['GmarketSans'] font-thin border p-2 text-center ${
                          index === reservations.length - 1
                            ? "border-b-2 border-b-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        {reservation.headCnt}
                      </td>
                      <td
                        className={`font-['GmarketSans'] font-thin border p-2 text-center ${
                          index === reservations.length - 1
                            ? "border-b-2 border-b-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        {reservation.checkIn}
                      </td>
                      <td
                        className={`font-['GmarketSans'] border p-2 text-center relative ${
                          reservation.status === "변경"
                            ? "text-gray-300 border-gray-300 underline"
                            : index === reservations.length - 1
                            ? "border-b-2 border-b-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        <button onClick={(event) => togglePopup(event, index)}>
                          {reservation.status}
                        </button>
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

          {/* 팝업창 */}
          {popupVisible && (
            <div
              className="absolute"
              style={{ top: popupPosition.top, left: popupPosition.left }}
            >
              <div className="p-4 bg-white border border-gray-300 shadow-lg">
                <div className="flex flex-col items-center">
                  <div
                    className="py-2 cursor-pointer font-['GmarketSans']"
                    onClick={() => handleStatusChange("수락")}
                  >
                    수락
                  </div>
                  <hr className="w-full border-t border-gray-300" />
                  <div
                    className="py-2 cursor-pointer font-['GmarketSans']"
                    onClick={() => handleStatusChange("대기중")}
                  >
                    대기중
                  </div>
                  <hr className="w-full border-t border-gray-300" />
                  <div
                    className="py-2 cursor-pointer font-['GmarketSans']"
                    onClick={() => handleStatusChange("거절")}
                  >
                    거절
                  </div>
                </div>
              </div>
            </div>
          )}

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
