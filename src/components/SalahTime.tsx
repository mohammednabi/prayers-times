/* eslint-disable react-refresh/only-export-components */
import { useCallback, useContext, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";
import SummerTime from "./SummerTime";

const SalahTime = () => {
  const { prayers } = useContext(StoreContext);

  const alertUser = useCallback(() => {
    alert("لا يمكنك تغيير الموقع في الوقت الحالي ");
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      prayers.getTheNextPray();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full relative h-auto py-5 rounded-3xl bg-lightGreen mt-5 flex justify-center items-center overflow-hidden select-none">
      <div className="relative z-10 flex flex-col justify-center items-center">
        <h1 className="text-white text-xl"> {prayers.nextPrayObj.nextPray}</h1>
        <h1 className="text-white text-5xl font-bold pt-4">
          {prayers.nextPrayObj.nextPrayTime}
        </h1>
        <div className="flex flex-col justify-center gap-1 mt-5">
          <h1 className="text-white/50 text-sm text-center">
            {" "}
            باقي على الصلاة
          </h1>
          <h1 className="text-white text-lg text-center"> {prayers.timer}</h1>
        </div>
        <div className="flex items-center  text-white text-sm mt-10">
          <IoLocationOutline />
          <h1 className="cursor-pointer select-none" onClick={alertUser}>
            {" "}
            مصر , الأقصر
          </h1>
        </div>
        <SummerTime />
      </div>

      <div className="w-full h-full  absolute ">
        <img
          src="/islamicBackground.jpg"
          alt=""
          className="w-full h-full object-cover  absolute "
        />
        <div className="bg-black/50 absolute  w-full h-full" />
      </div>
    </div>
  );
};

export default observer(SalahTime);
