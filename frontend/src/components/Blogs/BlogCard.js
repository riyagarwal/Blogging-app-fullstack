import Card from "react-bootstrap/Card";
import formatDateAndTime from "../../utils/DateTimeUtils";

const BlogCard = ({ props }) => {
    

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
        <Button variant="danger" onClick = {() => handleDeleteBlog(props._id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
