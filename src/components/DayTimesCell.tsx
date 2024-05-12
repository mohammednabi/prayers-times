/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import { observer } from "mobx-react-lite";
import { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface DayTimesCellProps {
  // Define your props here
  day: string;
  times: string[];
  color?: "bg-emerald-700" | "bg-darkGreen";
  // ref?: LegacyRef<HTMLDivElement> | undefined;
}

const DayTimesCell = forwardRef(function DayTimesCell(
  { day, times, color }: DayTimesCellProps,
  ref
) {
  return (
    <div
      //  ref={ref}
      className={`grid grid-cols-7 ${color}  rounded-r-xl rounded-l-xl p-2 text-lg px-5 text-lightBeige select-none`}
    >
      <h1 className="text-center">{day}</h1>
      {times.map((time) => (
        <h1 key={uuidv4()} className="text-center">
          {time}
        </h1>
      ))}
    </div>
  );
});
export default observer(DayTimesCell);
