import React from "react";

function Promo() {
  return (
    <div className="z-10 flex items-center justify-center w-screen h-screen bg-gradient-to-t ">
      <div className="flex items-center gap-5 mb-40">
        {" "}
        <div className="flex items-center h-full">
          {" "}
          <p className="font-bold text-9xl f2 logo drop-shadow-md">Consisten</p>
          <p className="font-bold text-9xl f2 logo2 drop-shadow-md">Sea</p>
        </div>
        <img
          src="/icons/icon128.png"
          alt="ConsistenSea logo"
          className="z-50 mt-3 w-36 h-36"
        />
      </div>
    </div>
  );
}

export default Promo;
