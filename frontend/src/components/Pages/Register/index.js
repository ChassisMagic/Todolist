import React, { useState } from "react";
import {
  FormControl,
  Button,
  FormGroup,
  Form,
  FormLabel,
  Container,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterID } from "../../Api/User";

const Register = () => {
  const history = useHistory();

  const [registerState, setRegisterState] = useState({
    msg: "",
  });

  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (data) => {
    const setMsg = (msg) => setRegisterState((prevState) => {
      return {
        ...prevState,
        msg,
      };
    });

    const { password, confPassword,} = data;
    try {
           if (password !== confPassword) {
        setMsg("Invalid Confirmation Password")
      } else {
        RegisterID(data)
        history.push({
          pathname : '/',
          state : {
            msg: 'Account Registered Successfully'
          } 
        })
      }
    } catch (error) {
      if (error.response) {
        setRegisterState((prevState) => {
          return {
            ...prevState,
            msg: error.response.data.msg,
          };
        });
      }
    }
  };

  const onErrors = (errors) => {
    console.log(errors)    
  };

  return (
    <React.Fragment>
      <Container>
        <h2 className="text-center mt-5 fw-bolder">register page</h2>
        <hr />
        {registerState.msg === "" ? (
          ""
        ) : (
          <Alert variant="warning text-center">{registerState.msg}</Alert>
        )}

        <Form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <FormGroup>
            <FormLabel>Full Name :</FormLabel>
            <FormControl
              type="text"
              placeholder="Insert your full name"
              {...register("name", { required: true })}
            ></FormControl>
          </FormGroup>
          <FormGroup className="mt-3">
            <FormLabel>E-mail :</FormLabel>
            <FormControl
              type="email"
              placeholder="email"
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
          <FormGroup className="mt-3">
            <FormLabel>Confirm Password :</FormLabel>
            <FormControl
              type="password"
              placeholder="******"
              {...register("confPassword", { required: true })}
            ></FormControl>
          </FormGroup>
          <Button className="btn btn-warning w-100 mt-3" type="submit">
            Register Now
          </Button>
        </Form>
        <p className="text-center mt-2">
          Back to <Link to="/">Login</Link> Page.
        </p>
      </Container>
    </React.Fragment>
  );
};

export default Register;
