import React, { useContext } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useHistory(); // es una pila

  function signUpUser(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let email = data.get("email");
    let password = data.get("password");
    let confirm = data.get("confirm");
    let check = data.get("check");

    if (password !== confirm) {
      console.error("Check your password confirmation :)");
      return;
    }
    if (!check) {
      console.error("You must accept the terms!");
      return;
    }
    actions
      .signUp(email, password)
      .then((resp) => {
        if (resp.code == 201) {
          navigate.push("/login");
        } else {
          console.log("Something wrong please try again ", resp);
        }
      })
      .catch((error) => {
        console.log("Error in your signup: ", error);
      });
  }

  return (
    <Container>
      <Row>
        <h1>Create your account</h1>
        <Form onSubmit={signUpUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              name="confirm"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Accept terms of use"
              required
              name="check"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
