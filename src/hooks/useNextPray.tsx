import { useContext, useEffect, useState } from "react";
import {
  checkNextPray,
  getTheTimeDifference,
} from "../firebase/firebaseCustomFunctions";
import { PrayersContext } from "../contexts/PrayersContext";

const useNextPray = () => {
  const { todayTimes } = useContext(PrayersContext);
  const [timeNow, setTimeNow] = useState<string>();
  const [nextPray, setNextPray] = useState<string>();
  const [nextPrayTime, setNextPrayTime] = useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      const { nextPray, nextPrayTime, nextPrayTimeSeconds } =
        checkNextPray(todayTimes);
      const timeDif = getTheTimeDifference(nextPrayTimeSeconds);
      setTimeNow(timeDif);
      setNextPray(nextPray);
      setNextPrayTime(nextPrayTime);
    }, 1000);

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { timeNow, nextPray, nextPrayTime };
};

export default useNextPray;
