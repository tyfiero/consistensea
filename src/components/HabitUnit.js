import { useEffect, useState } from "react";
import { FaRegTimesCircle, FaTrashAlt } from "react-icons/fa";
import { colorOptions } from "../lib/colorOptions";
import { useKeyPress } from "../lib/useKeyPress";

function HabitUnit({
  habit,
  pointer,
  setAllHabits,
  allHabits,
  setUpdate,
  update,
  index,
  soundOn,
}) {
  //TODO unmounting of this component messes up formatting of the min/h and time

  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [text, setText] = useState(habit.name);
  const [src, setSrc] = useState(habit.src);
  const [color, setColor] = useState(habit.color);
  const [sizeAmount, setSizeAmount] = useState(habit.size);
  const [displayColor, setDisplayColor] = useState(`bg-sky-500`);
  let defaultTime = habit.unit === "min" ? habit.time : habit.time / 60;
  const [timeAmount, setTimeAmount] = useState(defaultTime);
  let beep = new Audio("assets/click.mp3");
  beep.volume = 1;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 1;

  let array = allHabits;
  const enter = useKeyPress("Enter");
  function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
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
        "flex  items-center justify-center w-full h-full fade-effect-quick relative gap-3 " +
        (pointer > 0 ? "border-t-2 border-slate-400/40 " : "")
      }
    >
      <div
        className={
          "relative flex items-center w-1/3   m-2 " +
          (pointer > 8 ? "gap-1" : "gap-4")
        }
      >
        <p className="font-bold f1 text-l text-sky-700">{pointer + 1 + ". "}</p>
        <p
          className={
            "absolute flex text-xs text-center -top-5 left-24 font-bold text-sky-400  f1 " +
            (index === 0 ? " " : " !hidden")
          }
        >
          Name
        </p>
        <input
          type="text"
          value={text}
          className={
            "min-w-[1em] !px-2 text-sm !py-1 font-bold text-center textarea-tw f2 placeholder:!text-slate-800/20 dark:placeholder:!text-slate-100/20 " +
            habit.color
          }
          placeholder="Name"
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            array[pointer].name = text;
            setAllHabits(array);
            setUpdate(!update);
          }}
        />
      </div>
      <div className="relative group">
        <div className="hidden group-hover:flex bg-"></div>
        <p
          className={
            "absolute flex text-xs text-center -top-5 left-10  f1 font-bold text-sky-400 " +
            (index === 0 ? " " : " !hidden")
          }
        >
          Link
        </p>
        {src && (
          <div className="absolute z-20 items-center hidden max-w-md gap-2 px-2 py-1 bg-white rounded-lg shadow-lg w-fit group-hover:flex h-fit dark:bg-slate-900 dark:ring-2 dark:ring-slate-400 top-8 fade-effect-quick ">
            <p className="text-xs break-words whitespace-pre-wrap f1">{src}</p>
          </div>
        )}
        <input
          type="text"
          value={src}
          className="min-w-[1em] z-50 w-28 !px-2 text-sm !py-1  text-center textarea-tw f1 placeholder:!text-slate-800/20 dark:placeholder:!text-slate-100/20"
          placeholder="url"
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => setSrc(e.target.value)}
          onBlur={() => {
            array[pointer].src = src;
            setAllHabits(array);
            setUpdate(!update);
          }}
        />
        {src && (
          <button
            className="absolute text-sky-600 dark:text-sky-200 top-[6px] right-1 dark:bg-black bg-white rounded-full hover:scale-110 active:scale-90 "
            onClick={() => {
              if (soundOn) {
                boop.play();
              }
              setSrc("");
              array[pointer].src = "";
              setAllHabits(array);
              setUpdate(!update);
            }}
          >
            <FaRegTimesCircle />
          </button>
        )}
      </div>
      <div className="flex items-center w-1/3 gap-2 m-2">
        <div className="flex items-center justify-center gap-1 w-fit">
          <div className="flex items-center justify-between gap-1 !w-24 relative">
            <p
              className={
                "absolute flex text-xs text-center -top-5 left-4 font-bold text-sky-400 f1 " +
                (index === 0 ? " " : " !hidden")
              }
            >
              Time
            </p>
            <input
              type="number"
              value={timeAmount}
              placeholder="Time"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  let formattedTime =
                    habit.unit === "min" ? e.target.value : e.target.value * 60;
                  setTimeAmount(e.target.value);
                  array[pointer].time = formattedTime;
                  array[pointer].remaining = formattedTime * 60;
                  setAllHabits(array);
                  setUpdate(!update);
                }
              }}
              className="min-w-[5em] f1  !w-1/3 !px-2 text-sm !py-1  text-center textarea-tw"
            />
            <p
              className={
                "absolute flex text-xs text-center -top-5 -right-3 font-bold text-sky-400  f1" +
                (index === 0 ? " " : " !hidden")
              }
            >
              Unit
            </p>
            <button
              className=" h-fit items-center justify-center p-0 px-1  transition rounded-md drop-shadow-xl md:hover:scale-105 ring-2 ring-sky-400 md:active:scale-95 min-w-[32px] dark:from-sky-500 dark:to-sky-800  text-sky-800 bg-gradient-to-br from-white to-sky-200 dark:ring-sky-300 dark:text-sky-200 f1"
              onClick={() => {
                if (habit.unit === "min") {
                  if (soundOn) {
                    beep.play();
                  }
                  let formattedTime = timeAmount * 60;
                  array[pointer].time = formattedTime;
                  array[pointer].remaining = formattedTime * 60;
                  array[pointer].unit = "hr";
                  setAllHabits(array);
                } else {
                  if (soundOn) {
                    boop.play();
                  }
                  array[pointer].time = timeAmount;
                  array[pointer].remaining = timeAmount * 60;
                  array[pointer].unit = "min";
                  setAllHabits(array);
                }
                setUpdate(!update);
              }}
            >
              {habit.unit}
            </button>
          </div>
        </div>
      </div>
      <div className="relative flex justify-between w-1/3 gap-8">
        <p
          className={
            "absolute flex text-xs text-center -top-4 left-7 font-bold text-sky-400  f1" +
            (index === 0 ? " " : " !hidden")
          }
        >
          Size
        </p>
        <div className="flex items-center justify-center w-10 ml-6 h-9">
          <button
            className={
              "font-bold rounded-full p-1 transition flex justify-center  bg-gradient-to-b from-sky-50 to-sky-200 dark:from-sky-500 dark:to-sky-800 shadow-xl md:hover:scale-105 active:scale-95 ring-2 ring-sky-400 text-sky-800  dark:text-sky-200 dark:ring-sky-300 f1 px-2 "
            }
            onClick={() => {
              if (soundOn) {
                beep.play();
              }
              setSizeOpen(!sizeOpen);
            }}
          >
            <p
              style={{
                fontSize: `${scale(sizeAmount, 0.5, 2, 10, 15)}px`,
              }}
            >
              {Math.floor(scale(Number(sizeAmount), 0.5, 2, 1, 10))}
            </p>
          </button>
          {sizeOpen && (
            <div className="absolute bottom-0 z-50 flex items-center h-8 gap-2 px-2 bg-white rounded-lg shadow-lg dark:bg-slate-900 dark:ring-2 dark:ring-slate-400 w-fit left-[64px] fade-effect-fast ">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={sizeAmount}
                onChange={(e) => {
                  setSizeAmount(e.target.valueAsNumber);
                  array[pointer].size = e.target.valueAsNumber;
                  setAllHabits(array);
                  setUpdate(!update);
                }}
                onMouseUp={() => {
                  if (soundOn) {
                    boop.play();
                  }
                  setSizeOpen(!sizeOpen);
                }}
                className="bg-white w-28 dark:bg-slate-900"
              />
            </div>
          )}
        </div>
        <div className="relative flex items-center justify-center gap-2">
          <p
            className={
              "absolute flex text-xs text-center -top-4 -left-2 font-bold text-sky-400  f1" +
              (index === 0 ? " " : " !hidden")
            }
          >
            Color
          </p>
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
          <div className="absolute bottom-0 z-50 flex items-center h-10 gap-2 px-2 bg-white rounded-lg shadow-lg dark:bg-slate-900 dark:ring-2 dark:ring-slate-400 w-fit -right-1 ">
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
            if (soundOn) {
              boop.play();
            }
            if (pointer > 0) {
              array.splice(pointer, 1);
              setAllHabits(array);
              setUpdate(!update);
            }
          }}
        >
          <FaTrashAlt
            className={
              "text-red-400/60 text-lg hover:scale-125 transition active:scale-75  " +
              (pointer > 0 ? " opacity-100" : " opacity-0 cursor-default")
            }
          />
        </button>
      </div>
    </div>
  );
}

export default HabitUnit;
