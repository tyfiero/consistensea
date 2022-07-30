/*global chrome*/

import Circle from "./Circle";
import { createRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { localMode } from "../lib/constants";
import { Fireworks } from "@fireworks-js/react";
import { FaCheck, FaCheckCircle, FaCog, FaPlus, FaTimes } from "react-icons/fa";
import { useClickOutside } from "../lib/useClickOutside";
import { useLocalStorage } from "../lib/useLocalStorage";
import HabitUnit from "./HabitUnit";
import Draggable from "react-draggable";
import { useDarkMode } from "../lib/useDarkMode";
import Select from "react-select";
import { useWindowSize } from "../lib/useWindowSize";
import { colorOptions } from "../lib/colorOptions";

function Habits({ setUrl }) {
  // console.log("------render--------");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useLocalStorage(
    "CSMessage",
    "You did it! Way to be consistent!"
  );
  const [soundOn, setSoundOn] = useLocalStorage("CSSoundOption", true);
  const [fireworks, setFireworks] = useLocalStorage("CSFireworksOption", true);
  const windowSize = useWindowSize();
  console.log(windowSize);
  const [darkMode, setDarkMode] = useLocalStorage("CSDarkMode", [
    "dark",
    "🌜 Dark",
  ]);

  let body = document.querySelector("body");
  const theme = useDarkMode() ? "dark" : "light";
  const darkOptions = [
    { value: "dark", label: "🌜 Dark" },
    { value: "light", label: "🔆 Light" },
    { value: "auto", label: "💻 System" },
  ];
  let pop = new Audio("assets/pop.wav");
  pop.volume = 0.1;
  let beep = new Audio("assets/click.mp3");
  beep.volume = 0.4;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 0.4;
  let successJingle = new Audio("assets/success.wav");
  successJingle.volume = 0.5;
  const [partyTime, setPartyTime] = useState(false);

  const darkFunc = () => {
    const root = window.document.documentElement;
    if (darkMode[0] === "dark") {
      let darkImg = [
        "assets/dark.jpg",
        "assets/dark2.jpg",
        "assets/dark3.jpg",
        "assets/dark4.jpg",
        "assets/dark5.jpg",
      ];
      let randomDarkImg = darkImg[Math.floor(Math.random() * darkImg.length)];
      document.querySelector(":root").style.setProperty("--bg", "black");
      root.classList.add("dark");
      setUrl(randomDarkImg);
    } else if (darkMode[0] === "light") {
      let img = [
        "assets/img1.jpg",
        "assets/img2.jpg",
        "assets/img3.jpg",
        "assets/img4.jpg",
      ];
      let randomImg = img[Math.floor(Math.random() * img.length)];
      document.querySelector(":root").style.setProperty("--bg", "white");

      root.classList.remove("dark");
      setUrl(randomImg);
    } else {
      theme === "dark"
        ? root.classList.add("dark")
        : root.classList.remove("dark");
    }
  };

  //---------------------------DARK MODE useEffect
  useEffect(() => {
    darkFunc();
    // setDarkMode(darkMode);
    setUpdate(!update);
  }, [darkMode, theme]);
  const [allHabits, setAllHabits] = useLocalStorage("CSHabits", [
    {
      name: "Twitter",
      src: "",
      time: 0.1,
      remaining: 0.1 * 60,
      unit: "min",
      num: 0,
      color: "blue",
      size: "1",
      done: false,
      playing: false,
      lastDone: null,
      startedAt: null,
      position: {
        x: Number(Math.floor(window.innerWidth * 0.38)),
        y: Number(Math.floor(window.innerHeight * 0.38)),
      },
      streak: 0,
    },
  ]);
  console.log(allHabits);
  //This is the cloned all habits array
  let array = allHabits;

  const randomPosition = () => {
    let x = Math.floor(Math.random() * (windowSize.width * 0.7));
    let y = Math.floor(Math.random() * (windowSize.height * 0.7));
    return { x: x, y: y };
  };

  const calcRemainingTime = (habit) => {
    // console.log(habit);
    let now = Number((new Date().getTime() / 1000).toFixed(0));
    if (habit.playing === true && now - habit.startedAt > 2) {
      let fullTime = habit.time * 60;
      let timeElapsedAtClose = Number(fullTime - habit.remaining);
      let startedTime = Number(habit.startedAt);
      let timeElapsedSinceClose = now - (startedTime + timeElapsedAtClose);
      let newRemaining =
        fullTime - (timeElapsedAtClose + timeElapsedSinceClose);
      // console.log(habit.remaining + " time shown  ");
      // console.log(newRemaining + " time it should display");
      // console.log(array[habit.num]);
      if (newRemaining > 0) {
        return newRemaining;
      } else {
        setPlay(habit.num, false);
        setAsDone(habit.num);
        return habit.time * 60;
      }
    } else {
      try {
        return allHabits[habit.num].remaining;
      } catch (err) {
        return null;
      }
    }
  };

  const resetForNewDay = (habit) => {
    // for each done habit, if the date is not today, set done to false. Note, I am treating the "lastDone" key as the last day the habit was done. Therefore, I will not reassign the date to today, but I will set done to false. That way I can the date key to keep track of a streak in the future
    let today = new Date().getMinutes();

    console.log(
      habit.lastDone +
        " = " +
        today +
        " today?" +
        " " +
        habit.name +
        " Done? -> " +
        habit.done
    );

    if (habit.done === true && habit.lastDone !== today) {
      console.log("++++IS DONE, And TIME DIFF" + habit.done + " " + habit.name);
      habit.remaining = habit.time * 60;
      habit.done = false;
      habit.playing = false;

      setAllHabits(array);
      setUpdate(!update);
    }
  };

  //-------------------------------------------------------------------------
  //Reset after new day useEffect
  useEffect(() => {
    array.forEach((item) => {
      if (item.done === true) {
        resetForNewDay(item);
      }
    });
    // console.log(array);
  }, []);

  //-------------------------------------------------------------------------
  const setPlay = useCallback(
    (id, bool) => {
      if (soundOn) {
        bool ? beep.play() : boop.play();
      }
      if (array[id].playing === false) {
        array[id].startedAt = (new Date().getTime() / 1000).toFixed(0);
      }

      array[id].playing = bool ? true : false;
      setAllHabits(array);
      setUpdate(!update);
    },
    [allHabits, update, setAllHabits]
  );

  //-------------------------------------------------------------------------
  const setRemaining = useCallback(
    (id, remaining) => {
      array[id].remaining = remaining;
      setAllHabits(array);
    },
    [allHabits, setAllHabits]
  );

  //-------------------------------------------------------------------------
  const setAsDone = useCallback(
    (id) => {
      if (soundOn) {
        pop.play();
      }
      let today = new Date().getMinutes();
      // let today = new Date().toLocaleDateString("en-us", {
      //   month: "long",
      //   day: "numeric",
      // });

      // console.log(array[id].lastDone + array[id].done + " before assignment");
      // console.log(array[id].done + " .done = false ?");

      if (array[id].done === false) {
        // const difference =
        //   parseInt(today.lastDone.split("/")[1]) -
        //   parseInt(array[id].lastDone.split("/")[1]);
        const difference = today - array[id].lastDone;
        // console.log(today + " - " + array[id].lastDone);

        // console.log(difference);
        if (difference === 1) {
          array[id].streak++;
        } else {
          array[id].streak = 0;
        }

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
        if (done.length === allHabits.length) {
          party();
        }
      }
      console.log(array[id].lastDone + " after assignment");
      // };
    },
    [allHabits, update, setAllHabits]
  );

  //-------------------------------------------------------------------------

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

  const resetAllForDay = () => {
    array.forEach((item) => {
      item.remaining = item.time * 60;
      item.done = false;
      item.playing = false;
    });

    setAllHabits(array);
  };
  return (
    <div className="w-full h-screen page-container parent">
      <AnimatePresence>
        {partyTime ? (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1200 }}
            transition={{ duration: 1.5 }}
          >
            {fireworks && (
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
            )}
            <div className="flex items-center justify-center w-full h-full">
              {" "}
              <p className="text-6xl !leading-none logo h-fit f1 ">{message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="w-full h-full ">
        {/* <motion.div className="flex flex-wrap items-center content-center justify-center w-full h-full gap-3 "> */}
        {allHabits.map((habit, index) => {
          // console.log(
          //   habit.position.x + " " + habit.position.y + "  " + habit.name
          // );

          return (
            <Draggable
              position={habit.position}
              key={index}
              bounds="parent"
              onStop={(e, data) => {
                console.log(data);
                array[index].position = { x: data.x, y: data.y };
                setAllHabits(array);
                setUpdate(!update);
              }}
            >
              <motion.div
                className={habit.size + "   w-fit h-fit absolute "}
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{
                //   duration: 0.6,
                //   delay: habit.num * 0.2,
                // }}
              >
                <Circle
                  key={index}
                  color={habit.color}
                  done={habit.done}
                  name={habit.name}
                  setAsDone={setAsDone}
                  setPlay={setPlay}
                  remaining={calcRemainingTime(habit)}
                  setRemaining={setRemaining}
                  playing={habit.playing}
                  time={habit.time}
                  streak={habit.streak}
                  size={habit.size}
                  src={habit.src}
                  num={index}
                />
              </motion.div>
            </Draggable>
          );
        })}
      </div>

      {allHabits.filter((item) => item.done === true).length > 0 ? (
        <div className="fixed  top-0 right-0 rounded-bl-2xl flex flex-wrap items-start flex-col fade-effect-quick justify-center bg-gradient-to-b from-sky-300 via-sky-300 to-sky-200 dark:from-slate-400 dark:via-slate-500 dark:to-slate-800    gap-1 px-5 py-1 max-w-[11em] ">
          <p className="f1 dark:text-slate-200/70 f2 text-sky-700 ">
            Completed
          </p>
          {allHabits.map((habit, index) => {
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
                  <p
                    className={
                      "f1  decoration-white  dark:opacity-75 opacity-100 " +
                      habit.color
                    }
                  >
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
            <p className="fade-effect-quick f1 ">All done! 😀</p>
          ) : null}
        </div>
      ) : null}
      <div
        className="absolute z-50 transition cursor-pointer top-3 left-3 hover:scale-125"
        onClick={() => {
          if (soundOn) {
            beep.play();
          }
          setSettingsOpen(!settingsOpen);
        }}
      >
        <FaCog
          id={"cog"}
          className="scale-150 text-sky-700/80 dark:text-white/70"
        />
      </div>

      {settingsOpen && (
        <div className="absolute flex items-center justify-center w-full h-full ">
          <div
            ref={menuRef}
            className="z-50 w-1/2 px-5 py-2 transition rounded-lg shadow-xl select-none h-fit min-h-[30%] max-h-[95%] bg-white/90 dark:bg-slate-700/90 fade-effect-fast relative"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center gap-2 m-0">
                {" "}
                <div className="flex">
                  {" "}
                  <p className="text-4xl font-bold f2 logo drop-shadow-md">
                    Consisten
                  </p>
                  <p className="text-4xl font-bold f2 logo2 drop-shadow-md">
                    Sea
                  </p>
                </div>
                <img
                  src="/small-logo.png"
                  alt="ConsistenSea logo"
                  className="w-10 h-10 "
                />
              </div>

              <button
                className="absolute text-2xl top-3 right-3 text-sky-600 dark:text-sky-200 hover:scale-110 "
                onClick={() => {
                  if (soundOn) {
                    boop.play();
                  }
                  setSettingsOpen(false);
                }}
              >
                <FaTimes />
              </button>
              {/* <p className="my-2 text-xl font-bold text-sky-700 f1 ">Settings</p> */}
              <div className="flex flex-col items-center justify-center w-full h-full mt-4">
                {/* <button
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
                </button> */}
                <div className="flex justify-center w-full gap-10 ml-36">
                  <div className="flex flex-col gap-10">
                    <p className="mt-1 f1">Sounds</p>
                    <p className="f1">Fireworks</p>
                  </div>
                  <div className="flex flex-col items-start gap-8 mb-2">
                    <label className="mt-1 toggler-wrapper slider">
                      <input
                        type="checkbox"
                        name="sound"
                        id="pop"
                        value={soundOn}
                        checked={soundOn}
                        onChange={() => {
                          if (!soundOn) {
                            beep.play();
                          }

                          setSoundOn(!soundOn);
                        }}
                      />
                      <div className="toggler-slider border-2 dark:border-slate-500 border-slate-300 !bg-white dark:!bg-slate-800">
                        <div className="toggler-knob"></div>
                      </div>
                    </label>
                    <label className="mt-1 toggler-wrapper slider">
                      <input
                        type="checkbox"
                        name="sound"
                        id="pop"
                        value={fireworks}
                        checked={fireworks}
                        onChange={() => {
                          if (soundOn) {
                            fireworks ? boop.play() : beep.play();
                          }
                          setFireworks(!fireworks);
                        }}
                      />

                      <div className="toggler-slider border-2 dark:border-slate-500 border-slate-300 !bg-white dark:!bg-slate-800">
                        <div className="toggler-knob"></div>
                      </div>
                    </label>
                  </div>
                  <div className="flex flex-col gap-10">
                    <p className="mt-1 f1">Theme</p>
                    <p className=" f1">Message</p>
                  </div>

                  <div className="flex flex-col items-start gap-4 mb-2">
                    <Select
                      className="my-react-select-container !w-fit min-w-fit "
                      classNamePrefix="my-react-select"
                      placeholder={darkMode[1]}
                      options={darkOptions}
                      onChange={(e) => {
                        if (soundOn) {
                          beep.play();
                        }
                        setDarkMode([e.value, e.label]);
                      }}
                    />
                    <textarea
                      type="text"
                      value={message}
                      className=" w-48 ring-2 dark:ring-slate-500 ring-slate-300 text-center f1 !px-2 text-sm !py-1  textarea-tw"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center p-3 mt-2 rounded-lg shadow-lg ring-2 bg-white/80 dark:bg-slate-700/80">
                  <div className="h-1/3 max-h-[30em] overflow-y-auto  pt-3 px-3">
                    {allHabits.map((habit, index) => {
                      return (
                        <HabitUnit
                          key={index}
                          index={index}
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
                  </div>
                  <button
                    className="flex items-center justify-center w-full h-8 gap-2 font-bold border-t-2 border-slate-400/40 text-sky-800 "
                    onClick={() => {
                      let colorIndex = Math.floor(
                        Math.random() * colorOptions.length
                      );
                      let randomColor = colorOptions[colorIndex].colorText;

                      let randomSize = (Math.random() * 0.6 + 0.7).toFixed(1);
                      console.log(randomSize);
                      if (soundOn) {
                        beep.play();
                      }
                      setAllHabits([
                        ...allHabits,
                        {
                          name: "",
                          src: "",
                          time: 0.1,
                          remaining: 0.1 * 60,
                          playing: false,
                          unit: "min",
                          color: randomColor,
                          // size: randomSize,
                          size: randomSize,
                          done: false,
                          lastDone: null,
                          streak: 0,
                          startedAt: null,
                          num: allHabits.length,
                          // position: { x: allHabits.length * 200, y: 0 },
                          position: {
                            x: randomPosition().x,
                            y: randomPosition().y,
                          },
                        },
                      ]);
                    }}
                  >
                    <div className="flex items-center gap-2 px-4 mt-3 transition duration-500 rounded-lg hover:scale-110 active:scale-95 hover:ring-2 ring-sky-500">
                      {" "}
                      <p className="text-sky-800 f1">Add New Habit</p>{" "}
                      <FaPlus className="text-sky-800 dark:text-sky-100" />
                    </div>
                  </button>
                </div>
                <button
                  className="flex items-center justify-center w-4/6 h-10 gap-2 mt-4 mb-2 font-bold transition duration-500 rounded-lg shadow-xl dark:text-sky-200 text-sky-100 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 dark:from-sky-500 dark:via-sky-700 dark:to-sky-900 hover:scale-110 active:scale-95 "
                  onClick={() => {
                    if (soundOn) {
                      boop.play();
                    }
                    setSettingsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {" "}
                    <p className="text-sky-50 f1 dark:text-sky-200">
                      Done
                    </p>{" "}
                    <FaCheck />
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
