import Card from "react-bootstrap/Card";
import formatDateAndTime from "../../utils/DateTimeUtils";
import axios from "axios";

const BlogCard = ({ props }, setMyBlogs) => {
  const token = localStorage.getItem("token");

  const handleDeleteBlog = (blogId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/blog/deleteBlog/${blogId}`,
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

          // fetching user blogs again after deletion and updating the user blogs state
          // to show updated data to user
          axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/blog/getUserBlogs`, {
              headers: { "X-Acciojob": token },
            })
            .then((res) => {
              setMyBlogs(res.data.data);
              // console.log(myBlogs);
            })
            .catch((err) => alert(err));
        } else {
          // delete unsuccessful
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <Card style={{ width: "100%", marginBottom: "20px" }}>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {formatDateAndTime(new Date(props.creationDateTime))}
          </Card.Text>
        </div>

        <Card.Text>{props.textBody}</Card.Text>
        <Button variant="primary" style={{ marginRight: "20px" }}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDeleteBlog(props._id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
