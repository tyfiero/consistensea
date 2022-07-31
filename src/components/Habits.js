/*global chrome*/

import Circle from "./Circle";
import { createRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { localMode } from "../lib/constants";
import { Fireworks } from "@fireworks-js/react";
import { FaCheck, FaCheckCircle, FaCog, FaPlus, FaTimes } from "react-icons/fa";
import { useLocalStorage } from "../lib/useLocalStorage";
import Draggable from "react-draggable";
import { useWindowSize } from "../lib/useWindowSize";
import SettingsMenu from "./SettingsMenu";
import { ResizableBox } from "react-resizable";

function Habits({ setUrl }) {
  console.log("------------------Habit Render------------------");

  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useLocalStorage(
    "CSMessage",
    "You did it! Way to be consistent!"
  );
  const [soundOn, setSoundOn] = useLocalStorage("CSSoundOption", true);
  const [fireworks, setFireworks] = useLocalStorage("CSFireworksOption", true);

  // const windowSize = useWindowSize();
  // console.log(windowSize);
  let beep = new Audio("assets/click.mp3");
  beep.volume = 0.4;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 0.4;
  let pop = new Audio("assets/pop.wav");
  pop.volume = 0.1;

  let successJingle = new Audio("assets/success.wav");
  successJingle.volume = 0.5;
  const [partyTime, setPartyTime] = useState(false);

  const [allHabits, setAllHabits] = useLocalStorage("CSHabits", [
    {
      name: "Twitter",
      src: "",
      time: 10,
      remaining: 10 * 60,
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
  // console.log(allHabits);
  //This is the cloned all habits array
  let array = allHabits;

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

  // const resetAllForDay = () => {
  //   array.forEach((item) => {
  //     item.remaining = item.time * 60;
  //     item.done = false;
  //     item.playing = false;
  //   });

  //   setAllHabits(array);
  // };

  return (
    <>
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
                <p className="text-6xl !leading-none logo h-fit f1 ">
                  {message}
                </p>
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
                <div className={"   w-fit h-fit absolute "}>
                  <motion.div
                    className={habit.size + "   w-fit h-fit absolute "}
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // transition={{
                    //   duration: 0.6,
                    //   delay: habit.num * 0.2,
                    // }}
                    style={{ transform: `scale(${habit.size})` }}
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
                </div>
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

            {allHabits.filter((item) => item.done === true).length ===
            allHabits.length ? (
              <p className="fade-effect-quick f1 ">All done! 😀</p>
            ) : null}
          </div>
        ) : null}
      </div>
      <SettingsMenu
        setSoundOn={setSoundOn}
        soundOn={soundOn}
        setFireworks={setFireworks}
        fireworks={fireworks}
        setMessage={setMessage}
        message={message}
        setUrl={setUrl}
        setUpdate={setUpdate}
        update={update}
        allHabits={allHabits}
        setAllHabits={setAllHabits}
      />
    </>
  );
}

export default Habits;
