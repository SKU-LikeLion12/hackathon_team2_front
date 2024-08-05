import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";
import { locale, addLocale } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const { kakao } = window;
const API_URL = process.env.REACT_APP_API_URL;

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

locale("ko");

const CustomTimePicker = ({ onTimeChange }) => {
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
  }, [selectedHour, selectedMinute, selectedAmpm, onTimeChange]);

  return (
    <div className="flex items-center space-x-4 custom-time-picker">
      <select
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
        className="p-2 mr-4 border w-28"
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
        className="p-2 border w-28"
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
        className="p-2 border w-28"
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
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [time, setTime] = useState("오전 00:00");
  const [people, setPeople] = useState(null);
  const [value, setValue] = useState("");
  const [placeData, setPlaceData] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth(); // useAuth에서 user 받아오기

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`${API_URL}/detail/get/${id}`);
        setPlaceData(response.data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    if (id) {
      fetchPlaceData();
    }
  }, [id]);

  useEffect(() => {
    if (placeData && placeData.lati && placeData.hard) {
      const container = document.getElementById("kamap");
      const options = {
        center: new kakao.maps.LatLng(placeData.lati, placeData.hard),
        level: 5,
      };

      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(
        placeData.lati,
        placeData.hard
      );

      new kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      const iwContent = `
        <div class="flex flex-col justify-center items-center p-4">
          ${placeData.title || "장소명"}
        </div>`;
      const iwPosition = new kakao.maps.LatLng(placeData.lati, placeData.hard);

      new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      }).open(
        map,
        new kakao.maps.Marker({
          position: markerPosition,
          map: map,
        })
      );
    }
  }, [placeData]);

  const handleDateChange = (e) => {
    setDate(e.value);
    if (e.value) {
      const year = e.value.getFullYear();
      const month = (e.value.getMonth() + 1).toString().padStart(2, "0");
      const day = e.value.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setDateString(formattedDate);
      console.log("Selected Date:", formattedDate);
    }
  };

  const handleReservation = async () => {
    if (!user?.token) {
      alert("토큰이 없습니다. 로그인이 필요합니다.");
      return;
    }

    const [selectedAmpm, selectedHour, selectedMinute] = time
      .split(/시|분| /)
      .filter(Boolean);
    const isPM = selectedAmpm === "오후";
    const hour24 =
      isPM && selectedHour !== "12"
        ? parseInt(selectedHour) + 12
        : parseInt(selectedHour);

    const reservationData = {
      token: user.token, // token을 user 객체에서 가져오기
      wellnessId: parseInt(id),
      content: value,
      headCnt: people,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: hour24,
      minute: parseInt(selectedMinute),
    };

    console.log("Reservation Data:", reservationData);

    try {
      const response = await axios.post(`${API_URL}/book`, reservationData);
      if (response.status === 201) {
        alert("예약이 성공적으로 완료되었습니다.");
        navigateToPage("/booking");
      } else {
        alert("예약에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert("예약 중 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="relative flex flex-col items-center font-['GmarketSans']">
      <AppBreadcrumb />
      <div className="flex flex-col items-center justify-center p-12">
        <div className="border-b-[1px] border-[#E1E1E1] w-full text-center text-2xl p-8 mb-12">
          예약
        </div>
        <div className="flex justify-center space-x-6">
          <div className="flex border-2 border-[#47A5A5] px-3 py-4">
            <div className="p-4 border-r-2 border-[#E1E1E1] h-full flex items-center">
              <Calendar
                value={date}
                onChange={handleDateChange}
                inline
                showWeek={false}
                locale="ko"
              />
            </div>
            <div className="pr-4">
              <div className="p-4 mb-8">
                <label
                  htmlFor="calendar-timeonly"
                  className="block py-4 mb-2 text-xl"
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
                <div className="px-4 pt-8 pb-4 text-xl">요청사항</div>
                <div className="flex card justify-content-center">
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
              {placeData && (
                <>
                  <div className="flex items-center justify-between w-full mt-8">
                    {placeData.title}
                    <i className="px-2 py-2 text-sm text-center border rounded-full pi pi-thumbs-up-fill">
                      {placeData.likes}
                    </i>
                  </div>
                  <div className="font-['GmarketSans-light'] my-3">
                    {placeData.address}
                  </div>
                  <div className="font-['GmarketSans-light'] my-3">
                    {placeData.contact}
                  </div>
                </>
              )}
              <button
                className="w-full my-2 rounded-xl bg-[#499a94] text-white font-['Pretendard'] p-3"
                onClick={handleReservation}
              >
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
