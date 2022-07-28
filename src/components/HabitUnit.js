/*global chrome*/

import Circle from "./Circle";
// import TimerMenu from "@/components/devlab/TimerMenu";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { FaTrashAlt } from "react-icons/fa";

import { colorOptions } from "../lib/colorOptions";

import { useKeyPress } from "../lib/useKeyPress";

function HabitUnit({
  habit,
  pointer,
  setAllHabits,
  allHabits,
  setUpdate,
  update,
  soundOn,
}) {
  //TODO unmounting of this component messes up formating of the min/h and time
  const [colorOpen, setColorOpen] = useState(false);
  const [text, setText] = useState(habit.name);
  let beep = new Audio("assets/click.mp3");
  beep.volume = 0.4;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 0.4;
  let defaultTime = habit.time > 60 ? habit.time / 60 : habit.time;
  const [timeAmount, setTimeAmount] = useState(habit.time);
  let defaultUnit = habit.time > 60 ? "h" : "min";

  const [unit, setUnit] = useState(defaultUnit);
  const [color, setColor] = useState(habit.color);
  let defaultSize =
    habit.size === "scale-75" ? "sm" : habit.size === "scale-100" ? "md" : "lg";
  const [sizeLabel, setSizeLabel] = useState(defaultSize);
  const [minOrH, setMinOrH] = useState(true);
  const [displayColor, setDisplayColor] = useState(`bg-sky-500`);
  let array = allHabits;
  const enter = useKeyPress("Enter");

  useEffect(() => {
    if (enter && array[pointer].name !== text) {
      array[pointer].name = text;
      setAllHabits(array);
      setUpdate(!update);
      document.activeElement.blur();
    } else if (enter && array[pointer].time === timeAmount) {
      array[pointer].time = timeAmount;
      setAllHabits(array);
      setUpdate(!update);
      document.activeElement.blur();
    }
  }, [enter]);

  //   console.log(pointer);
  useEffect(() => {
    switch (color) {
      case "purple":
        setDisplayColor(
          "bg-gradient-to-br from-purple-50 via-purple-300 to-purple-700  "
        );
        break;
      case "indigo":
        setDisplayColor(
          "bg-gradient-to-br from-indigo-50 via-indigo-300 to-indigo-700   "
        );
        break;
      case "sky":
        setDisplayColor(
          "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   "
        );
        break;
      case "teal":
        setDisplayColor(
          "bg-gradient-to-br from-teal-50 via-teal-300 to-teal-700   "
        );
        break;
      case "green":
        setDisplayColor(
          "bg-gradient-to-br from-green-50 via-green-300 to-green-700   "
        );
        break;
      case "yellow":
        setDisplayColor(
          "bg-gradient-to-br from-yellow-50 via-yellow-300 to-yellow-700   "
        );
        break;
      case "orange":
        setDisplayColor(
          "bg-gradient-to-br from-orange-50 via-orange-300 to-orange-700   "
        );
        break;
      case "red":
        setDisplayColor(
          "bg-gradient-to-br from-red-50 via-red-300 to-red-700   "
        );
        break;
      case "black":
        setDisplayColor(
          "bg-gradient-to-br from-slate-300 via-slate-600 to-slate-900   "
        );
        break;
      default:
        setDisplayColor(
          "bg-gradient-to-br from-sky-50 via-sky-400 to-sky-700   "
        );
        break;
    }
  }, [color]);

  return (
    <div
      className={
        "flex  items-center justify-center w-full h-full fade-effect-quick relative  " +
        (pointer > 0 ? "border-t-2 border-slate-400/40 " : "")
      }
    >
      <div className="flex gap-2 items-center m-2 w-1/3">
        <p className="text-l font-bold text-sky-700">{pointer + 1 + ". "}</p>
        <input
          type="text"
          value={text}
          className="min-w-[1em] !w-2/3 !px-2 text-sm !py-1  text-center textarea-tw"
          placeholder="Name"
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            array[pointer].name = text;
            setAllHabits(array);
            setUpdate(!update);
          }}
        />
      </div>
      <div className="flex gap-2 items-center m-2 w-1/3">
        <div className="flex justify-center gap-1 items-center">
          <input
            type="number"
            value={timeAmount}
            placeholder="10"
            onChange={(e) => {
              if (e.target.value > 0) {
                setTimeAmount(e.target.value);
                let formattedTime = minOrH
                  ? e.target.value
                  : e.target.value * 60;
                array[pointer].time = formattedTime;
                setAllHabits(array);
                setUpdate(!update);
              } else {
                toast.error("Time must be greater than 0");
              }
            }}
            className="min-w-[1em] !w-1/3 !px-2 text-sm !py-1  text-center textarea-tw"
          />
          <button
            className=" h-fit items-center justify-center p-0  transition rounded-md drop-shadow-xl md:hover:scale-105 ring-1 ring-sky-700 md:active:scale-95 min-w-[32px] text-sky-800 bg-gradient-to-br from-white to-sky-200"
            onClick={() => {
              if (minOrH) {
                if (soundOn) {
                  beep.play();
                }
                let formattedTime = timeAmount;
                array[pointer].time = formattedTime;
                setAllHabits(array);
                setMinOrH(!minOrH);
              } else {
                if (soundOn) {
                  boop.play();
                }

                let formattedTime = timeAmount * 60;
                array[pointer].time = formattedTime;
                setAllHabits(array);
                setMinOrH(!minOrH);
              }
              setUpdate(!update);
            }}
          >
            {minOrH ? "min" : "h"}
          </button>
        </div>
      </div>
      <div className="flex w-1/3 justify-between">
        <button
          className={
            "font-bold rounded-full p-1 transition  bg-gradient-to-b from-sky-50 to-sky-200 shadow-xl md:hover:scale-105 active:scale-95 ring-2 text-sky-800  " +
            (habit.size === "scale-75"
              ? " text-xs "
              : habit.size === "scale-100"
              ? " text-sm  "
              : " text-base px-2 ")
          }
          onClick={() => {
            if (soundOn) {
              habit.size === "scale-150" ? boop.play() : beep.play();
            }
            let nextSize =
              habit.size === "scale-75"
                ? "scale-100"
                : habit.size === "scale-100"
                ? "scale-150"
                : "scale-75";
            let label =
              habit.size === "scale-75"
                ? "md"
                : habit.size === "scale-100"
                ? "lg"
                : "sm";
            console.log(nextSize);
            setSizeLabel(label);
            array[pointer].size = nextSize;
            setAllHabits(array);
            setUpdate(!update);
          }}
        >
          {sizeLabel[0].toUpperCase() + sizeLabel.substring(1)}
        </button>
        {/* <p className="text-2xl font-bold">{habit.color}</p> */}
        <div className="flex items-center justify-center gap-2">
          <button
            className={
              "w-6 h-6 rounded-md ring-1 ring-black hover:scale-110 mr-5  " +
              displayColor
            }
            onClick={() => {
              if (soundOn) {
                beep.play();
              }
              setColorOpen(!colorOpen);
            }}
          ></button>
        </div>
        {colorOpen && (
          <div className="absolute flex items-center h-10 gap-2 px-2 bg-white rounded-lg shadow-lg w-fit -right-[82px] z-50  bottom-0">
            {colorOptions.map((option, index) => {
              return (
                <button
                  key={index}
                  className={
                    "w-7 h-7 rounded-full transition  ring-1 ring-black hover:scale-110  " +
                    option.circleCol
                  }
                  onClick={() => {
                    if (soundOn) {
                      boop.play();
                    }
                    setColor(option.colorText);
                    array[pointer].color = option.colorText;
                    setAllHabits(array);
                    setUpdate(!update);
                    setColorOpen(false);
                  }}
                ></button>
              );
            })}
          </div>
        )}
        <button
          onClick={() => {
            //   console.log(pointer);
            if (soundOn) {
              boop.play();
            }
            if (pointer > 0) {
              array.splice(pointer, 1);
              setAllHabits(array);
              setUpdate(!update);
            }
            // setAllHabits(
            //     allHabits.filter((habit) => habit.num !== index)
            // )
          }}
        >
          <FaTrashAlt
            className={
              "text-red-300/60   " +
              (pointer > 0 ? " opacity-100" : " opacity-0 cursor-default")
            }
          />
        </button>
      </div>
    </div>
  );
}

export default HabitUnit;
