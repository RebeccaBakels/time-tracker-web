import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Button, Row } from "react-bootstrap";
import firebase from "firebase";
import { UserContext } from "../App";

const Signup = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onFinish = () => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("got back", res.user);
        setUser(res.user);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
        console.log(res.user);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    onFinish();
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <br />
      <br />
      <Form.Group as={Row} controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button
            ghost
            type="primary"
            loading={loading}
            onClick={() => loginWithGoogle()}
          >
            Sign Up with Google
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Signup;
