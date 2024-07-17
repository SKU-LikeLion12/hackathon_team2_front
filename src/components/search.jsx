import React from "react";
import Searchselect from "./searchselect";

export default function search() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] w-full bg-slate-200 font-black font-['GmarketSans']">
      <>
        <div className="text-white text-4xl mb-20">여기다가 뭐라고 쓰지?</div>{" "}
        <br />
        <Searchselect />
      </>
    </div>
  );
}
