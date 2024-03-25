/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import MainLayout from "./pages/MainLayout";
import { Suspense } from "react";

import Loading from "./components/Loading";
import StoreContextProvider from "./components/StoreContextProvider";
import MorePage from "./pages/MorePage";
import PrayPage from "./pages/PrayPage";
import Tasbih from "./pages/Tasbih";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import DoaaKhatm from "./pages/DoaaKhatm";

const App = () => {
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

export default App;
