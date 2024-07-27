import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const breadcrumbItems = [
  { label: "홈페이지", url: "/" },
  { label: "로그인", url: "/logIn" },
  { label: "회원가입", url: "/signUp" },
  { label: "고객센터", url: "/support" },
  { label: "웰니스란?", url: "/wellness" },
  { label: "쉼플 소개", url: "/shimple" },
  { label: "힐링 / 명상", url: "/healingMeditation" },
  { label: "자연 / 숲 치유", url: "/natureForestTherapy" },
  { label: "한방", url: "/orientalMedicine" },
  { label: "예약 조회", url: "/view" },
  { label: "뷰티 / 스파", url: "/beautySpa" },
  { label: "상세페이지", url: "/detailInfo" },
  { label: "예약하기", url: "/book" },
];

export const AppBreadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const items = [];

    pathnames.forEach((value, index) => {
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;
      const item = breadcrumbItems.find((item) => item.url === url);
      if (item) {
        items.push({ label: item.label, url });
      }
    });

    return items;
  };

  return (
    <BreadCrumb
      model={getBreadcrumbItems()}
      home={{ icon: "pi pi-home", url: "/" }}
    />
  );
};
