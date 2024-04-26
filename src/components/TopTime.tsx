/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../contexts/StoreContext";
import TimeSwitch from "./timeSwitchComponent/TimeSwitch";

const TopTime = () => {
  const { today } = useContext(StoreContext);

  useEffect(() => {
    today.getTodayDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full text-darkGreen  flex justify-center select-none">
      <div className="flex flex-col  items-center">
        {/* <h1 className="">{time}</h1> */}
        <div className="flex gap-2 font-bold text-3xl">
          <h1 className="text-center">{today.todayRoman}</h1>
        </div>
        <div className="flex gap-2 font-bold text-lg opacity-50">
          <h1 className="text-center">{today.todayHijri}</h1>
        </div>
        <TimeSwitch />
      </div>
    </div>
  );
};

export default observer(TopTime);
