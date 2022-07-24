/*global chrome*/

import { createRef, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";
import logo from "./logo.svg";
import { useClickOutside } from "./lib/useClickOutside";
function App() {
  console.log(chrome.alarms);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [url, setUrl] = useState(
    "https://images.unsplash.com/photo-1466094899371-97b327dff551?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const menuRef = createRef();

  const onClickOutside = () => {
    setSettingsOpen(false);
  };

  useClickOutside(menuRef, onClickOutside);

  useEffect(() => {
    // fetchImages()
    //   .then((images) => {
    //     console.log(images);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const getImage = async () => {
      const res = await fetch(
        "https://source.unsplash.com/1337x752/?purple,nature"
      )
        .then((img) => {
          console.log(img);
          setUrl(img.url);
        })
        .catch((err) => console.log(err));
    };

    getImage();
  }, []);
  return (
    <div
      className="App relative "
      // style={{
      //   backgroundImage: `url(${url})`,
      // }}
    >
      <img
        src={url}
        alt="background "
        className="w-screen h-screen -z-10 fixed"
      />
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
