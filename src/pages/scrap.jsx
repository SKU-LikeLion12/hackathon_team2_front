import React, { useState } from "react";
import Footer from "../components/footer";
import { AppBreadcrumb } from "../components/BreadCrumb";
import "primeicons/primeicons.css";
import { Paginator } from "primereact/paginator";

export default function Scrap() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="relative flex flex-col items-center font-['GmarketSans']">
      <AppBreadcrumb />
      <div className="flex flex-col justify-center items-center mt-20 text-2xl">
        스크랩
      </div>
      <button className="border-b-2 border-[#E1E1E1] w-[70%] flex justify-end text-sm mt-12 px-12 text-[#656565]">
        편집
      </button>
      <div className="p-12">
        <div>
          <img src="" alt="" className="bg-gray-200 w-64 h-52" />
          <div className="flex items-center justify-between p-3">
            <div>장소명</div>
            <i className="pi pi-thumbs-up-fill text-sm text-center pb-2 justify-end">
              숫자
            </i>
          </div>
        </div>
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={64}
        rowsPerPageOptions={[5, 10]}
        onPageChange={onPageChange}
        className="mt-4 mb-8"
      />
      <Footer />
    </div>
  );
}
