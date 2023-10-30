import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginObj = {
      loginId,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginObj)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          window.location.href = "/home";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
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
    marginBottom: "50px",
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
        <h1 style={h1Style}>Login to Blog App</h1>

        {/* Login ID */}
        <Form.Group className="mb-3" controlId="loginId">
          <Form.Label>Login Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login ID"
            onChange={(e) => setLoginId(e.target.value)}
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
            Login
          </Button>
        </div>
      </Form>

      <div style={{ textAlign: "center" }}>New to BlogChain?{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Sign Up now!
        </a>
      </div>
    </div>
  );
};

export default Login;
