import React, { useState } from "react";

export default function Map() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const openModal = (region) => {
    setSelectedRegion(region);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-[45%] left-28">
      <img
        src={`${process.env.PUBLIC_URL}/homeMap/mainMapBg.png`}
        alt="전국 지도"
        className="w-[70%]"
      />
      <div className="white-filter">
        <div className="sig">
          <img
            src={`${process.env.PUBLIC_URL}/homeMap/seoulMap.png`}
            alt="서울"
            className="cursor-pointer w-[5%] absolute top-[21.2%] left-[20.5%]"
            onClick={() => openModal("sig")}
          />
          <img
            src={`${process.env.PUBLIC_URL}/homeMap/gyeonggiMap.png`}
            alt="경기"
            className="cursor-pointer w-[21%] absolute top-[10.7%] left-[15%]"
            onClick={() => openModal("sig")}
          />

          <img
            src={`${process.env.PUBLIC_URL}/homeMap/incheonMap.png`}
            alt="인천"
            className="cursor-pointer w-[2.5%] absolute top-[22%] left-[17.3%]"
            onClick={() => openModal("sig")}
          />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/homeMap/gangwonMap.png`}
          alt="강원"
          className="cursor-pointer w-[32%] absolute top-[5.5%] left-[26.7%]"
          onClick={() => openModal("gangwon")}
        />

        <img
          src={`${process.env.PUBLIC_URL}/homeMap/choongnamMap.png`}
          alt="충남"
          className="cursor-pointer w-[21.5%] absolute top-[32.85%] left-[10%]"
          onClick={() => openModal("choongnam")}
        />

        <img
          src={`${process.env.PUBLIC_URL}/homeMap/choongbukMap.png`}
          alt="충북"
          className="cursor-pointer w-[20%] absolute top-[29.95%] left-[27.8%]"
          onClick={() => openModal("choongbuk")}
        />

        <img
          src={`${process.env.PUBLIC_URL}/homeMap/jeonbukMap.png`}
          alt="전북"
          className="cursor-pointer w-[22%] absolute top-[49.8%] left-[13.7%]"
          onClick={() => openModal("jeonbuk")}
        />
        <div className="sig">
          <img
            src={`${process.env.PUBLIC_URL}/homeMap/jeonnamMap.png`}
            alt="전남"
            className="cursor-pointer w-[25.6%] absolute top-[61.7%] left-[7.7%]"
            onClick={() => openModal("jeonnam")}
          />

          <img
            src={`${process.env.PUBLIC_URL}/homeMap/gwangjuMap.png`}
            alt="광주"
            className="cursor-pointer w-[5%] absolute top-[65.77%] left-[16.3%]"
            onClick={() => openModal("gwangju")}
          />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/homeMap/gyeongbukMap.png`}
          alt="경북"
          className="cursor-pointer w-[27%] absolute top-[27.7%] left-[35.8%]"
          onClick={() => openModal("gyeongbuk")}
        />

        <img
          src={`${process.env.PUBLIC_URL}/homeMap/gyeongnamMap.png`}
          alt="경남"
          className="cursor-pointer w-[24.5%] absolute top-[54.8%] left-[31.3%]"
          onClick={() => openModal("gyeongnam")}
        />
        <div className="ulbu">
          <img
            src={`${process.env.PUBLIC_URL}/homeMap/ulsanMap.png`}
            alt="울산"
            className="cursor-pointer w-[6.5%] absolute top-[58.85%] left-[53.7%]"
            onClick={() => openModal("ulbu")}
          />

          <img
            src={`${process.env.PUBLIC_URL}/homeMap/busanMap.png`}
            alt="부산"
            className="cursor-pointer w-[6.9%] absolute top-[64.8%] left-[50.5%]"
            onClick={() => openModal("ulbu")}
          />
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/homeMap/jejuMap.png`}
          alt="제주"
          className="cursor-pointer w-[10.7%] absolute top-[91.75%] left-[7.8%]"
          onClick={() => openModal("jeju")}
        />
      </div>
      <div
        className={`modal ${modalOpen ? "modal-open" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            src={`${process.env.PUBLIC_URL}/homeMap/${selectedRegion}Info.png`}
            alt={`${selectedRegion} 정보`}
          />
        </div>
      </div>
    </div>
  );
}
