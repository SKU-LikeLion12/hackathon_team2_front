import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchSelect() {
  const [locations, setLocations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const navigate = useNavigate();

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
        return "/beautySpa";
      case 1:
        return "/natureForestTherapy";
      case 2:
        return "/healingMeditation";
      case 3:
        return "/orientalMedicine";
      default:
        return "/";
    }
  };

  const handleSearch = () => {
    if (selectedLocation && selectedTheme !== "") {
      const path = themeToPath(selectedTheme);
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
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
      <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(parseInt(e.target.value))}
        className="mr-5 w-[40%] h-10 p-2 font-['GmarketSans-light'] text-sm font-light"
      >
        <option value="">테마를 선택해주세요.</option>
        {themes.map((theme, index) => (
          <option key={index} value={index}>
            {theme}
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
