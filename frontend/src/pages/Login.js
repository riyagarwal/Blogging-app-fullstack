import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
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

  const h1Style = {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={{ padding: "5rem" }}>
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
        <Button type="submit" style={{ marginTop: "20px" }}>Login</Button>
      </Form>
    </div>
  );
};

export default Login;
