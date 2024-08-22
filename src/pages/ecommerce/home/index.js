import React from "react";
export default function Home() {
  return (
    <>
      <div>
        <div className="top-home h-[480px] flex">
          <div className="main-menu w-1/5 min-w-[180px] h-full bg-slate-700 rounded-md duration-300"></div>
          <div className="slide-banner flex-1  h-full bg-yellow-200 mx-2 rounded-md">

          </div>
          <div className="right-banner lg:w-60 md:h-full bg-blue-500 rounded-md duration-300"></div>
        </div>
      </div>
    </>
  );
}
