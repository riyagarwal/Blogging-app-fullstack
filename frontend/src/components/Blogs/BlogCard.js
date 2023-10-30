import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import formatDateAndTime from "../../utils/DateTimeUtils";
import axios from "axios";
import { useState } from "react";

const BlogCard = ({ props, setMyBlogs, myBlogs, homepage }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newTextBody, setNewTextBody] = useState();

  const token = localStorage.getItem("token");

  const handleSubmit = (e, blogId) => {
    e.preventDefault();
    const newBlogObj = {
      blogId,
      title: newTitle,
      textBody: newTextBody,
    };

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, newBlogObj, {
        headers: { "X-Acciojob": token },
      })
      .then((res) => {
        setIsEdit(false); //close the edit input boxes
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDeleteBlog = (blogId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          // delete successful
          alert(res.data.message);

          // updating the user blogs to fetch updated blogs after deletion
          const myBlogsNew = myBlogs.filter((blog) => blog._id !== blogId);
          setMyBlogs(myBlogsNew);
        } else {
          // delete unsuccessful
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err));
  };

  const cardStyle = {
    width: "80%",
    marginBottom: "10px",
    margin: "auto",
    padding: "15px",
    backgroundColor: "#242422",
    color: "white",
    border: "1px solid grey",
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {formatDateAndTime(new Date(props.creationDateTime))}
          </Card.Text>
        </div>

        <Card.Text>{props.textBody}</Card.Text>
        {homepage ? (
          <></>
        ) : (
          <>
            <Button
              variant="primary"
              style={{ marginRight: "20px" }}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteBlog(props._id)}
            >
              Delete
            </Button>
          </>
        )}

        {/* edit blog */}
        {isEdit ? (
          <>
            <Form onSubmit={(e) => handleSubmit(e, props._id)}>
              <h2 style={{ margin: "40px 0 -40px 0", textAlign: "center" }}>Edit Blog</h2>

              {/* Blog title */}
              <Form.Group className="mb-3 mt-5" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>

              {/* Blog body */}
              <Form.Group className="mb-3" controlId="blogBody">
                <Form.Label>Blog Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Type your Blog here!"
                  onChange={(e) => setNewTextBody(e.target.value)}
                />
              </Form.Group>

              {/* Button */}
              <Button type="submit" style={{ marginTop: "20px" }}>
                Edit Blog
              </Button>
            </Form>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
