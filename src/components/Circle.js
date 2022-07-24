/*global chrome*/

import { useState, useRef, useEffect } from "react";

import { FaCheck, FaEdit, FaPlay, FaStop } from "react-icons/fa";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useWindowSize } from "../lib/useWindowSize";
function Circle({ size, num }) {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(10);
  const [key, setKey] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Timer 1");
  const [color, setColor] = useState(
    "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   "
  );
  const [ringColor, setRingColor] = useState("#0369a1");
  const [textColor, setTextColor] = useState("  text-sky-800");
  const [minOrH, setMinOrH] = useState(true);
  const [colorOpen, setColorOpen] = useState(false);
  const [bounds, setBounds] = useState({
    top: 100,
    left: 100,
    right: 100,
    bottom: 100,
  });
  const windowSize = useWindowSize();
  const circleRef = useRef(null);

  // console.log(windowSize);

  useEffect(() => {
    setBounds({
      // top: windowSize.height / -2 + 100,
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

  const colorOptions = [
    {
      circleCol:
        "bg-gradient-to-br from-purple-50 via-purple-300 to-purple-700  ",
      textCol: "text-purple-800",
      ringCol: "#7e22ce",
    },
    {
      circleCol:
        "bg-gradient-to-br from-indigo-50 via-indigo-300 to-indigo-700   ",
      textCol: "text-indigo-800",
      ringCol: "#4338ca",
    },
    {
      circleCol: "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   ",
      textCol: "text-sky-800",
      ringCol: "#0369a1",
    },
    {
      circleCol: "bg-gradient-to-br from-teal-50 via-teal-300 to-teal-700   ",
      textCol: "text-teal-800",
      ringCol: "#0f766e",
    },
    {
      circleCol:
        "bg-gradient-to-br from-green-50 via-green-300 to-green-700   ",
      textCol: "text-green-800",
      ringCol: "#15803d",
    },
    {
      circleCol:
        "bg-gradient-to-br from-yellow-50 via-yellow-300 to-yellow-500   ",
      textCol: "text-yellow-800",
      ringCol: "#eab308",
    },
    {
      circleCol:
        "bg-gradient-to-br from-orange-50 via-orange-300 to-orange-700   ",
      textCol: "text-orange-800",
      ringCol: "#f97316",
    },
    {
      circleCol: "bg-gradient-to-br from-red-100 via-red-400 to-red-800   ",
      textCol: "text-red-900",
      ringCol: "#b91c1c",
    },
    {
      circleCol:
        "bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900   ",
      textCol: "text-slate-50",
      ringCol: "#9ca3af",
    },
  ];

  const RenderTime = ({ remainingTime }) => {
    var audioRef = useRef(null);

    const minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    let timeLeft = `${minutes}:${stringifiedSeconds}`;

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
              color
            }
          >
            {edit ? (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  value={name}
                  className="min-w-[1em] !w-2/3 !px-2 text-sm !py-1  text-center textarea-tw"
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <input
                  type="color"
                  value={ringColor}
                  onChange={(e) => setRingColor(e.target.value)}
                /> */}
                <div className="flex justify-center gap-2">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => {
                      if (e.target.value > 0) {
                        setTime(e.target.value);
                      } else {
                        toast.error("Time must be greater than 0");
                      }
                    }}
                    className="min-w-[1em] !w-1/3 !px-2 text-sm !py-1  text-center textarea-tw"
                  />
                  <button
                    className="items-center justify-center p-0 text-white transition rounded-md drop-shadow-xl md:hover:scale-105 ring-1 ring-white md:active:scale-95 min-w-[32px]"
                    onClick={() => {
                      setMinOrH(!minOrH);
                    }}
                  >
                    {minOrH ? "min" : "h"}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-white">Color:</p>
                  <button
                    className={
                      "w-5 h-5 rounded-md ring-1 ring-black hover:scale-110  " +
                      color
                    }
                    onClick={() => {
                      setColorOpen(!colorOpen);
                    }}
                  ></button>
                </div>
                {colorOpen && (
                  <div className="absolute flex items-center h-10 gap-2 px-2 bg-white rounded-lg shadow-lg w-64 top-32">
                    {colorOptions.map((option, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            "w-7 h-7 rounded-full ring-1 ring-black hover:scale-110  " +
                            option.circleCol
                          }
                          onClick={() => {
                            setColor(option.circleCol);
                            setTextColor(option.textCol);
                            setRingColor(option.ringCol);
                            setColorOpen(false);
                          }}
                        ></button>
                      );
                    })}
                  </div>
                )}
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
                <p className={"font-bold text-2xl " + textColor}>{name}</p>
                <div className={"text-lg font-bold " + textColor}>
                  {timeLeft}
                </div>
              </>
            )}
          </div>
          {!edit && (
            <div
              className={
                "absolute flex flex-col items-center justify-start z-20 rounded-full bg-gradient-to-br from-slate-600/80 to-slate-800/90 group-hover:opacity-100 opacity-0 transition duration-500 w-full h-full p-5 scale-90"
              }
            >
              <button
                className="items-center hidden gap-2 px-3 py-1 mb-6 font-bold text-white transition rounded-lg group-hover:flex hover:scale-110 active:scale-90 hover:ring-2 ring-white"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                <FaEdit /> Edit
              </button>
              <button
                className={
                  "items-center hidden gap-2 text-xl font-bold transition group-hover:flex rounded-xl px-3 py-1 hover:scale-110 active:scale-90 hover:ring-2 " +
                  (start ? "ring-pink-300" : "ring-sky-300")
                }
                onClick={() => {
                  setStart(!start);
                }}
              >
                {" "}
                {start ? (
                  <>
                    <FaStop className="text-pink-300" />{" "}
                    <p className="text-pink-300">Stop</p>
                  </>
                ) : (
                  <>
                    <FaPlay className="text-sky-300" />{" "}
                    <p className="text-sky-300">Start</p>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className={"flex items-center justify-center " + size}
        ref={circleRef}
        initial={{ opacity: 0, scale: 0.1, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.01 }}
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
          onComplete={() => {
            setStart(false);
            toast.success("Times up!", {
              icon: "⏰",
              position: "top-center",
              duration: 6000,
            });

            chrome.notifications.create("Complete", {
              type: "basic",
              iconUrl: "icon-128.png",
              title: (name || "Timer") + " is done!",
              message: "Nice work! Way to stay consistent.",
              priority: 2,
            });
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

// <div
// className={
//   "z-10    !border-0 cursor-pointer fade-effect-quick " +
//   (start ? " opacity-100 " : " opacity-50 ") +
//   size
// }
// >

// </div>

// <CountdownCircleTimer
// isPlaying={start}
// key={key}
// duration={time * 60}
// size={180}
// strokeWidth={16}
// updateInterval={0.01}
// rotation="counterclockwise"
// colors={ringColors}
// trailColor="transparent"
// // colorsTime={[12, 0]}
// >
// {" "}
// {RenderTime}
// </CountdownCircleTimer>
