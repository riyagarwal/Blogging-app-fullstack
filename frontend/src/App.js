import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "../src/pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/createBlog" element={<CreateBlog />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
