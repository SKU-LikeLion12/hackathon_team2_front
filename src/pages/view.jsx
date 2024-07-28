import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function View() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen mt-4">
        <div className="w-full max-w-2xl bg-white">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-['GmarketSans'] mb-[8%]">예약 조회</h1>
            <hr className="flex justify-center my-8 border-t border-gray-300" />
          </div>

          {/* 예약 정보 */}
          <div className="flex justify-center mb-8">
            <table className="w-full border-collapse border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-200 p-2">
                    번호
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    장소
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    예약일
                  </th>
                  <th className="font-['GmarketSans'] font-normal border border-t-2 border-t-gray-500 border-gray-300 p-2">
                    승인여부
                  </th>
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
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                    2
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 ">
                    티테라피
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                    2024.07.20
                  </td>
                  <td className="font-['GmarketSans'] border border-gray-300 p-2 text-center relative">
                    <div className="relative">
                      <div>대기</div>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/triangle.png`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                      />
                    </div>
                  </td>
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
