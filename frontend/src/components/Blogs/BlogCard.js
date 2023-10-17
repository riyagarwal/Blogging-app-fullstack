import Card from "react-bootstrap/Card";
import formatDateAndTime from "../../utils/DateTimeUtils";
import axios from "axios";

const BlogCard = ({ props, setMyBlogs, myBlogs }) => {
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
