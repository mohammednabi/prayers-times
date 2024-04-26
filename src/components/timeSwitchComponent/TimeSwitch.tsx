/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
// import { Switch } from "@mui/material";
import { FiSun } from "react-icons/fi";
import { IoIosSnow } from "react-icons/io";
import classes from "./timeSwitch.module.css";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";

import { StoreContext } from "../../contexts/StoreContext";
import { observer } from "mobx-react-lite";

interface TimeSwitchProps {
  // Define your props here
}

const TimeSwitch = ({}: TimeSwitchProps) => {
  const { summer } = useContext(StoreContext);

  const switchRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const switchTheBtn = () => {
    summer.switchSummerTime();
  };

  return (
    <div>
      {/* <Switch
      //   classes={{ track: "bg-yellow-200" }}
      /> */}

      <div
        ref={parentRef}
        className="relative flex gap-5 items-center bg-darkGreen p-2 rounded-l-full rounded-r-full select-none cursor-pointer"
        onClick={switchTheBtn}
      >
        <motion.div
          ref={switchRef}
          initial={{ x: 0 }}
          animate={{
            x: summer.isSummerTime
              ? parentRef.current && switchRef.current
                ? parentRef.current?.offsetWidth -
                  switchRef.current?.offsetWidth
                : 40
              : 0,
          }}
          className={classes.switchBtn}
        />
        <FiSun className="text-lightBeige  text-xl" />
        <IoIosSnow className="text-lightBeige text-xl" />
      </div>
    </div>
  );
};

export default observer(TimeSwitch);
