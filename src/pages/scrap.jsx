import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";
import "primeicons/primeicons.css";
import { Paginator } from "primereact/paginator";
import { useAuth } from "../contexts/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export default function Scrap() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [scrapData, setScrapData] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const fetchScrapData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    try {
      console.log("사용자 토큰:", token);
      const response = await axios.post(
        `${API_URL}/scrap/myPage`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 서버 응답 데이터 확인
      console.log("스크랩 데이터:", response.data);
      setScrapData(response.data);
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 데 실패했습니다:", error);
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 상태:", error.response.status);
      } else {
        console.error("네트워크 오류:", error.message);
      }
      alert("스크랩 데이터를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }
    fetchScrapData();
  }, [user, navigate]);

  return (
    <div className="relative flex flex-col items-center font-['GmarketSans']">
      <AppBreadcrumb />
      <div className="flex flex-col items-center justify-center mt-20 text-2xl">
        스크랩
      </div>
      <button className="border-b-2 border-[#E1E1E1] w-[70%] flex justify-end text-sm mt-12 px-12 text-[#656565]">
        편집
      </button>
      <div className="p-12 flex space-x-4">
        {scrapData.length > 0 ? (
          scrapData.slice(first, first + rows).map((scrap, index) => (
            <div key={index} className="mb-4">
              <img
                src={`${process.env.PUBLIC_URL}/img/resourceEnd/${scrap.location}/${scrap.wellness_id}/1.png`} // 이미지 URL을 실제로 변경
                alt={scrap.title}
                className="w-64 bg-gray-200 h-52"
              />
              <div className="flex items-center justify-between p-3">
                <div>{scrap.title}</div>
                <i className="justify-end pb-2 text-sm text-center pi pi-thumbs-up-fill">
                  {scrap.likeCount || 0}
                </i>
              </div>
            </div>
          ))
        ) : (
          <div>스크랩한 매장이 없습니다.</div>
        )}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={scrapData.length}
        rowsPerPageOptions={[3, 5]}
        onPageChange={onPageChange}
        className="mt-4 mb-8"
      />
      <Footer />
    </div>
  );
}
