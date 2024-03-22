import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { IoGrid } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

import { FaMosque } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar = () => {
  const [value, setValue] = React.useState(0);

  const { pathname } = useLocation();

  const navigateTo = useNavigate();

  React.useEffect(() => {
    pathname === "/"
      ? setValue(0)
      : pathname === "/more" || pathname === "/tasbih"
      ? setValue(1)
      : pathname === "/pray"
      ? setValue(2)
      : value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full fixed bottom-0 text-xl">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          newValue === 0
            ? navigateTo("/")
            : newValue === 1
            ? navigateTo("/more")
            : navigateTo("/pray");
        }}
        classes={{
          // root: "bg-beige text-lightBrown",
          root: "bg-darkGreen text-lightBrown ",
        }}
      >
        <BottomNavigationAction
          label="الرئيسية"
          icon={<AiFillHome />}
          classes={{
            selected: " text-lightGreen",
            root: "text-beige",
            label: "text-lg font-cairo",
          }}
        />
        <BottomNavigationAction
          label="المزيد"
          icon={<IoGrid />}
          classes={{
            selected: "text-lightGreen",
            root: "text-beige",
            label: "text-lg font-cairo",
          }}
        />
        <BottomNavigationAction
          label="الصلاة"
          icon={<FaMosque />}
          classes={{
            selected: "text-lightGreen",
            root: "text-beige",
            label: "text-lg font-cairo",
          }}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomBar;
