import React, { useState } from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import NoticeSection from "../components/NoticeSection";
import InquirySection from "../components/InquirySection";
import PartnershipSection from "../components/PartnershipSection";

export default function Support() {
  // 현재 선택된 섹션을 관리하는 state를 만듭니다.
  const [selectedSection, setSelectedSection] = useState("notice");

  // 선택된 섹션에 따라 렌더링할 컴포넌트를 결정하는 함수
  const renderSection = () => {
    switch (selectedSection) {
      case "notice":
        return <NoticeSection />;
      case "inquiry":
        return <InquirySection />;
      case "partnership":
        return <PartnershipSection />;
      default:
        return <NoticeSection />;
    }
  };

  return (
    <div>
      <Header />
      <Nav />
      <div className="flex flex-col items-center font-['GmarketSans']">
        <div className="mt-12 mb-8 text-2xl font-medium">
          무엇을 도와드릴까요?
        </div>
        <div>
          <ul className="flex justify-center items-center bg-[#F8F8F8] text-[#757575] font-normal py-3 px-8 rounded-full list-none space-x-10">
            <li
              onClick={() => setSelectedSection("notice")}
              className={`cursor-pointer ${
                selectedSection === "notice"
                  ? "font-semibold text-[#47A5A5]"
                  : ""
              }`}
            >
              공지사항
            </li>
            <li
              onClick={() => setSelectedSection("inquiry")}
              className={`cursor-pointer ${
                selectedSection === "inquiry"
                  ? "font-semibold text-[#47A5A5]"
                  : ""
              }`}
            >
              1:1 문의
            </li>
            <li
              onClick={() => setSelectedSection("partnership")}
              className={`cursor-pointer ${
                selectedSection === "partnership"
                  ? "font-semibold text-[#47A5A5]"
                  : ""
              }`}
            >
              입점·제휴문의
            </li>
          </ul>
          <div className="mt-8">{renderSection()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
