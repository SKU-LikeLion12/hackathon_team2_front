import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function view() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-8 bg-white ">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-['GmarketSans'] mb-[8%]">예약 조회</h1>
            <hr className="flex justify-center my-8 border-t border-gray-300" />
          </div>
          <div className="flex justify-center">
            <table class="table-auto">
              <thead>
                <tr>
                  <th className="font-['GmarketSans'] font-normal">번호</th>
                  <th className="font-['GmarketSans'] font-normal">장소</th>
                  <th className="font-['GmarketSans'] font-normal">예약일</th>
                  <th className="font-['GmarketSans'] font-normal">승인여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-['GmarketSans'] font-thin">3</td>
                  <td className="font-['GmarketSans'] font-thin">
                    여용국 한방스파
                  </td>
                  <td className="font-['GmarketSans'] font-thin">2024.08.07</td>
                  <td className="font-['GmarketSans']">수락</td>
                </tr>
                <tr>
                  <td className="font-['GmarketSans'] font-thin">2</td>
                  <td className="font-['GmarketSans'] font-thin">티테라피</td>
                  <td className="font-['GmarketSans'] font-thin">2024.07.20</td>
                  <td className="font-['GmarketSans']">대기</td>
                </tr>
                <tr>
                  <td className="font-['GmarketSans'] font-thin">1</td>
                  <td className="font-['GmarketSans'] font-thin">
                    서울한방진흥센터
                  </td>
                  <td className="font-['GmarketSans'] font-thin">2024.07.14</td>
                  <td className="font-['GmarketSans']">취소</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
