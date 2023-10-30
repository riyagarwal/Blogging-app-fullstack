import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogCard";

function Homepage() {
  const [homeBlogs, setHomeBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        setHomeBlogs(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [token]);

  const divStyle = {
    padding: "30px",
    width: "70%",
    margin: "auto",
  };

  const h1Style = {
    textAlign: "center",
    marginTop: "10px",
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
    <div>
      <Header />
      <div style={divStyle}>
        <h1 style={h1Style}>Blogs For You</h1>
        <hr style={{marginBottom: "30px"}}/>
        {homeBlogs && homeBlogs.length > 0 ? (
          homeBlogs.map((blog) => <BlogCard props={blog} homepage={true} />)
        ) : (
          <h5 style={h4Style}>Follow someone to see their blogs!</h5>
        )}
      </div>
    </div>
  );
}

export default Homepage;
