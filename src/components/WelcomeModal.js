import { useClickOutside } from "../lib/useClickOutside";

import React, { createRef } from "react";
import {
  FaArrowsAlt,
  FaCheck,
  FaClock,
  FaCoffee,
  FaCog,
  FaComment,
  FaExternalLinkAlt,
  FaLock,
  FaPalette,
  FaPause,
  FaPlay,
  FaRedo,
  FaTimes,
  FaTools,
} from "react-icons/fa";

function WelcomeModal({ welcome, setWelcome }) {
  const menuRef = createRef();
  let date = new Date().getFullYear();

  const onClickOutside = (e) => {
    setWelcome(false);
  };
  useClickOutside(menuRef, onClickOutside);

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-screen h-screen fade-effect-quick bg-slate-800/50" />
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen ">
        <div
          ref={menuRef}
          className={
            " glass-box  shadow-2xl flex flex-col w-2/3  items-center !px-8 z-100 bg-slate-50 dark:bg-slate-800 grow-effect min-h-[40em]"
          }
        >
          <div className="flex gap-3">
            <h3 className="text-4xl f1 text-sky-700 dark:text-sky-100">
              Welcome to
            </h3>
            <div className="flex">
              {" "}
              <p className="text-4xl font-bold f2 logo drop-shadow-md">
                Consisten
              </p>
              <p className="text-4xl font-bold f2 logo2 drop-shadow-md">Sea</p>
              <h3 className="text-4xl f1 text-sky-700 dark:text-sky-100">!</h3>
            </div>
          </div>
          <button
            className="absolute text-3xl text-sky-700 dark:text-sky-300 top-2 right-5"
            onClick={() => setWelcome(false)}
          >
            <FaTimes />
          </button>

          <div className="flex flex-col items-center w-full pb-2 mt-5">
            <div className="flex w-full gap-5">
              <div className="flex flex-col w-2/5 gap-2">
                <h3 className="text-2xl text-center text-sky-600 dark:text-sky-100 f2">
                  Features
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-200 text-sky-800">
                      <FaArrowsAlt />
                    </div>
                  </div>
                  <h4 className="text-lg text-sky-600 dark:text-sky-300 f2">
                    Arrangeable -{" "}
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Click and drag the bubble to move it.
                    </span>
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-200 text-sky-800">
                      <FaClock />
                    </div>
                  </div>
                  <h4 className="text-lg text-sky-600 dark:text-sky-300 f2">
                    Adjustable Time -{" "}
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Set time per habit in settings.
                    </span>
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-200 text-sky-800">
                      <FaPalette />
                    </div>
                  </div>
                  <h4 className="text-lg text-sky-600 dark:text-sky-300 f2">
                    Customizable -{" "}
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Set color and size in settings.
                    </span>
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-200 text-sky-800">
                      <FaLock />
                    </div>
                  </div>
                  <h4 className="text-lg text-sky-600 dark:text-sky-300 f2">
                    Private -{" "}
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      All data lives on your device, no trackers, no ads,
                      nothing.
                    </span>
                  </h4>
                </div>
              </div>
              <div className="flex flex-col w-3/5 gap-2 ">
                <h3 className="text-2xl text-center text-sky-600 dark:text-sky-100 f2">
                  How-To
                </h3>
                <ul className="flex flex-col gap-2 list-disc dark:text-sky-100 text-sky-800 ">
                  <li className="text-base dark:text-sky-100 text-sky-800 f1">
                    Click the <FaCog className="inline" /> icon in the top left
                    to open the settings and add habits.
                  </li>
                  <li className="text-base dark:text-sky-100 text-sky-800 f1">
                    On the bubble, <FaPlay className="inline" /> &{" "}
                    <FaPause className="inline" /> start and stop the timer,{" "}
                    <FaRedo className="inline" /> resets the timer,{" "}
                    <FaCheck className="inline" /> marks the habit as complete,
                    and the <FaExternalLinkAlt className="inline" /> opens the
                    url in a new tab.
                  </li>
                  <li className="text-base dark:text-sky-100 text-sky-800 f1">
                    If you finish all of your habits in a day, you'll be
                    rewarded with fireworks and an encouraging message! The
                    message can be adjusted in settings.
                  </li>
                  <li className="text-base dark:text-sky-100 text-sky-800 f1">
                    Each completed habit will reset daily for you to be
                    consistent again!
                  </li>
                </ul>
              </div>
            </div>
            <h4 className="text-2xl text-sky-600 dark:text-sky-100 f2">
              What is ConsistenSea?
            </h4>
            <p className="f1 dark:text-sky-100 text-sky-800">
              It's a new tab chrome extension to help you stay consistent with
              your daily habits. I designed it to be very simple, no extraneous
              features, just an easy way to keep track of your daily habits, and
              master the art of showing up every single day. Even 10 minutes a
              day of action will lead you further than your peers.
            </p>
            <blockquote className="my-4 ml-4 text-lg text-bold f2 dark:text-sky-300 text-sky-800">
              “It's not what we do once in a while that shapes our lives. It's
              what we do consistently.” ― Tony Robbins
            </blockquote>
            <p className="f1 dark:text-sky-100 text-sky-800">
              I made this app for myself, I found that I constantly forgot to
              check my habit trackers everyday, so having it on every new tab
              was the best way to remember. Reach out using the buttons below if
              you have feedback or feature requests, I will get back to you as
              soon as I can. I hope you enjoy it!
            </p>

            <p className="mt-2">I'm so happy you're here 😊</p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://tally.so/r/m68WWJ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-4/6 h-10 gap-2 px-3 mt-1 mb-2 font-bold transition duration-500 rounded-lg shadow-xl dark:text-sky-200 text-sky-100 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 dark:from-sky-500 dark:via-sky-700 dark:to-sky-900 hover:scale-110 active:scale-95 f2"
            >
              <FaComment /> Feedback
            </a>
            <a
              href="https://tally.so/r/waQAKb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 gap-2 px-3 mt-1 mb-2 font-bold text-teal-100 transition duration-500 rounded-lg shadow-xl whitespace-nowrap dark:text-teal-200 bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700 dark:from-teal-500 dark:via-teal-700 dark:to-teal-900 hover:scale-110 active:scale-95 f2"
            >
              <FaTools /> Feature Request
            </a>
            <a
              href="https://www.buymeacoffee.com/tyfiero"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-4/6 h-10 gap-2 px-3 mt-1 mb-2 font-bold text-green-100 transition duration-500 rounded-lg shadow-xl whitespace-nowrap dark:text-green-200 bg-gradient-to-br from-green-300 via-green-500 to-green-700 dark:from-green-500 dark:via-green-700 dark:to-green-900 hover:scale-110 active:scale-95 f2"
            >
              <FaCoffee />
              Buy me a coffee
            </a>
          </div>
          <div className="flex justify-center w-full">
            {" "}
            <p className="text-[11px] text-slate-700 dark:slate-100 mt-2 mb-4">
              Copyright © {date}{" "}
              <a href="www.tyfiero.com" className="underline text-sky-400">
                Ty Fiero
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomeModal;
