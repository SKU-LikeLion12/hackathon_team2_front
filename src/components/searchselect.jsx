import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchSelect() {
  const [locations, setLocations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const navigate = useNavigate();

  const locationMapping = {
    0: "서울특별시",
    1: "인천광역시",
    2: "대구광역시",
    3: "광주광역시",
    4: "부산광역시",
    5: "울산광역시",
    6: "경기도",
    7: "강원특별자치도",
    8: "충청북도",
    9: "충청남도",
    10: "전북특별자치도",
    11: "전라남도",
    12: "경상북도",
    13: "경상남도",
    14: "제주특별자치도",
  };

  const themeMapping = {
    0: "한방",
    1: "뷰티 / 스파",
    2: "자연 / 숲 치유",
    3: "힐링 / 명상",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/mainPage`
        );
        const data = response.data;

        const uniqueLocations = [...new Set(data.map((item) => item.location))];
        const uniqueThemes = [...new Set(data.map((item) => item.theme))];

        setLocations(uniqueLocations);
        setThemes(uniqueThemes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const themeToPath = (theme) => {
    switch (theme) {
      case 0:
        return "/orientalMedicine";
      case 1:
        return "/beautySpa";
      case 2:
        return "/natureForestTherapy";
      case 3:
        return "/healingMeditation";
      default:
        return "/";
    }
  };

  const handleSearch = () => {
    if (selectedLocation && selectedTheme !== "") {
      const path = themeToPath(parseInt(selectedTheme));
      navigate(`${path}?location=${selectedLocation}`);
    } else {
      alert("지역과 테마를 모두 선택해주세요.");
    }
  };

  return (
    <div className="flex bg-white/50 w-[50%] p-5">
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="mr-5 w-[40%] h-10 p-2 font-['GmarketSans-light'] text-sm font-light"
      >
        <option value="">지역을 선택해주세요.</option>
        {Object.entries(locationMapping).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
        className="mr-5 w-[40%] h-10 p-2 font-['GmarketSans-light'] text-sm font-light"
      >
        <option value="">테마를 선택해주세요.</option>
        {Object.entries(themeMapping).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        className="w-[20%] bg-[#47A5A5] text-white font-['GmarketSans-light'] "
      >
        검색
      </button>
    </div>
  );
}
