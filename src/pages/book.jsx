import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";
import { locale, addLocale } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";

const { kakao } = window;

// PrimeReact 한국어 로케일 설정
addLocale("ko", {
  firstDayOfWeek: 1,
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  today: "오늘",
  clear: "초기화",
});

locale("ko"); // 기본 로케일을 한국어로 설정

// 커스텀 시간 선택기 컴포넌트
const CustomTimePicker = ({ onTimeChange }) => {
  // 시간, 분, 오전/오후
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = ["00", "30"];
  const ampm = ["오전", "오후"];

  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedAmpm, setSelectedAmpm] = useState("오전");

  useEffect(() => {
    const time = `${selectedAmpm} ${selectedHour}시 ${selectedMinute}분`;
    onTimeChange(time);
  }, [selectedHour, selectedMinute, selectedAmpm]);

  useEffect(() => {
    const container = document.getElementById("kamap"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.3902250644638, 126.645426431439), // 지도의 중심좌표
      level: 5, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    const markerPosition = new kakao.maps.LatLng(
      37.3902250644638,
      126.645426431439
    );

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);

    // 인포윈도우에 표출될 내용
    const iwContent = `
    <div class="flex flex-col justify-center items-center p-4">
      장소명
    </div>`;
    // 인포윈도우 표시 위치
    const iwPosition = new kakao.maps.LatLng(
      37.3902250644638,
      126.645426431439
    );

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시
    infowindow.open(map, marker);
  }, []);

  return (
    <div className="custom-time-picker flex items-center space-x-4">
      <select
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
        className="border p-2 w-28 mr-4"
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select
        value={selectedMinute}
        onChange={(e) => setSelectedMinute(e.target.value)}
        className="border p-2 w-28"
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <select
        value={selectedAmpm}
        onChange={(e) => setSelectedAmpm(e.target.value)}
        className="border p-2 w-28"
      >
        {ampm.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Book() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("오전 00:00");
  const [people, setPeople] = useState(null);
  const [value, setValue] = useState("");

  return (
    <div className="relative flex flex-col items-center font-['GmarketSans']">
      <AppBreadcrumb />
      <div className="flex flex-col justify-center items-center p-12">
        {/* 예약 타이틀 */}
        <div className="border-b-[1px] border-[#E1E1E1] w-full text-center text-2xl p-8 mb-12">
          예약
        </div>
        <div className="flex justify-center space-x-6">
          <div className="flex border-2 border-[#47A5A5] px-3 py-4 ">
            <div className="p-4 border-r-2 border-[#E1E1E1] h-full flex items-center">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                showWeek={false}
                locale="ko"
              />
            </div>
            <div className="pr-4">
              <div className="p-4 mb-8">
                <label
                  htmlFor="calendar-timeonly"
                  className="block mb-2 py-4 text-xl"
                >
                  시간 선택
                </label>
                <CustomTimePicker onTimeChange={setTime} />
              </div>
              <div>
                <div className="border-t-2 border-[#E1E1E1] pt-8 pb-4 px-4 text-xl">
                  인원
                </div>
                <div className="px-4">
                  <InputNumber
                    id="number-input"
                    value={people}
                    onValueChange={(e) => setPeople(e.value)}
                    mode="decimal"
                    min={0}
                    max={100}
                    step={1}
                    showButtons
                    placeholder="숫자를 입력하세요"
                    className="border-2 border-[#E0EDE6] p-2 mr-4"
                  />
                  명
                </div>
                <div className="pt-8 pb-4 px-4 text-xl">요청사항</div>
                <div className="card flex justify-content-center">
                  <InputTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={5}
                    cols={30}
                    className="ml-4 w-[90%]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              id="kamap"
              className="h-72 w-72 bg-black border-2 border-[#499a94]"
            ></div>
            <div className="bg-white h-1/2">
              <div className="flex w-full mt-8 justify-between items-center">
                title상호명
                <i className="pi pi-thumbs-up-fill px-2 py-2 border rounded-full text-sm text-center">
                  숫자
                </i>
              </div>
              <div className="font-['GmarketSans-light'] my-3">address주소</div>
              <div className="font-['GmarketSans-light'] my-3">hp연락처</div>
              <button className="w-full my-2 rounded-xl bg-[#499a94] text-white font-['Pretendard'] p-3">
                예약하기
              </button>
              <button className="w-full mt-2 rounded-xl border border-[#707070] text-[#707070] font-['Pretendard'] font-semibold p-3">
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
