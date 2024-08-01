import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";
import "primeicons/primeicons.css";
import { Paginator } from "primereact/paginator";

const API_URL = process.env.REACT_APP_API_URL;

export default function Scrap() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [scrapData, setScrapData] = useState([]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const fetchScrapData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/scrap/myPage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setScrapData(response.data);
    } catch (error) {
      console.error("스크랩 데이터를 가져오는 데 실패했습니다:", error);
      alert("스크랩 데이터를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchScrapData();
  }, []);

  return (
    <div className="relative flex flex-col items-center font-['GmarketSans']">
      <AppBreadcrumb />
      <div className="flex flex-col items-center justify-center mt-20 text-2xl">
        스크랩
      </div>
      <button className="border-b-2 border-[#E1E1E1] w-[70%] flex justify-end text-sm mt-12 px-12 text-[#656565]">
        편집
      </button>
      <div className="p-12">
        {scrapData.length > 0 ? (
          scrapData.slice(first, first + rows).map((scrap, index) => (
            <div key={index} className="mb-4">
              <img src={scrap.imageUrl || ""} alt="" className="w-64 bg-gray-200 h-52" />
              <div className="flex items-center justify-between p-3">
                <div>{scrap.title}</div>
                <i className="justify-end pb-2 text-sm text-center pi pi-thumbs-up-fill">
                  {scrap.likeCount}
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
        rowsPerPageOptions={[5, 10]}
        onPageChange={onPageChange}
        className="mt-4 mb-8"
      />
      <Footer />
    </div>
  );
}
