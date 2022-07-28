/*global chrome*/
import { useState } from "react";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";

import { images } from "./lib/images";

function App() {
  // let randomImage = images[Math.floor(Math.random() * images.length)];
  // let di = [
  //   "/assets/img1.jpg",
  //   "/assets/img2.jpg",
  //   "/assets/img3.jpg",
  //   "/assets/img4.jpg",
  // ];
  // let randomDownloadedImg = di[Math.floor(Math.random() * di.length)];

  const [url, setUrl] = useState("/assets/img1.jpg");
  // const [url, setUrl] = useState(String(randomDownloadedImg));

  return (
    <div
      className="App relative "
      // style={{
      //   backgroundImage: `url(${url})`,
      // }}
    >
      <div className=" -z-10 fixed ">
        {/* <div className=" -z-10 fixed bg-gradient-to-br from-sky-300 via-sky-400 to-sky-600"> */}
        <img
          src={url}
          alt="background "
          className="object-cover w-screen h-screen fade-effect-turbo -z-[5]"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        <Habits />
      </div>
      {/* <div className="fixed flex gap-2 bottom-20 z-40 h-40 w-96 bg-white text-xs">
        icon tests
        <div className="flex flex-col items-center h-10 w-10">
          <p>small-logo</p>
          <img src={"small-logo.png"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>icon16</p>
          <img src={"icons/icon16.png"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>icon32</p>
          <img src={"icons/icon32.png"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>icon48</p>
          <img src={"icons/icon48.png"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>icon128</p>
          <img src={"icons/icon128.png"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>favicon</p>
          <img src={"assets/favicon.ico"} alt="" />
        </div>
        <div className="flex flex-col items-center h-10 w-10">
          <p>img1</p>
          <img src={"assets/img1.jpg"} alt="" />
        </div>
      </div> */}
    </div>
  );
}

export default App;
