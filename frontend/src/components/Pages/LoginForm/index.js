import React, { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  FormGroup,
  Form,
  FormLabel,
  Container,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { Login } from "../../Api/User";

const LoginForm = () => {


  const { register, handleSubmit } = useForm();
  const [loginState, setLoginState] = useState({
    msg: "",
  });

  const setSession = (key, value) => {
    localStorage.clear();
    localStorage.setItem(key, value)
  }

  const setState = (value) => {
    setLoginState((prevState) => {
      return {
        ...prevState,
        msg: value,
      };
    });
  };

  const location = useLocation();
  const history = useHistory();

  const onFormSubmit = (data) => {
    Login(data)
      .then(() => {
        history.push("/dashboard");
        setSession("email", data.email)
        
      })
      .catch((error) => {
        if (error.response) {
          setState(error.response.data.msg);
        }
      });
  };

  const onErrors = (errors) => console.log(errors);

  useEffect(() => {
    if (location.state) {
      setLoginState((prevState) => {
        return {
          ...prevState,
          msg: location.state.msg,
        };
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Container>
        <h2 className="text-center mt-5 fw-bolder">login page</h2>
        <hr />
        {!loginState.msg ? (
          ""
        ) : (
          <Alert variant="success" className="text-center">
            {loginState.msg}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
          <FormGroup>
            <FormLabel>E-mail :</FormLabel>
            <FormControl
              type="email"
              placeholder="e-mail"
              {...register("email", { required: true })}
            ></FormControl>
          </FormGroup>
          <FormGroup className="mt-3">
            <FormLabel>Password :</FormLabel>
            <FormControl
              type="password"
              placeholder="******"
              {...register("password", { required: true })}
            ></FormControl>
          </FormGroup>
          <Button className="btn btn-success w-100 mt-3" type="submit">
            Login
          </Button>
        </Form>
        <p className="text-center mt-2">
          Haven't Registered yet? <Link to="/register">Register Here</Link>
        </p>
      </Container>
    </React.Fragment>
  );
};

export default LoginForm;
