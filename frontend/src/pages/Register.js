import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const h1Style = {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  };

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
        alert(err);
      });
  };
  return (
    <div style={{ padding: "5rem" }}>
      <Form onSubmit={handleSubmit}>
        <h1 style={h1Style}>Register into Blog App</h1>

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
        <Button type="submit" style={{ marginTop: "20px" }}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
