import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/my-blogs" element={<MyBlogs />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
