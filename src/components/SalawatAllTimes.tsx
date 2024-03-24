/* eslint-disable react-refresh/only-export-components */
import TimeOfPray from "./TimeOfPray";
import { BiSun } from "react-icons/bi";
import { WiMoonWaxingCrescent3 } from "react-icons/wi";
import { BsCloudSunFill } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { BsFillSunsetFill } from "react-icons/bs";
import { BsFillSunriseFill } from "react-icons/bs";
import { ReactNode, useContext, useEffect } from "react";

import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";
import { getThePrayTime } from "../firebase/firebaseCustomFunctions";

const SalawatAllTimes = () => {
  const { prayers } = useContext(StoreContext);

  useEffect(() => {
    if (!prayers.todayTimes || Object.keys(prayers.todayTimes).length === 0) {
      prayers.getTodayPraysTimes();
    }
    if (
      !prayers.tommorowTimes ||
      Object.keys(prayers.tommorowTimes).length === 0
    ) {
      prayers.getTommorowPraysTimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salawat: { title: string; icon: ReactNode; time?: string }[] = [
    {
      title: "الفجر",
      icon: <WiMoonWaxingCrescent3 />,
      time: getThePrayTime(prayers.todayTimes.fajr?.seconds),
    },
    {
      title: "الشروق",
      icon: <BsFillSunriseFill />,
      time: getThePrayTime(prayers.todayTimes.sunrise?.seconds),
    },
    {
      title: "الظهر",
      icon: <BiSun />,
      time: getThePrayTime(prayers.todayTimes.duhr?.seconds),
    },
    {
      title: "العصر",
      icon: <BsCloudSunFill />,
      time: getThePrayTime(prayers.todayTimes.asr?.seconds),
    },
    {
      title: "المغرب",
      icon: <BsFillSunsetFill />,
      time: getThePrayTime(prayers.todayTimes.mgrb?.seconds),
    },
    {
      title: "العشاء",
      icon: <IoMoon />,
      time: getThePrayTime(prayers.todayTimes.asha?.seconds),
    },
  ];

  return (
    <div className="relative bg-darkGreen w-full rounded-xl mt-5 flex flex-wrap justify-center gap-3 items-center p-5 overflow-hidden">
      {salawat.map((salat) => (
        <TimeOfPray
          key={salat.title}
          title={salat.title}
          time={salat.time}
          icon={salat.icon}
        />
      ))}
      <div className="absolute  w-full h-full ">
        <img
          src="/overlay.jpg"
          className="w-full h-full object-cover mix-blend-multiply "
        />
      </div>
    </div>
  );
};

export default observer(SalawatAllTimes);
