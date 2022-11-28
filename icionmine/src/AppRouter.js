import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";

function AppRouter() {
  return (
      <BrowserRouter>
        <div>
            <Routes>
                <Route path="/home" element={< Home />} />
                <Route render={() => <h1>Not found!</h1>} />
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default AppRouter;
