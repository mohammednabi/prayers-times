import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative w-screen h-screen  overflow-x-hidden  max-h-screen overflow-y-scroll font-cairo">
      <Outlet />
      <div id="overlay" className="w-full h-full absolute top-0 left-0 -z-10" />
      <BottomBar />
    </div>
  );
};

export default MainLayout;
