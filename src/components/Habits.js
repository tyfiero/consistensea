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
import { colorOptions } from "../lib/colorOptions";
function Habits() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useLocalStorage(
    "CSMessage",
    "You did it! Way to be consistent!"
  );
  const [soundOn, setSoundOn] = useState(true);

  const [partyTime, setPartyTime] = useState(false);

  const [allHabits, setAllHabits] = useLocalStorage("CSHabits", [
    {
      name: "Twitter",
      time: 0.1,
      remaining: 0.1 * 60,
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
    // console.log(id);
    // console.log("did sumfin");
    let array = allHabits;
    if (remaining === 0) {
      array[id].playing = false;
    } else if (
      array[id].playing === false &&
      remaining / 60 !== array[id].time
    ) {
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
            transition={{ duration: 1.5 }}
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

          return (
            <div className={habit.size} key={index}>
              <Circle
                key={index}
                color={habit.color}
                done={habit.done}
                name={habit.name}
                setAsDone={setAsDone}
                remaining={habit.remaining}
                setRemaining={setRemaining}
                playing={habit.playing}
                time={habit.time}
                num={index}
              />
            </div>
          );
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
        className="absolute top-3  left-3 cursor-pointer hover:scale-125 transition z-50"
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
                        remaining: 0.1 * 60,
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


export default Habits;
