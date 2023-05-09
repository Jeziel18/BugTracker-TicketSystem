import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LogIn.css";

interface LoginProps {
  onLogin: () => void;
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // here you can add your own authentication logic
    if (username === "1" && password === "1") {
      props.onLogin();
    } else {
      setShowError(true);
    }
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
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
