import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  const handleSubmit = (e) => {
    // page should not reload upon clicking submit button
    e.preventDefault();

    const userObj = {
      name,
      username,
      email,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, userObj)
      .then((res) => {
        if (res.data.status === 201) {
          window.location.href = "/login";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const mainDivStyle = {
    width: "40%",
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid grey",
    padding: "50px 50px 30px 50px",
    borderRadius: "10px",
  };

  const h1Style = {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  };

  const btnStyle = {
    width: "30%",
    margin: "25px 0",
  };

  return (
    <div style={mainDivStyle}>
      <Form onSubmit={handleSubmit}>
        <h1 style={h1Style}>BlogChain Sign Up</h1>

        {/* Username */}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        {/* Name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Button */}
        <div style={{ textAlign: "center" }}>
          <Button type="submit" style={btnStyle}>
            Register
          </Button>
        </div>
      </Form>

      <div style={{ textAlign: "center" }}>Already a user?{" "}
        <a href="/login" style={{ textDecoration: "none" }}>
          Login instead
        </a>
      </div>
    </div>
  );
};

export default Register;
