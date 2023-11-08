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
      })
      .catch((err) => alert(err.response.data.message));
  }, [token]);

  const divStyle = {
    padding: "30px",
    width: "70%",
    margin: "auto",
  };

  const h1Style = {
    textAlign: "center",
    marginTop: "20px",
    letterSpacing: "1.5px",
  };

  const h4Style = {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "0px",
    letterSpacing: "0.5px",
    fontWeight: "400",
  };

  return (
    <>
      <Header />
      <div style={divStyle}>
        <h1 style={h1Style}>My Blogs</h1>
        <hr style={{ marginBottom: "30px" }} />
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((blog, key) => (
            <BlogCard
              key={key}
              props={blog}
              setMyBlogs={setMyBlogs}
              myBlogs={myBlogs}
            />
          ))
        ) : (
          <h5 style={h4Style}>
            We can't wait to see your first blog on BlogChain!
          </h5>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
