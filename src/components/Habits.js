/*global chrome*/

import Circle from "./Circle";
// import TimerMenu from "@/components/devlab/TimerMenu";
import { createRef, useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { localMode } from "../lib/constants";
import toast from "react-hot-toast";
import { Fireworks } from "@fireworks-js/react";
import {
  FaCheckCircle,
  FaCog,
  FaPlus,
  FaRegCheckCircle,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useClickOutside } from "../lib/useClickOutside";
import { useLocalStorage } from "../lib/useLocalStorage";
const colorOptions = [
  {
    colorText: "purple",
    circleCol:
      "bg-gradient-to-br from-purple-50 via-purple-300 to-purple-700  ",
    textCol: "text-purple-800",
    ringCol: "#7e22ce",
  },
  {
    colorText: "indigo",
    circleCol:
      "bg-gradient-to-br from-indigo-50 via-indigo-300 to-indigo-700   ",
    textCol: "text-indigo-800",
    ringCol: "#4338ca",
  },
  {
    colorText: "blue",
    circleCol: "bg-gradient-to-br from-sky-50 via-sky-300 to-sky-700   ",
    textCol: "text-sky-800",
    ringCol: "#0369a1",
  },
  {
    colorText: "teal",
    circleCol: "bg-gradient-to-br from-teal-50 via-teal-300 to-teal-700   ",
    textCol: "text-teal-800",
    ringCol: "#0f766e",
  },
  {
    colorText: "green",
    circleCol: "bg-gradient-to-br from-green-50 via-green-300 to-green-700   ",
    textCol: "text-green-800",
    ringCol: "#15803d",
  },
  {
    colorText: "yellow",
    circleCol:
      "bg-gradient-to-br from-yellow-50 via-yellow-300 to-yellow-500   ",
    textCol: "text-yellow-800",
    ringCol: "#eab308",
  },
  {
    colorText: "orange",
    circleCol:
      "bg-gradient-to-br from-orange-50 via-orange-300 to-orange-700   ",
    textCol: "text-orange-800",
    ringCol: "#f97316",
  },
  {
    colorText: "red",
    circleCol: "bg-gradient-to-br from-red-100 via-red-400 to-red-800   ",
    textCol: "text-red-900",
    ringCol: "#b91c1c",
  },
  {
    colorText: "black",
    circleCol:
      " bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900   ",
    textCol: "text-slate-50",
    ringCol: "#9ca3af",
  },
];
function Habits() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState("You did it! Way to be consistent!  ");
  const [soundOn, setSoundOn] = useState(true);

  const [partyTime, setPartyTime] = useState(false);

  const [allHabits, setAllHabits] = useLocalStorage("CSHabits", [
    {
      name: "Twitter",
      time: 0.1,
      remaining: 0.1,
      unit: "min",
      num: 0,
      color: "blue",
      size: "scale-100",
      done: false,
      playing: false,
    },
  ]);
  const incomplete = allHabits.filter((item) => item.done === false);
  const done = allHabits.filter((item) => item.done === true);

  //   console.log(allHabits);
  //   const setAsDone = useCallback(
  //     (id) => {
  //       console.log(allHabits);
  //       let array = allHabits;
  //       console.log(array[id]);

  //       array[id].done = true;
  //       console.log(array[id]);
  //       //   array.push(allHabits[id]);
  //       setAllHabits(array);
  //       console.log(allHabits);

  //       //   let array2 = allHabits;
  //       //   array2.splice(id, 1);
  //       //   setAllHabits(array2);

  //       setUpdate(!update);
  //     },
  //     [allHabits, update]
  //   );

  const setAsDone = (id) => {
    console.log(id + " id");
    // console.log(allHabits);
    let array = allHabits;
    console.log(array[id]);

    array[id].done = true;
    // console.log(array[id]);
    //   array.push(allHabits[id]);
    setAllHabits(array);
    // console.log(allHabits);

    //   let array2 = allHabits;
    //   array2.splice(id, 1);
    //   setAllHabits(array2);

    setUpdate(!update);
  };
  console.log(allHabits);
  const setRemaining = (id, remaining) => {
    console.log(id);
    console.log("did sumfin");
    let array = allHabits;
    if (remaining === 0) {
      array[id].playing = false;
    } else if (array[id].playing === false) {
      array[id].playing = true;
    }
    array[id].remaining = remaining;
    setAllHabits(array);
  };
  const menuRef = createRef();

  const onClickOutside = (e) => {
    if (e.target.id !== "cog") {
      setSettingsOpen(false);
    }
    console.log(allHabits);
  };

  useClickOutside(menuRef, onClickOutside);

  useEffect(() => {}, []);
  useEffect(() => {
    // console.log(incomplete.length + "incomplete  " + done.length + "done");
    if (incomplete.length === 0 && done.length > 0) {
      setPartyTime(true);
      setTimeout(() => {
        setPartyTime(false);
      }, 9000);
    }
  }, [update, allHabits]);
  // // get notes if they're there
  // useEffect(() => {
  //   if (!localMode) {
  //     chrome.storage.local.get(url, (items) => {
  //       items[url] && setNotes(items[url]);
  //     });
  //   }
  // }, []);

  return (
    <div className="w-full h-screen page-container overflow-hidden ">
      <div className="flex">{/* <TimerMenu /> */}</div>

      <AnimatePresence>
        {partyTime ? (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-50"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1200 }}
            transition={{ duration: 4.5 }}
          >
            <Fireworks
              options={{
                opacity: 0.2,
                intensity: 30,
                acceleration: 1.0,
                traceSpeed: 7,
                gravity: 3,
                flickering: 0.01,
                decay: {
                  min: 0.001,
                  max: 0.01,
                },
                delay: {
                  min: 50,
                  max: 75,
                },
              }}
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "fixed",
              }}
            />
            <div className="flex items-center justify-center w-full h-full">
              {" "}
              <p className="text-6xl !leading-none logo h-fit">{message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div className="flex flex-wrap items-center justify-center w-full h-full gap-3 ">
        {allHabits.map((habit, index) => {
          console.log(index);

          if (!habit.done) {
            return (
              <div className={habit.size} key={index}>
                <Circle
                  key={index}
                  color={habit.color}
                  name={habit.name}
                  setAsDone={setAsDone}
                  setRemaining={setRemaining}
                  playing={habit.playing}
                  time={habit.time}
                  num={index}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </motion.div>

      <motion.div className="fixed  top-0 right-0 rounded-bl-2xl flex flex-wrap items-start flex-col justify-center bg-gradient-to-b from-sky-50 via-sky-300   gap-3 p-5 max-w-[10em] ">
        <p>Completed</p>
        {allHabits.map((habit, index) => {
          if (habit.done) {
            return (
              <div
                key={index}
                className={"flex gap-2 items-center fade-effect"}
                color={habit.color}
                name={habit.name}
                time={habit.time}
                num={index}
              >
                <FaCheckCircle className={habit.color + " shrink-0"} />
                <p
                  className={
                    "underline decoration-4  decoration-white " + habit.color
                  }
                >
                  {habit.name}
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
        {incomplete.length === 0 && done.length > 0 ? (
          <p>All done!! 😀</p>
        ) : null}
      </motion.div>
      <div
        className="absolute top-3  left-3 cursor-pointer hover:scale-125 transition"
        onClick={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        <FaCog id={"cog"} className="text-white/80 scale-150" />
      </div>

      {settingsOpen && (
        <div
          ref={menuRef}
          className="absolute top-10 select-none left-20 bg-white/80 rounded-lg  transition w-1/2 px-5 py-2 fade-effect-fast shadow-xl z-50"
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

            <button
              className="absolute top-3 right-3 text-2xl text-sky-600 hover:scale-110 "
              onClick={() => {
                setSettingsOpen(false);
              }}
            >
              <FaTimes />
            </button>
            <p className="text-2xl font-bold text-sky-700">Settings</p>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <button
                onClick={() => {
                  if (!localMode) {
                    chrome.notifications.create("NOTFICATION_ID", {
                      type: "basic",
                      iconUrl: "/icon128.png",
                      title: "Hello?",
                      message: "test message",
                      priority: 2,
                    });
                  } else {
                    console.log("in local mode");
                  }
                }}
              >
                Notification!
              </button>
              <button
                onClick={() => {
                  setPartyTime(!partyTime);
                }}
              >
                Fireworks?
              </button>

              <div className="flex flex-col items-center w-2/3 my-3">
                <p>Finish Message:</p>
                <input
                  type="text"
                  value={message}
                  className=" w-full !px-2 text-lg !py-1  text-center textarea-tw"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center  ring-2 rounded-lg p-3 bg-white/80 shadow-lg ">
                <div className="flex  items-center w-full justify-between  ">
                  <p className="text-xs  w-1/3 text-slate-800/40 ml-16">Name</p>
                  <div className="flex gap-6 w-fit ">
                    <p className="text-xs text-slate-800/40">Time</p>
                    <p className="text-xs text-slate-800/40">Unit</p>
                  </div>
                  <div className="flex w-1/3 ml-11 justify-between">
                    <p className="ml-2 text-xs text-slate-800/40">Size</p>
                    <p className="text-xs text-slate-800/40">Color</p>
                    <p className="text-xs text-slate-800/40">Delete</p>
                  </div>
                </div>
                {allHabits.map((habit, index) => {
                  return (
                    <HabitUnit
                      key={index}
                      habit={habit}
                      pointer={index}
                      setAllHabits={setAllHabits}
                      setUpdate={setUpdate}
                      update={update}
                      allHabits={allHabits}
                    />
                  );
                })}
                <button
                  className="w-5/6  mt-4 h-8 rounded-lg  shadow-xl flex gap-2 text-sky-100 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 font-bold items-center justify-center hover:scale-110 active:scale-95 transition duration-500"
                  onClick={() => {
                    setAllHabits([
                      ...allHabits,
                      {
                        name: "New Habit",
                        time: 0.1,
                        remaining: 0.1,
                        playing: false,
                        unit: "min",
                        color: "blue",
                        size: "scale-100",
                        done: false,
                        num: allHabits.length,
                      },
                    ]);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {" "}
                    <p className="text-sky-50">Add</p> <FaPlus />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HabitUnit({
  habit,
  pointer,
  setAllHabits,
  allHabits,
  setUpdate,
  update,
}) {
  //TODO unmounting of this component messes up formating of the min/h and time
  const [colorOpen, setColorOpen] = useState(false);
  const [text, setText] = useState(habit.name);

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
      case "pink":
        setDisplayColor(
          "bg-gradient-to-br from-pink-50 via-pink-300 to-pink-700   "
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
            onBlur={() => {}}
            className="min-w-[1em] !w-1/3 !px-2 text-sm !py-1  text-center textarea-tw"
          />
          <button
            className=" h-fit items-center justify-center p-0  transition rounded-md drop-shadow-xl md:hover:scale-105 ring-1 ring-sky-700 md:active:scale-95 min-w-[32px] text-sky-800 bg-gradient-to-br from-white to-sky-200"
            onClick={() => {
              if (minOrH) {
                console.log("min");
                let formattedTime = timeAmount;
                array[pointer].time = formattedTime;
                setAllHabits(array);
                setMinOrH(!minOrH);
              } else {
                console.log("h");

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

export default Habits;
