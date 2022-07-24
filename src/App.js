/*global chrome*/

import { createRef, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";
import logo from "./logo.svg";
import { useClickOutside } from "./lib/useClickOutside";

import { images } from "./lib/images";
function App() {
  console.log(chrome.storage);
  let randomImage = images[Math.floor(Math.random() * images.length)];
  let di = ["/img1.jpg", "/img2.jpg", "img3.jpg", "img4.jpg"];
  let randomDownloadedImg = di[Math.floor(Math.random() * di.length)];
  console.log(randomDownloadedImg);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [url, setUrl] = useState(String(randomDownloadedImg));
  const menuRef = createRef();

  const onClickOutside = () => {
    setSettingsOpen(false);
  };

  useClickOutside(menuRef, onClickOutside);

  useEffect(() => {
    console.time("fetchImage");
    // setUrl();
    // fetchImages()
    //   .then((images) => {
    //     console.log(images);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const getImage = async () => {
    //   const res = await fetch(
    //     "https://source.unsplash.com/1337x752/?purple,nature"
    //   )
    //     .then((img) => {
    //       console.log(img);
    //       setUrl(img.url);
    //     })
    //     .catch((err) => console.log(err));
    // };
    // getImage();
  }, []);
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
          onLoad={() => {
            console.timeEnd("fetchImage");
          }}
          className="object-cover w-screen h-screen fade-effect-turbo -z-[5]"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        <Habits />
      </div>

      <div
        className="absolute top-3  left-3 cursor-pointer hover:scale-125 transition"
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        <FaCog className="text-white/80 scale-150" />
      </div>

      {settingsOpen && (
        <div
          ref={menuRef}
          className="absolute top-10 select-none left-20 bg-white/80 rounded-lg  transition w-64 h-32 fade-effect-fast shadow-xl"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex gap-2 items-center m-2">
              {" "}
              <div className="flex">
                {" "}
                <p className="text-2xl logo font-bold drop-shadow-md">
                  Consisten
                </p>
                <p className="text-2xl font-bold logo drop-shadow-md">Sea</p>
              </div>
              <img
                src="/small-logo.png"
                alt="ConsistenSea logo"
                className="h-10 w-10 "
              />
            </div>
            <p className="text-2xl font-bold">Settings</p>
            <div className="flex flex-col items-center justify-center w-full h-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
