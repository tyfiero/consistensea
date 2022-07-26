/*global chrome*/
import { useState } from "react";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";

import { images } from "./lib/images";

function App() {
  let randomImage = images[Math.floor(Math.random() * images.length)];
  let di = ["/img1.jpg", "/img2.jpg", "img3.jpg", "img4.jpg"];
  let randomDownloadedImg = di[Math.floor(Math.random() * di.length)];
  console.log(randomDownloadedImg);

  const [url, setUrl] = useState(String(randomDownloadedImg));

  return (
    <div
      className="App relative "
      style={
        {
          // backgroundImage: `url(${url})`,
          // backgroundColor: `#000`,
        }
      }
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
    </div>
  );
}

export default App;
