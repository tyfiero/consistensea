/*global chrome*/
import { useEffect, useState } from "react";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";

import { images } from "./lib/images";
import { lowResImages } from "./lib/lowResImages";
import { createApi } from "unsplash-js";
import { useLocalStorage } from "./lib/useLocalStorage";
import { useDarkMode } from "./lib/useDarkMode";
import WelcomeModal from "./components/WelcomeModal";
function App() {
  const img = [
    "/light1.webp",
    "/light2.webp",
    "/light3.webp",
    "/light4.webp",
    "/light5.webp",
    "/light6.webp",
    "/light7.webp",
    "/light8.webp",
    "/light9.webp",
    "/light10.webp",
    "/light11.webp",
    "/light12.webp",
  ];
  const darkImg = [
    "/dark1.webp",
    "/dark2.webp",
    "/dark3.webp",
    "/dark4.webp",
    "/dark5.webp",
    "/dark6.webp",
    "/dark7.webp",
    "/dark8.webp",
    "/dark9.webp",
    "/dark10.webp",
    "/dark11.jpg",
    "/dark12.webp",
    "/dark13.webp",
    "/dark14.webp",
    "/dark15.webp",
    "/dark16.webp",
  ];
  const [welcome, setWelcome] = useLocalStorage("CSWelcome", true);
  const [darkMode, setDarkMode] = useLocalStorage("CSDarkMode", [
    "auto",
    "💻 System",
  ]);
  const [updateDarkMode, setUpdateDarkMode] = useState(false);
  const [url, setUrl] = useState(
    darkMode
      ? darkImg[Math.floor(Math.random() * darkImg.length)]
      : img[Math.floor(Math.random() * img.length)]
  );

  const theme = useDarkMode() ? "dark" : "light";

  const darkFunc = () => {
    const root = window.document.documentElement;
    if (darkMode[0] === "dark") {
      let randomDarkImg = darkImg[Math.floor(Math.random() * darkImg.length)];
      document.querySelector(":root").style.setProperty("--bg", "black");
      root.classList.add("dark");
      setUrl(randomDarkImg);
    } else if (darkMode[0] === "light") {
      let randomImg = img[Math.floor(Math.random() * img.length)];
      document.querySelector(":root").style.setProperty("--bg", "white");

      root.classList.remove("dark");
      setUrl(randomImg);
    } else {
      theme === "dark"
        ? root.classList.add("dark")
        : root.classList.remove("dark");

      theme === "dark" ? setUrl(darkImg[0]) : setUrl(img[0]);
    }
  };

  useEffect(() => {
    darkFunc();
  }, [darkMode, theme]);
  return (
    <div
      className="relative w-screen h-screen App "
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {welcome ? (
        <WelcomeModal setWelcome={setWelcome} welcome={welcome} />
      ) : null}
      <div className="fixed ">
        <img
          src={url}
          rel="preload"
          alt="background "
          className="object-cover w-screen h-screen fade-effect-turbo -z-[5]"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        <Habits
          setDarkMode={setDarkMode}
          darkMode={darkMode}
          setWelcome={setWelcome}
          welcome={welcome}
        />
      </div>
    </div>
  );
}

export default App;
