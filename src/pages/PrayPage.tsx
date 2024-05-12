/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { CircularProgress, Container } from "@mui/material";
// import Soon from "../components/Soon";
import MonthTableCell from "../components/MonthTableCell";
import DayTimesCell from "../components/DayTimesCell";
import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";
import Soon from "../components/Soon";

const PrayPage = () => {
  const { months } = useContext(StoreContext);
  const todayDate = new Date();
  const todayCellRef = useRef<HTMLDivElement | null>(null);

  const times = ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"];

  const goToTodayCell = () => {
    todayCellRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    goToTodayCell();
  }, [months.CurrentIndex]);

  return (
    <Container
      maxWidth="sm"
      className="overflow-x-hidden py-10 overflow-y-auto"
    >
      <div>
        <MonthTableCell />
        <div className="mt-2 flex flex-col gap-1 ">
          <DayTimesCell day="اليوم" times={times} />

          <div className="w-full h-[70vh] pb-5 flex flex-col  gap-1 overflow-auto">
            {months.currentMonthTimesArray.length > 0 ? (
              months.currentMonthTimesArray.map((dayData, index) => (
                <DayTimesCell
                  ref={
                    todayDate.getDate() === +dayData.day &&
                    todayDate.getMonth() === months.CurrentIndex
                      ? todayCellRef
                      : undefined
                  }
                  key={index}
                  day={dayData.day}
                  times={dayData.allTimes}
                  color={
                    todayDate.getDate() === +dayData.day &&
                    todayDate.getMonth() === months.CurrentIndex
                      ? "bg-emerald-700"
                      : "bg-darkGreen"
                  }
                />
              ))
            ) : months.currentMonthDataLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress color="success" size={80} />
              </div>
            ) : (
              <Soon />
            )}
          </div>
        </div>
        {/* <Soon /> */}
      </div>
    </Container>
  );
};

export default observer(PrayPage);
