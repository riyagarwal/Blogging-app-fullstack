import axios from "axios";

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

function UserCard({ props }) {
  const token = localStorage.getItem("token");

  const handleFollow = (userId) => {
    const followObj = { followingUserId: userId };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,
        followObj,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        alert("Successfully followed!");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleUnfollow = (userId) => {
    const followObj = { followingUserId: userId };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
        followObj,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        alert("Successfully unfollowed!");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const cardStyle = {
    width: "20%",
    marginBottom: "20px",
    margin: "10px",
    padding: "5px",
    backgroundColor: "#242422",
    color: "white",
    border: "1px solid grey",
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.username}</Card.Text>
        <Card.Text>{props.email}</Card.Text>
        {props.follow ? (
          <>
            <Button variant="danger" onClick={() => handleUnfollow(props._id)}>
              Unfollow
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => handleFollow(props._id)}>
              Follow
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
