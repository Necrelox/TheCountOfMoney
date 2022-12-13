import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Graph from "./views/Graph";

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/graphs" element={< Graph />} />
        </Routes>
      </BrowserRouter>
  );
}

export default React.memo(AppRouter);
