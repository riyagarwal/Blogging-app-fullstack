import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import FollowerList from "./pages/FollowerList";
import FollowingList from "./pages/FollowingList";
import Users from "./pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/create-blog" element={<CreateBlog />}></Route>
        <Route path="/my-blogs" element={<MyBlogs />}></Route>
        <Route path="/follower-list" element={<FollowerList />}></Route>
        <Route path="/following-list" element={<FollowingList />}></Route>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
