import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useState } from "react";
import Header from "../components/common/Header";

import "./createBlog.css"

const CreateBlog = () => {
  const [title, setTitle] = useState();
  const [textBody, setTextBody] = useState();

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      textBody,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          window.location.href = "/my-blogs";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const h1Style = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  return (
    <>
      <Header />
      <div style={{ width: "70%", margin: "auto" }}>
        <Form onSubmit={handleSubmit}>
          <h1 style={h1Style}>Create a Blog</h1>
          <hr />
          {/* Blog title */}
          <Form.Group className="mb-3 mt-5" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </Form.Group>

          {/* Blog body */}
          <Form.Group className="mb-3" controlId="blogBody">
            <Form.Label>Blog Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Type your Blog here!"
              onChange={(e) => setTextBody(e.target.value)}
              className="input"
            />
          </Form.Group>

          {/* Button */}
          <Button type="submit" style={{ marginTop: "20px" }}>
            Create Blog
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateBlog;
