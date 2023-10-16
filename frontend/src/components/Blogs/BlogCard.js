import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const BlogCard = ({ props }) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.textBody}</Card.Text>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
