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
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                    3
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center ">
                    여용국 한방스파
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                    2024.08.07
                  </td>
                  <td className="font-['GmarketSans'] border border-gray-300 p-2 text-center relative">
                    <div className="relative">
                      <div>수락</div>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/o.png`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
                    2
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-gray-300 p-2 text-center">
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
                <td className="font-['GmarketSans'] font-thin border border-b-2 border-b-gray-500  border-gray-300 p-2 text-center">
                    1
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-b-2 border-b-gray-500 border-gray-300 p-2 text-center">
                    서울한방진흥센터
                  </td>
                  <td className="font-['GmarketSans'] font-thin border border-b-2 border-b-gray-500 border-gray-300 p-2 text-center">
                    2024.07.14
                  </td>
                  <td className="font-['GmarketSans'] border border-b-2 border-b-gray-500 border-gray-300 p-2 text-center relative">
                    <div className="relative">
                      <div>취소</div>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/x.png`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute font-['GmarketSans']">1</div>
            <img src={`${process.env.PUBLIC_URL}/img/next.png`} className="flex justify-center " />
          </div>

          
          {/* 하단 버튼 */}
          <div className="flex justify-center space-x-4">
            <button className="px-[20%] py-2 text-white bg-[#47A5A5] border border-gray-400 rounded-lg  font-['GmarketSans'] mt-[25%]"
            onClick={() => window.location.href = 'http://localhost:3000/'}
            >홈으로 가기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
