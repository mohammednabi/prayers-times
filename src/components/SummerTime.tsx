/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

interface SummerTimeProps {
  // Define your props here
}

const SummerTime = ({}: SummerTimeProps) => {
  const { summer } = useContext(StoreContext);

  return (
    <>
      <div className="text-white mt-2">
        <h1 className="text-xs">
          {summer.isSummerTime ? "حسب التوقيت الصيفي" : ""}
        </h1>
      </div>
    </>
  );
};

export default observer(SummerTime);
