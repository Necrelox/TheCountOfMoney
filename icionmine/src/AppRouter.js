import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={< Home />} />
            <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default AppRouter;
