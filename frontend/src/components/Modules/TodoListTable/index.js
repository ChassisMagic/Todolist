import React from "react";
import { Button } from "react-bootstrap";

const TodoListTable = (props) => {

  const { value, editFunction, deleteFunction } = props

  return (
    <tr>
      <td className="text-center p-2">
        {props.num}
      </td>
      <td className="p-2">{value.title}</td>
      <td className="p-2">{value.activity}</td>
      <td className="p-2">{value.complete === "false"  ? "Not Completed" : "Completed"}</td>
      <td className="text-center p-2">
        <Button
          className="btn btn-warning btn-sm mx-2"
          onClick={() => editFunction(value, true)}
        >
          Edit
        </Button>
        <Button
          className="btn btn-danger btn-sm mx-2"
          onClick={() => deleteFunction(value)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TodoListTable;
