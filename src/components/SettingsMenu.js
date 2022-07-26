import { createRef, useState } from "react";
import Select from "react-select";
import { colorOptions } from "../lib/colorOptions";
import HabitUnit from "./HabitUnit";

import {
  FaCheck,
  FaCog,
  FaPlus,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import { useClickOutside } from "../lib/useClickOutside";
import { useWindowSize } from "../lib/useWindowSize";

function SettingsMenu({
  setAllHabits,
  soundOn,
  allHabits,
  setSoundOn,
  setFireworks,
  setUpdate,
  update,
  setMessage,
  fireworks,
  message,
  setDarkMode,
  darkMode,
  welcome,
  setWelcome,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuRef = createRef();
  const windowSize = useWindowSize();

  const darkOptions = [
    { value: "dark", label: "🌜 Dark" },
    { value: "light", label: "🔆 Light" },
    { value: "auto", label: "💻 System" },
  ];

  let beep = new Audio("assets/click.mp3");
  beep.volume = 1;
  let boop = new Audio("assets/click2.mp3");
  boop.volume = 1;
  let pop = new Audio("assets/pop.wav");
  pop.volume = 0.05;

  const onClickOutside = (e) => {
    if (e.target.id !== "cog" && settingsOpen) {
      if (soundOn) {
        boop.play();
      }
      setSettingsOpen(false);
    }
  };
  useClickOutside(menuRef, onClickOutside);

  const randomPosition = () => {
    let x = Math.floor(Math.random() * (windowSize.width * 0.7));
    let y = Math.floor(Math.random() * (windowSize.height * 0.7));
    return { x: x, y: y };
  };
  return (
    <>
      <div
        className="absolute z-50 transition cursor-pointer top-1 left-1 hover:scale-125"
        onClick={() => {
          if (soundOn) {
            beep.play();
          }
          setSettingsOpen(!settingsOpen);
        }}
      >
        <FaCog id={"cog"} className="text-3xl text-white/70" />
      </div>
      {settingsOpen && (
        <div className="absolute flex items-center justify-center w-full h-full ">
          <div
            ref={menuRef}
            className="z-40 w-fit px-5 py-2 transition rounded-lg shadow-xl select-none h-fit min-h-[30%] max-h-[95%] bg-white/90 dark:bg-slate-700/90 fade-effect-fast relative"
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
              <button
                className="absolute text-2xl top-3 left-3 text-sky-600 dark:text-sky-200 hover:scale-110 "
                onClick={() => {
                  if (soundOn) {
                    boop.play();
                  }
                  setWelcome(!welcome);
                }}
              >
                <FaQuestionCircle />
              </button>
              <div className="flex flex-col items-center justify-center w-full h-full mt-4">
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
                      className="react-select-container !w-fit min-w-fit "
                      classNamePrefix="react-select"
                      placeholder={darkMode[1]}
                      options={darkOptions}
                      onFocus={() => {
                        if (soundOn) {
                          beep.play();
                        }
                      }}
                      onChange={(e) => {
                        if (soundOn) {
                          boop.play();
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

                <div className="flex flex-col items-center p-3 mt-2 rounded-lg shadow-lg ring-2 ring-sky-400 bg-white/80 dark:bg-slate-700/80">
                  <div className="h-1/3 max-h-[30em] overflow-y-auto  pt-3 px-3 ">
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
                      if (soundOn) {
                        pop.play();
                      }
                      setAllHabits([
                        ...allHabits,
                        {
                          name: "",
                          src: "",
                          time: 10,
                          remaining: 10 * 60,
                          unit: "min",
                          num: allHabits.length,
                          color: randomColor,
                          size: randomSize,
                          done: false,
                          playing: false,
                          lastDone: null,
                          startedAt: null,
                          position: {
                            x: randomPosition().x,
                            y: randomPosition().y,
                          },
                          daysDone: [],
                        },
                      ]);
                    }}
                  >
                    <div className="flex items-center gap-2 px-4 mt-3 transition duration-500 rounded-lg hover:scale-110 active:scale-95 hover:ring-2 ring-sky-500">
                      <p className="text-sky-800 f1">Add New Habit</p>{" "}
                      <FaPlus className="text-sky-800 dark:text-sky-100" />
                    </div>
                  </button>
                </div>
                <button
                  className="flex items-center justify-center w-4/6 h-10 gap-2 mt-4 mb-2 font-bold transition duration-500 rounded-lg shadow-xl dark:text-sky-200 text-sky-100 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 dark:from-sky-500 dark:via-sky-700 dark:to-sky-900 hover:scale-110 active:scale-95 f2"
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
    </>
  );
}

export default SettingsMenu;
