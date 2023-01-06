import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Graph from "./views/Graph";
import Login from "./views/Login";
import SignIn from "./views/SignIn";
import Logout from "./views/Logout";
import Preferences from "./views/Preferences";

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/graphs" element={< Graph />} />
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< SignIn />} />
            <Route path="/logout" element={< Logout />} />
            {localStorage.getItem('userRole') == "user" || localStorage.getItem('userRole') == "admin" 
            ? <Route path="/preferences" element={< Preferences />} /> 
            : null}
            
        </Routes>
      </BrowserRouter>
  );
}

export default AppRouter;
