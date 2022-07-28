/*global chrome*/

import Circle from "./Circle";
// import TimerMenu from "@/components/devlab/TimerMenu";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { localMode } from "../lib/constants";
import toast from "react-hot-toast";
import { Fireworks } from "@fireworks-js/react";
import {
  FaCheck,
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
import HabitUnit from "./HabitUnit";
function Habits() {
  console.log("------render--------");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useLocalStorage(
    "CSMessage",
    "You did it! Way to be consistent!"
  );
  const [soundOn, setSoundOn] = useLocalStorage("CSSoundOption", true);

  let pop = new Audio("assets/pop.wav");
  pop.volume = 0.1;
  let beep = new Audio("assets/click.mp3");
  beep.volume = 0.4;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 0.4;
  let successJingle = new Audio("assets/success.wav");
  successJingle.volume = 0.5;
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
      lastDone: null,
      position: null,
    },
  ]);
  //   const incomplete = allHabits.filter((item) => item.done === false);
  //   const done = useMemo(() => {
  //     return allHabits.filter((item) => item.done === true);
  //   }, [allHabits]);
  //This is the cloned all habits array
  let array = allHabits;
  //   console.log(allHabits);

  useEffect(() => {
    let done = allHabits.filter((item) => item.done === true);
    // console.log(done.length);
    // console.log(done);
    // console.log("done^^");
    // console.log(allHabits);
    // console.log("^^all");
    //DONE ISNT WORKING YO!!! It should be empty, but it's not

    //If there are completed habits...
    if (done.length > 0) {
      //get today reference
      let today = new Date().getMinutes();
      //   let today = new Date().toLocaleDateString("en-us", {
      //     month: "long",
      //     day: "numeric",
      //   });

      //   console.log(array);

      // for each done habit, if the date is not today, set done to false. Note, I am treating the "lastDone" key as the last day the habit was done. Therefore, I will not reassign the date to today, but I will set done to false. That way I can the date key to keep track of a streak in the future
      array.forEach((item) => {
        // console.log(
        //   item.lastDone +
        //     " = " +
        //     today +
        //     " today?" +
        //     " " +
        //     item.name +
        //     " <-Done? " +
        //     item.done
        // );
        // console.log(item.done + " " + item.num + " " + item.name);

        if (item.done === true && item.lastDone !== today) {
          //   console.log(
          // "++++IS DONE, And TIME DIFF" + item.done + " " + item.name
          //   );
          item.remaining = item.time * 60;
          item.done = false;
          item.playing = false;

          setAllHabits(array);
          setUpdate(!update);
        }

        // console.log(item);
        // console.log(item.done);
        // console.log(" ^^^ inside for each");
      });

      //   console.log(array);
    }
  }, []);
  //   }, [allHabits]);

  const resetAllForDay = () => {
    array.forEach((item) => {
      item.remaining = item.time * 60;
      item.done = false;
      item.playing = false;
    });

    setAllHabits(array);
  };
  //   console.log(allHabits);
  //   const setAsDone = useCallback(
  //     (id) => {
  const setAsDone = (id) => {
    if (soundOn) {
      pop.play();
    }

    // console.log(id + " id");
    // console.log(array[id].lastDone + array[id].done + " before assignment");
    // console.log(array[id].done + " .done = false ?");
    // console.log(allHabits);
    //   console.log(array[id]);
    if (array[id].done === false) {
      array[id].done = true;
      array[id].lastDone = new Date().getMinutes();
      //   array[id].lastDone = new Date().toLocaleDateString("en-us", {
      //     month: "long",
      //     day: "numeric",
      //   });

      if (!localMode) {
        chrome.notifications.create("", {
          type: "basic",
          iconUrl: "/small-logo.png",
          title: (array[id].name || "Timer") + " is done",
          message: "Nice work, keep Going!",
          priority: 2,
        });
      }
      setAllHabits(array);
      setUpdate(!update);

      let done = allHabits.filter((item) => item.done === true);
      console.log(done.length + " " + allHabits.length);
      if (done.length === allHabits.length) {
        party();
      }
      //   console.log(array);
    }
    console.log(array[id].lastDone + " after assignment");
  };
  // },
  // [allHabits, update, setAllHabits]
  //   );

  const setPlay = useCallback(
    (id, bool) => {
      if (soundOn) {
        bool ? beep.play() : boop.play();
      }
      array[id].playing = bool ? true : false;
      setAllHabits(array);
      setUpdate(!update);
    },
    [allHabits, update, setAllHabits]
  );

  const setRemaining = useCallback(
    (id, remaining) => {
      array[id].remaining = remaining;
      setAllHabits(array);
    },
    [allHabits, setAllHabits]
  );

  const menuRef = createRef();

  const onClickOutside = (e) => {
    if (e.target.id !== "cog") {
      setSettingsOpen(false);
    }
  };

  useClickOutside(menuRef, onClickOutside);

  const party = () => {
    setPartyTime(true);
    if (soundOn) {
      setTimeout(() => {
        successJingle.play();
      }, 400);
    }
    if (!localMode) {
      chrome.notifications.create("", {
        type: "basic",
        iconUrl: "/small-logo.png",
        title: "All habits completed!",
        message: "Another day in the books, fantastic work.",
        priority: 2,
      });
    }
    setTimeout(() => {
      setPartyTime(false);
    }, 9000);
  };

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
                sound: {
                  enabled: true,
                  files: ["/assets/bub.mp3", "/assets/bub2.mp3"],
                  volume: {
                    min: 5,
                    max: 10,
                  },
                },
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
          //   console.log(index);

          return (
            <div className={habit.size} key={index}>
              <Circle
                key={index}
                color={habit.color}
                done={habit.done}
                name={habit.name}
                setAsDone={setAsDone}
                setPlay={setPlay}
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

      {allHabits.filter((item) => item.done === true).length > 0 ? (
        <motion.div className="fixed  top-0 right-0 rounded-bl-2xl flex flex-wrap items-start flex-col fade-effect-quick justify-center bg-gradient-to-b from-sky-50 via-sky-300   gap-1 px-5 py-1 max-w-[11em] ">
          <p className="f1 ">Done</p>
          {allHabits.map((habit, index) => {
            console.log(habit.color);
            if (habit.done) {
              return (
                <div
                  key={index}
                  className={
                    "flex gap-2 items-center fade-effect relative w-fit h-fit "
                  }
                  color={habit.color}
                  name={habit.name}
                  time={habit.time}
                  num={index}
                >
                  <FaCheckCircle className={habit.color + " shrink-0"} />
                  <p className={"f1  decoration-white " + habit.color}>
                    {habit.name}
                  </p>

                  <div
                    className={"absolute w-full h-full  " + habit.color}
                  ></div>
                </div>
              );
            } else {
              return null;
            }
          })}
          {/* TODO figure out how to display this message */}
          {allHabits.filter((item) => item.done === true).length ===
          allHabits.length ? (
            <p className="fade-effect-quick  f1 ">All done! 😀</p>
          ) : null}
        </motion.div>
      ) : null}
      <div
        className="absolute top-3  left-3 cursor-pointer hover:scale-125 transition z-50"
        onClick={() => {
          if (soundOn) {
            beep.play();
          }
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
                if (soundOn) {
                  boop.play();
                }
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
                    console.log("noti clicked");
                    chrome.notifications.create("", {
                      type: "basic",
                      iconUrl: "/icons/icon32.png",
                      title: "Hello?",
                      message: "test message",
                      priority: 2,
                    });
                    console.log("after noti run");
                  } else {
                    console.log("in local mode");
                  }
                }}
              >
                Notification!
              </button>
              <button
                onClick={() => {
                  if (!localMode) {
                    console.log("noti message clicked");
                    chrome.runtime.sendMessage("", {
                      type: "notification",
                      options: {
                        type: "basic",
                        iconUrl: "/small-logo.png",
                        title: "done is done!",
                        message: "Nice work! Keep Going!",
                      },
                    });
                    console.log("after noti message run");
                  } else {
                    console.log("in local mode");
                  }
                }}
              >
                Notification Messenger
              </button>
              <button
                onClick={() => {
                  setPartyTime(!partyTime);
                }}
              >
                Fireworks?
              </button>
              <button
                onClick={() => {
                  if (soundOn) {
                    beep.play();
                  }
                  resetAllForDay();
                  setUpdate(!update);
                  window.location.reload(true);
                }}
              >
                Set all habits as incomplete
              </button>
              <div className="flex">
                <input
                  type="checkbox"
                  name="sound"
                  id="pop"
                  value={soundOn}
                  checked={soundOn}
                  onChange={() => {
                    soundOn ? boop.play() : beep.play();

                    setSoundOn(!soundOn);
                  }}
                />
                <p>Sounds</p>
              </div>
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
                      soundOn={soundOn}
                    />
                  );
                })}
                <button
                  className="w-full border-t-2  border-slate-400/40  h-8    flex gap-2 text-sky-800 font-bold items-center justify-center "
                  onClick={() => {
                    if (soundOn) {
                      beep.play();
                    }
                    setAllHabits([
                      ...allHabits,
                      {
                        name: "",
                        time: 0.1,
                        remaining: 0.1 * 60,
                        playing: false,
                        unit: "min",
                        color: "blue",
                        size: "scale-100",
                        done: false,
                        lastDone: null,
                        position: null,
                        num: allHabits.length,
                      },
                    ]);
                  }}
                >
                  <div className="flex gap-2 items-center mt-3 hover:scale-110 active:scale-95 hover:ring-2 px-4 transition duration-500 rounded-lg  ring-sky-500">
                    {" "}
                    <p className="text-sky-800">Add New Habit</p> <FaPlus />
                  </div>
                </button>
              </div>
              <button
                className="w-4/6  mt-4 mb-2 h-10 rounded-lg  shadow-xl flex gap-2 text-sky-100 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 font-bold items-center justify-center hover:scale-110 active:scale-95 transition duration-500"
                onClick={() => {
                  if (soundOn) {
                    boop.play();
                  }
                  setSettingsOpen(false);
                }}
              >
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-sky-50">Done</p> <FaCheck />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Habits;
