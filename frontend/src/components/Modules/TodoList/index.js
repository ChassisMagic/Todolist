import React  from "react";
import { Container, Table, Alert } from "react-bootstrap";
import TodolistTable from "../TodoListTable";

const TodoList = (props) => {

  return (
    <Container className="mt-3">
      {!props.msg ? "" : <Alert variant="success">{props.msg}</Alert>}
      <h2 className="m-4 text-center fw-bold">Todo List</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th className="col-1">No.</th>
            <th className="col-4">Title</th>
            <th className="col-4">Activity</th>
            <th className="col-1">Complete</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {!props.data
            ? ""
            : props.data.map((data, index) => {
              const value = {
                postID : data.id,
                title : data.title,
                activity : data.activity,
                complete: data.complete
              }
                return (
                  <TodolistTable
                    key={index}
                    num={index + 1}
                    value={value}
                    editFunction={props.editFunction}
                    deleteFunction={props.deleteFunction}
                  />
                );
              })}
        </tbody>
      </Table>
    </Container>
  );
};

export default TodoList;
