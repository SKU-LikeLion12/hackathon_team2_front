import React, { useState, useEffect } from "react";
/* import { AiFillHome } from "react-icons/ai"; */
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function OrientalMedicine(HanBang) {
  const [hanbang, setHanyang] = useState([]);

  useEffect(() => {
    const FetchHanyang = async () => {
      try {
        // eslint-disable-next-line no-undef
        setHanyang(response.data.results);
      } catch (error) {
        console.log("실패");
      }
    };

    FetchHanyang();
  }, []);

  return (
    <div>
      <div className="relative z-[-20]">
        <img src={`${process.env.PUBLIC_URL}/img/hanbang.png`} alt="로고" />
        <div className="absolute left-[48%] top-[26%] font-['GmarketSans'] text-[40px] font-bold">
          한방
        </div>
        {/* <AiFillHome className="absolute top-[3%] left-[20px]"/> */}
      </div>
      <Footer />
    </div>
  );
}
