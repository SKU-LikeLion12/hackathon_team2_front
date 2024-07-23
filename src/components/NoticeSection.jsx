import React, { useState, useEffect } from "react";
import axios from "axios"; // 데이터 fetching을 위해 사용

function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // API에서 데이터를 가져오는 함수
    // const fetchNotices = async () => {
    //   const res = await axios.get("your_api_endpoint");
    //   setNotices(res.data);
    // };

    // fetchNotices();

    // 임시 더미 데이터
    const dummyData = [
      { id: 1, title: "공지사항 1", date: "2024-03-10" },
      { id: 2, title: "공지사항 2", date: "2024-03-11" },
      // ... 더 많은 데이터 추가
    ];
    setNotices(dummyData);
  }, []);

  // 현재 페이지의 공지사항 가져오기
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 검색 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 검색 결과 필터링
  const filteredNotices = currentNotices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">번호</th>
            <th className="border p-2">제목</th>
            <th className="border p-2">등록일</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotices.map((notice, index) => (
            <tr key={notice.id}>
              <td className="border p-2">{indexOfFirstNotice + index + 1}</td>
              <td className="border p-2">{notice.title}</td>
              <td className="border p-2">{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        noticesPerPage={noticesPerPage}
        totalNotices={notices.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

// 페이지네이션 컴포넌트
function Pagination({ noticesPerPage, totalNotices, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotices / noticesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 border rounded ${
                currentPage === number ? "bg-blue-500 text-white" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NoticeList;
