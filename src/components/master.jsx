import React, { useState } from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Master() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedRow, setSelectedRow] = useState(null);
  const [reservations, setReservations] = useState([
    { id: 3, name: "멋쟁이 사자", people: "4인", date: "2024.08.07", status: "변경" },
    { id: 2, name: "성결대", people: "6인", date: "2024.07.20", status: "수락" },
    { id: 1, name: "2팀 최고", people: "2인", date: "2024.07.14", status: "거절" }
  ]);

  const togglePopup = (event, rowIndex) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setSelectedRow(rowIndex);
    setPopupVisible(!popupVisible);
  };

  const handleStatusChange = (newStatus) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation, index) =>
        index === selectedRow ? { ...reservation, status: newStatus } : reservation
      )
    );
    setPopupVisible(false);
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="flex items-center justify-center min-h-screen mt-4">
        <div className="w-full max-w-2xl bg-white">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-['GmarketSans'] mb-[4%]">예약 조회</h1>
            <p className="font-['GmarketSans'] font-thin">{`<여용국 한방스파>`}</p>
            <hr className="flex justify-center my-8 border-t border-gray-300" />
          </div>

          {/* 예약 정보 */}
          <div className="flex justify-center mb-8">
            <table className="w-full border-collapse border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-200 p-2">순서</th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">이름</th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">인원</th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">예약일</th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">승인여부</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={reservation.id}>
                    <td className={`font-['GmarketSans'] font-thin border p-2 text-center ${index === reservations.length - 1 ? 'border-b-2 border-b-gray-500' : 'border-gray-300'}`}>{reservation.id}</td>
                    <td className={`font-['GmarketSans'] font-thin border p-2 text-center ${index === reservations.length - 1 ? 'border-b-2 border-b-gray-500' : 'border-gray-300'}`}>{reservation.name}</td>
                    <td className={`font-['GmarketSans'] font-thin border p-2 text-center ${index === reservations.length - 1 ? 'border-b-2 border-b-gray-500' : 'border-gray-300'}`}>{reservation.people}</td>
                    <td className={`font-['GmarketSans'] font-thin border p-2 text-center ${index === reservations.length - 1 ? 'border-b-2 border-b-gray-500' : 'border-gray-300'}`}>{reservation.date}</td>
                    <td
                      className={`font-['GmarketSans'] border p-2 text-center relative ${reservation.status === "변경" ? "text-gray-300 border-gray-300 underline" : index === reservations.length - 1 ? "border-b-2 border-b-gray-500" : "border-gray-300"}`}
                    >
                      <button onClick={(event) => togglePopup(event, index)}>{reservation.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 팝업창 */}
          {popupVisible && (
            <div className="absolute" style={{ top: popupPosition.top, left: popupPosition.left }}>
              <div className="p-4 bg-white border border-gray-300 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="py-2 cursor-pointer font-['GmarketSans']" onClick={() => handleStatusChange("수락")}>수락</div>
                  <hr className="w-full border-t border-gray-300" />
                  <div className="py-2 cursor-pointer font-['GmarketSans']" onClick={() => handleStatusChange("대기중")}>대기중</div>
                  <hr className="w-full border-t border-gray-300" />
                  <div className="py-2 cursor-pointer font-['GmarketSans']" onClick={() => handleStatusChange("거절")}>거절</div>
                </div>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4">
            <button className="px-[20%] py-2 text-white bg-[#47A5A5] border border-gray-400 rounded-lg font-['GmarketSans'] mt-[25%]">
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
