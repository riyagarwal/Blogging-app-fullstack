import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import Header from "../components/common/Header";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState();

  const token = localStorage.getItem("token");

  // fetching my blogs on page load
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`, {
        headers: { "X-Acciojob": token },
      })
      .then((res) => {
        setMyBlogs(res.data.data);
        // console.log(myBlogs);
      })
      .catch((err) => alert(err));
  }, [token]);

  return (
    <>
    <Header />
    <div style={{ padding: "3rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>My Blogs</h1>
      {myBlogs?.map((blog, key) => (
        <BlogCard key={key} props={blog} setMyBlogs={setMyBlogs} myBlogs = {myBlogs} />
      ))}
    </div>
    </>
  );
};

export default MyBlogs;
