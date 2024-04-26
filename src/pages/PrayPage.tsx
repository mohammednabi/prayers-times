/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { Container } from "@mui/material";
import Soon from "../components/Soon";
import MonthTableCell from "../components/MonthTableCell";
import DayTimesCell from "../components/DayTimesCell";
import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";

const PrayPage = () => {
  const { months } = useContext(StoreContext);
  const timeNow = new Date().toLocaleTimeString("ar-EG", {
    minute: "2-digit",
    hour: "numeric",
    hourCycle: "h12",
  });
  const times = ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"];
  const times2 = [timeNow, timeNow, timeNow, timeNow, timeNow, timeNow];

  // useEffect(() => {
  //   if (Object.keys(months.currenMonthDocument).length > 0) {
  //     console.log(
  //       "this is the days keys",
  //       Object.keys(months.currenMonthDocument.days.days)
  //     );
  //   }
  // }, [Object.keys(months.currenMonthDocument).length]);

  return (
    <Container
      maxWidth="sm"
      className="overflow-x-hidden py-10 overflow-y-auto"
    >
      <div>
        {/* <MonthTableCell />
        <div className="mt-2 flex flex-col gap-1 ">
          <DayTimesCell day="اليوم" times={times} />

          {Object.keys(months.currenMonthDocument.days).length > 0 &&
            Object.keys(months.currenMonthDocument.days.days).length > 0 &&
            Object.keys(months.currenMonthDocument.days.days).map(
              (val: string) => (
                <DayTimesCell key={val} day={val} times={times2} />
              )
            )}
        </div> */}
        <Soon />
      </div>
    </Container>
  );
};

export default observer(PrayPage);
