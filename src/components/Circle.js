/*global chrome*/

import { useState, useRef, useEffect } from "react";

import {
  FaCheck,
  FaExternalLinkAlt,
  FaPause,
  FaPlay,
  FaUndo,
} from "react-icons/fa";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function Circle({
  num,
  color,
  name,
  time,
  setAsDone,
  setRemaining,
  playing,
  streak,
  remaining,
  done,
  setPlay,
  size,
  src,
}) {
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   "
  );
  const [ringColor, setRingColor] = useState("#0369a1");
  const [textColor, setTextColor] = useState("  text-sky-800");

  const circleRef = useRef(null);

  useEffect(() => {
    switch (color) {
      case "purple":
        setBgColor(
          "bg-gradient-to-br from-purple-50 via-purple-300 to-purple-700 dark:from-purple-400 dark:via-purple-600 dark:to-purple-800  "
        );
        setRingColor("#7e22ce");
        setTextColor("  text-purple-800 dark:!text-purple-200");
        break;
      case "indigo":
        setBgColor(
          "bg-gradient-to-br from-indigo-50 via-indigo-300 to-indigo-700 dark:from-indigo-400 dark:via-indigo-600 dark:to-indigo-800  "
        );
        setRingColor("#4338ca");
        setTextColor("  text-indigo-800 dark:!text-indigo-200");
        break;
      case "sky":
        setBgColor(
          "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700 dark:from-sky-400 dark:via-sky-600 dark:to-sky-800  "
        );
        setRingColor("#0369a1");
        setTextColor("  text-sky-800 dark:!text-sky-200");
        break;
      case "teal":
        setBgColor(
          "bg-gradient-to-br from-teal-50 via-teal-300 to-teal-700 dark:from-teal-400 dark:via-teal-600 dark:to-teal-800   "
        );
        setRingColor("#0f766e");
        setTextColor("  text-teal-800 dark:!text-teal-200");
        break;
      case "green":
        setBgColor(
          "bg-gradient-to-br from-green-50 via-green-300 to-green-700 dark:from-green-400 dark:via-green-600 dark:to-green-800   "
        );
        setRingColor("#15803d");
        setTextColor("  text-green-800 dark:!text-green-200");
        break;
      case "yellow":
        setBgColor(
          "bg-gradient-to-br from-yellow-50 via-yellow-300 to-yellow-700  dark:from-yellow-400 dark:via-yellow-600 dark:to-yellow-800   "
        );
        setRingColor("#f9c822");
        setTextColor("  text-yellow-800 dark:!text-yellow-200");
        break;
      case "orange":
        setBgColor(
          "bg-gradient-to-br from-orange-50 via-orange-300 to-orange-700  dark:from-orange-400 dark:via-orange-600 dark:to-orange-800   "
        );
        setRingColor("#f57f22");
        setTextColor("  text-orange-800 dark:!text-orange-200");
        break;
      case "red":
        setBgColor(
          "bg-gradient-to-br from-red-50 via-red-300 to-red-700 dark:from-red-400 dark:via-red-600 dark:to-red-800   "
        );
        setRingColor("#e53e3e");
        setTextColor("  text-red-800 dark:!text-red-200");
        break;
      case "black":
        setBgColor(
          "bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900   "
        );
        setRingColor("#9ca3af");
        setTextColor("  text-slate-50 dark:!text-slate-200");
        break;
      default:
        setBgColor(
          "bg-gradient-to-br from-sky-50 via-sky-400 to-sky-700  dark:from-sky-400 dark:via-sky-600 dark:to-sky-800   "
        );
        setRingColor("#0369a1");
        setTextColor("  text-sky-800 dark:!text-sky-200");
        break;
    }
  }, [color]);

  useEffect(() => {
    if (done) {
      setMounted(false);
    } else {
      setMounted(true);
    }
  }, [done]);

  const RenderTime = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    let timeLeft;
    if (remainingTime >= 3600) {
      timeLeft = `${hours}:${stringifiedMinutes}:${stringifiedSeconds}`;
    } else {
      timeLeft = `${minutes}:${stringifiedSeconds}`;
    }
    return (
      <div className="relative flex items-center justify-center w-full h-full p-2 group">
        <div
          className={
            " rounded-full w-full h-full shadow-xl flex flex-col items-center justify-center " +
            bgColor
          }
        >
          <div className="flex flex-col items-center pt-2 group-hover:hidden fade-effect-fast">
            <p
              className={
                "font-bold f2  drop-shadow-md text-center max-w-[90%] " +
                textColor +
                (name.length > 45 ? " text-lg" : " text-3xl")
              }
            >
              {name}
            </p>
            <div className={"text-lg font-extrabold f1 " + textColor}>
              {timeLeft}
            </div>
          </div>
        </div>
        <div
          className={
            "absolute flex flex-col items-center justify-between z-20 rounded-full opacity-0  transition duration-500 w-full h-full p-5    " +
            (done ? " " : " group-hover:opacity-100")
          }
        >
          <div className="flex gap-2">
            <button
              className={
                "items-center hidden gap-2 h-8 w-8 justify-center font-bold  transition rounded-lg group-hover:flex hover:scale-110 active:scale-90 cursor-pointer  hover:bg-white/40 dark:hover:bg-slate-800/40  text-base f1 " +
                textColor
              }
              onClick={() => {
                setKey((prevKey) => prevKey + 1);
                setRemaining(num, time * 60);
                setPlay(num, false);
              }}
            >
              <FaUndo />
            </button>

            <button
              className={
                "items-center hidden gap-1  h-8 w-8 justify-center font-bold transition group-hover:flex rounded-xl cursor-pointer   hover:scale-110 active:scale-90 text-base hover:bg-white/40 dark:hover:bg-slate-800/40  " +
                textColor
              }
              onClick={() => {
                setPlay(num, false);
                setAsDone(num, true);
              }}
            >
              <FaCheck className="text-xl" />
            </button>
          </div>

          <button
            className={
              "items-center justify-center hidden gap-2 text-5xl font-bold transition group-hover:flex cursor-pointer  rounded-xl hover:scale-110 active:scale-90  mt-1 hover:brightness-150 dark:hover:brightness-90 f2  "
            }
            onClick={() => {
              if (playing) {
                setPlay(num, false);
              } else {
                setPlay(num, true);
              }
            }}
          >
            {" "}
            {playing ? (
              <>
                <FaPause className={textColor} />{" "}
              </>
            ) : (
              <>
                <FaPlay className={textColor + " ml-3 "} />{" "}
              </>
            )}
          </button>

          <div
            className={
              "flex gap-2 h-8 w-8  " + (src ? " opacity-100" : " opacity-0 ")
            }
          >
            {src ? (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "items-center hidden  h-8 w-8 justify-center font-bold  transition rounded-lg group-hover:flex hover:scale-110 active:scale-90  hover:bg-white/40 dark:hover:bg-slate-800/40  text-base f1 " +
                  textColor
                }
              >
                <FaExternalLinkAlt />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  };
  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className={"flex items-center cursor-move justify-center  handle  "}
          ref={circleRef}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.6,
              ease: [0, 0.71, 0.2, 1.01],
            },
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 40,
              restDelta: 0.001,
            },
          }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.3, delay: 0 },
          }}
          whileTap={{
            scale: 0.95,
            rotate: 5,
            transition: { duration: 0.5, delay: 0 },
          }}
        >
          <CountdownCircleTimer
            isPlaying={playing}
            key={key}
            initialRemainingTime={remaining}
            duration={time * 60}
            size={180}
            strokeWidth={playing ? 10 : 0}
            rotation="counterclockwise"
            colors={ringColor}
            trailColor="transparent"
            onUpdate={(remainingTime) => {
              if (remainingTime % 2 === 0 && remainingTime / 60 !== time) {
                setRemaining(num, remainingTime);
              }
            }}
            onComplete={() => {
              if (!done) {
                setPlay(num, false);
                setAsDone(num, true);
              }
              setTimeout(() => {
                setKey((prevKey) => prevKey + 1);
              }, 6000);
            }}
          >
            {RenderTime}
          </CountdownCircleTimer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Circle;
