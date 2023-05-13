import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LogIn.css";
import axios from "axios";

interface LoginProps {
  onLogin: () => void;
}

function Login(props: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const loginData = {
    email: email,
    password: password
  };
  axios.post('http://127.0.0.1:5000/login', loginData)
    .then(response => {
      console.log(response);
      if (response.data.success) {
        // handle successful login
        props.onLogin();
      } else {
        setShowError(true);
      }
    })
    .catch(error => {
      console.log(error);
      setShowError(true);
    });
};

  return (
    <>
      <div className="login-container">
        <div className="d-flex vh-100 align-items-center">
          <div className="text-light bg-dark container mt-3 container-opacity">
            <div className="fs-1 mt-3 mb-4 text-center fw-bolder text-decoration-underline">
              Bienvenidos a la pagina del Departamento de Edificios Y Terrenos
            </div>
            <div className="fs-2">Login</div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {showError && (
                <p className="text-danger">Invalid username or password</p>
              )}

              <Button className="mt-3 mb-4" variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;