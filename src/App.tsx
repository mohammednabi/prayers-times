/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import MainLayout from "./pages/MainLayout";
import { Suspense, useContext, useEffect } from "react";

import Loading from "./components/Loading";
import StoreContextProvider from "./components/StoreContextProvider";
import MorePage from "./pages/MorePage";
import PrayPage from "./pages/PrayPage";
import Tasbih from "./pages/Tasbih";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import DoaaKhatm from "./pages/DoaaKhatm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseAuth";
import { StoreContext } from "./contexts/StoreContext";
import { observer } from "mobx-react-lite";

const App = () => {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  const { months, summer, prayers } = useContext(StoreContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log({ user });
      if (user && pathname === "/admin") {
        navigateTo("/admin/dashboard");
      }
      if (!user && pathname === "/admin/dashboard") {
        navigateTo("/admin");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    months.getAllMonthsData();
    summer.getTheSummerTime();
  }, []);

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

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <StoreContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="more" element={<MorePage />}></Route>
              <Route path="pray" element={<PrayPage />} />
              <Route path="tasbih" element={<Tasbih />} />
              <Route path="khatm" element={<DoaaKhatm />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </StoreContextProvider>
      </div>
    </Suspense>
  );
};

export default observer(App);
