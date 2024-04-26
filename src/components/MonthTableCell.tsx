/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { StoreContext } from "../contexts/StoreContext";
import { observer } from "mobx-react-lite";

interface MonthTableCellProps {
  // Define your props here
}

const MonthTableCell = ({}: MonthTableCellProps) => {
  const { months } = useContext(StoreContext);

  useEffect(() => {
    months.getCurrentMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between items-center bg-darkGreen rounded-r-full rounded-l-full p-2 text-2xl px-10 text-white select-none">
      <FaArrowAltCircleRight
        className=" cursor-pointer"
        onClick={months.getPreviousMonth}
      />
      <h1 className="">{months.CurrentMonth}</h1>
      <FaArrowAltCircleRight
        className="rotate-180 cursor-pointer"
        onClick={months.getNextMonth}
      />
    </div>
  );
};

export default observer(MonthTableCell);
