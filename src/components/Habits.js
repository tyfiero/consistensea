import Circle from "./Circle";
// import TimerMenu from "@/components/devlab/TimerMenu";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Habits() {
  const [timerOpen, setTimerOpen] = React.useState(false);
  const [size, setSize] = React.useState(" scale-100 ");

  return (
    <div className="w-full h-screen page-container overflow-hidden">
      <div className="flex">{/* <TimerMenu /> */}</div>
      <motion.div className="flex flex-wrap items-center justify-center w-full h-full gap-3 ">
        <Circle size={size} num={1} />
        <Circle size={size} num={2} />
        <Circle size={size} num={3} />
        <Circle size={size} num={4} />
      </motion.div>
    </div>
  );
}

export default Habits;
