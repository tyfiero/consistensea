/*global chrome*/

import { useState, useRef, useEffect } from "react";

import { FaCheck, FaPlay, FaStop, FaUndo } from "react-icons/fa";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useWindowSize } from "../lib/useWindowSize";
import { localMode } from "../lib/constants";

function Circle({ num, color, name, time, setAsDone, setRemaining, playing }) {
  console.log("rerender");
  // console.log(num);

  const [start, setStart] = useState(playing);
  const [key, setKey] = useState(0);
  const [edit, setEdit] = useState(false);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   "
  );
  const [ringColor, setRingColor] = useState("#0369a1");
  const [textColor, setTextColor] = useState("  text-sky-800");
  const [bounds, setBounds] = useState({
    top: 100,
    left: 100,
    right: 100,
    bottom: 100,
  });
  const windowSize = useWindowSize();
  const circleRef = useRef(null);
  console.log(start);

  // console.log(windowSize);

  useEffect(() => {
    switch (color) {
      case "purple":
        setBgColor(
          "bg-gradient-to-br from-purple-50 via-purple-300 to-purple-700  "
        );
        setRingColor("#7e22ce");
        setTextColor("  text-purple-800");
        break;
      case "indigo":
        setBgColor(
          "bg-gradient-to-br from-indigo-50 via-indigo-300 to-indigo-700   "
        );
        setRingColor("#4338ca");
        setTextColor("  text-indigo-800");
        break;
      case "sky":
        setBgColor("bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   ");
        setRingColor("#0369a1");
        setTextColor("  text-sky-800");
        break;
      case "teal":
        setBgColor(
          "bg-gradient-to-br from-teal-50 via-teal-300 to-teal-700   "
        );
        setRingColor("#0f766e");
        setTextColor("  text-teal-800");
        break;
      case "green":
        setBgColor(
          "bg-gradient-to-br from-green-50 via-green-300 to-green-700   "
        );
        setRingColor("#15803d");
        setTextColor("  text-green-800");
        break;
      case "yellow":
        setBgColor(
          "bg-gradient-to-br from-yellow-50 via-yellow-300 to-yellow-700   "
        );
        setRingColor("#f9c822");
        setTextColor("  text-yellow-800");
        break;
      case "orange":
        setBgColor(
          "bg-gradient-to-br from-orange-50 via-orange-300 to-orange-700   "
        );
        setRingColor("#f57f22");
        setTextColor("  text-orange-800");
        break;
      case "red":
        setBgColor("bg-gradient-to-br from-red-50 via-red-300 to-red-700   ");
        setRingColor("#e53e3e");
        setTextColor("  text-red-800");
        break;
      case "black":
        setBgColor(
          "bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900   "
        );
        setRingColor("#9ca3af");
        setTextColor("  text-slate-50");
        break;
      default:
        setBgColor("bg-gradient-to-br from-sky-50 via-sky-400 to-sky-700   ");
        setRingColor("#0369a1");
        setTextColor("  text-sky-800");
        break;
    }
  }, [color]);

  useEffect(() => {
    setBounds({
      top: circleRef.current.getBoundingClientRect().top * -1 + 80,
      left: circleRef.current.getBoundingClientRect().left * -1 + 100,
      right:
        windowSize.width -
        circleRef.current.getBoundingClientRect().right -
        100,
      bottom:
        windowSize.height -
        circleRef.current.getBoundingClientRect().bottom -
        100,
    });
  }, [windowSize]);

  //This function renders the content inside the svg circle
  const RenderTime = ({ remainingTime }) => {
    // console.log(remainingTime);
    var audioRef = useRef(null);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    // const minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    let timeLeft;
    if (remainingTime > 3600) {
      timeLeft = `${hours}:${stringifiedMinutes}:${stringifiedSeconds}`;
    } else {
      timeLeft = `${minutes}:${stringifiedSeconds}`;
    }

    if (remainingTime === 0) {
      return (
        <>
          <div className="timer">Done!</div>
          <audio ref={audioRef} src={"../alarm-tone.mp3"} autoPlay />
        </>
      );
    } else {
      return (
        <div className="relative flex items-center justify-center w-full h-full group">
          <div
            className={
              " rounded-full w-full h-full  shadow-xl flex flex-col items-center justify-center scale-90   " +
              bgColor
            }
          >
            {edit ? (
              <div className="flex flex-col items-center gap-2">
                {/* <input
                  type="color"
                  value={ringColor}
                  onChange={(e) => setRingColor(e.target.value)}
                /> */}

                <button
                  className="flex items-center gap-2 px-1 py-0 font-bold text-white transition rounded-lg hover:scale-110 active:scale-90 ring-2 ring-white"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  <FaCheck /> Done
                </button>
              </div>
            ) : (
              <>
                <p
                  className={
                    "font-bold text-2xl text-center max-w-[90%] " +
                    (name.length > 45 ? " text-lg" : " text-2xl ") +
                    textColor
                  }
                >
                  {name}
                </p>
                <div className={"text-lg font-bold " + textColor}>
                  {timeLeft}
                </div>
              </>
            )}
          </div>

          <div
            className={
              "absolute flex flex-col items-center justify-between z-20 rounded-full  group-hover:opacity-100 opacity-0 transition duration-500 w-full h-full p-5 scale-90"
            }
          >
            <button
              className={
                "items-center hidden gap-2 px-1 py-0  font-bold  transition rounded-lg group-hover:flex hover:scale-110 active:scale-90  hover:bg-white/40 text-sm " +
                textColor
              }
              onClick={() => {
                setKey((prevKey) => prevKey + 1);
                setStart(false);
              }}
            >
              <FaUndo /> Reset
            </button>
            <button
              className={
                "items-center hidden gap-2 text-xl font-bold transition group-hover:flex rounded-xl px-3 py-1 hover:scale-110 active:scale-90  hover:bg-white/40 "
              }
              onClick={() => {
                setStart(!start);
              }}
            >
              {" "}
              {start ? (
                <>
                  <p className={textColor}>Stop</p>
                  <FaStop className={textColor} />{" "}
                </>
              ) : (
                <>
                  <p className={textColor}>Start</p>
                  <FaPlay className={textColor} />{" "}
                </>
              )}
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className={"flex items-center justify-center  "}
        ref={circleRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        // initial={{ opacity: 0, scale: 0.1, y: -10 }}
        // animate={{ opacity: 1, scale: 1, y: 0 }}
        // exit={{ opacity: 0, scale: 0.01 }}
        transition={{ duration: 0.5, delay: num * 0.07 }}
        drag
        onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.05}
        dragConstraints={{
          top: bounds.top,
          left: bounds.left,
          right: bounds.right,
          bottom: bounds.bottom,
        }}
      >
        <CountdownCircleTimer
          isPlaying={start}
          key={key}
          duration={time * 60}
          size={180}
          strokeWidth={start ? 16 : 0}
          rotation="counterclockwise"
          colors={ringColor}
          trailColor="transparent"
          onUpdate={(remainingTime) => {
            if (remainingTime % 2 === 0 && remainingTime / 60 !== time) {
              // console.log(remainingTime);
              setRemaining(num, remainingTime);
            }
          }}
          onComplete={() => {
            setStart(false);
            toast.success("Times up!", {
              icon: "⏰",
              position: "top-center",
              duration: 6000,
            });

            if (!localMode) {
              chrome.notifications.create("Complete", {
                type: "basic",
                iconUrl: "icon-128.png",
                title: (name || "Timer") + " is done!",
                message: "Nice work! Keep Going!",
                priority: 2,
              });
            }

            setAsDone(num);
            setTimeout(() => {
              setKey((prevKey) => prevKey + 1);
            }, 6000);
          }}
        >
          {RenderTime}
        </CountdownCircleTimer>
      </motion.div>
    </AnimatePresence>
  );
}

export default Circle;
