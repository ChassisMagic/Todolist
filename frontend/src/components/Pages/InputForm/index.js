import React, { useEffect } from "react";
import {
  Container,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

const InputForm = (props) => {
  const { form } = props;
  const { register, handleSubmit, setValue } = useForm();
  const onErrors = (error) => console.log(error);

  useEffect(() => {
    setValue("title", form.title);
    setValue("activity", form.activity);
    setValue("complete", form.complete);
  });

  return (
    <Container className="mt-2">
      <h2 className="text-center fw-bold ">Add Todo List</h2>
      {!form.msg ? (
        ""
      ) : (
        <Alert variant="success" className="text-center">
          {form.msg}
        </Alert>
      )}
      <Form onSubmit={handleSubmit(props.onFormSubmit, onErrors)}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            type="input"
            placeholder="Insert title"
            {...register("title", { required: true })}
          ></FormControl>
        </FormGroup>
        <FormGroup className="mt-2">
          <FormLabel>Activity</FormLabel>
          <FormControl
            type="input"
            placeholder="Insert Activity"
            {...register("activity", { required: true })}
          ></FormControl>
        </FormGroup>
        <FormGroup className="mt-2">
          <FormLabel>Complete</FormLabel>
          <FormControl
            as="select"
            placeholder="Insert title"
            // defaultValue="false"
            {...register("complete", { required: true })}
          >
            <option value="false">Not Complete</option>
            <option value="true">Completed</option>
          </FormControl>
        </FormGroup>
        {form.editMode === true ? (
          <>
            <Button className="btn btn-warning mt-3 p-3" type="submit">
              Edit
            </Button>
            &nbsp;
            <Button
              className="btn btn-danger mt-3 p-3"
              onClick={() => {
                props.cancelFunction();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button className="btn btn-primary mt-3 p-3" type="submit">
            Save
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default InputForm;
