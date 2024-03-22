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

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <StoreContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="more" element={<MorePage />} />
              <Route path="pray" element={<PrayPage />} />
            </Route>
          </Routes>
        </StoreContextProvider>
      </div>
    </Suspense>
  );
};

export default App;
