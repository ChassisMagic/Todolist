import React, { useState, useEffect } from "react";
import TodoList from "../../Modules/TodoList";
import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import InputForm from "../InputForm";
import { getList, editList, saveList, deleteList } from "../../Api/List";
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [count, setCount] = React.useState(1);
  const [refresh, setRefresh] = React.useState(1);

  const [dashboardState, setDashboardState] = useState({
    data: [],
    form: {
      msg: "",
      editMode: false,
      postID: "",
      title: "",
      activity: "",
      complete: false,
    },
  });

  const onFormSubmit = (data) => {
    const { title, activity, complete } = data;
    if (dashboardState.form.editMode) {
      editList(dashboardState.form.postID, title, activity, complete)
        .then(() => {
          cancelForm("Edit Successfully");
          const findIndex = dashboardState.data.findIndex(
            (data) => data.id === dashboardState.form.postID
          );
          const filterData = dashboardState.data.filter(
            (data) => data.id === dashboardState.form.postID
          );
          const newValue = {
            ...filterData[0],
            title,
            activity: activity,
            complete,
          };
          dashboardState.data.splice(findIndex, 1, newValue);
          setCount(count + 1); //force re-render
          console.log(dashboardState.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const lastIndex =
        dashboardState.data.length === 0 ? 0 : dashboardState.data.length;
      const postIDval = lastIndex === 0 ? 1 : dashboardState.data[0].id + 1;
      saveList(title, activity, complete)
        .then(() => {
          cancelForm("Add Successfully");
          setDashboardState((prevState) => {
            return {
              ...prevState,
              data: [
                ...prevState.data,
                { id: postIDval, title, activity: activity, complete },
              ],
            };
          });
        })
        .catch((error) => console.log(error));
    }
  };

  const editFunction = (value, editMode) => {
    const { title, postID, activity, complete } = value;
    setDashboardState((prevState) => {
      return {
        ...prevState,
        form: {
          editMode,
          title,
          postID,
          activity,
          complete,
        },
      };
    });
  };

  const cancelForm = (msg) => {
    setDashboardState((prevState) => {
      return {
        ...prevState,
        form: {
          msg,
          editMode: false,
          title: "",
          postID: "",
          activity: "",
          complete: false,
        },
      };
    });
  };

  const deleteFunction = (value) => {
    if (dashboardState.data.length === 1) {
      cancelForm("Not Allowed : Only 1 remains");
    } else {
      deleteList(value.postID)
        .then(() => {
          cancelForm("Delete Successfully");
          setDashboardState((prevState) => {
            return {
              ...prevState,
              data: prevState.data.filter((data) => data.id !== value.postID),
            };
          });
          setCount(count + 1);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      console.log("tidak ada");
      history.push({
        pathname : "/",
        state : {
          msg: "Illegal Access"
        }
      })
    } else {
      getList()
      .then((response) => {
        if (response) {
          setDashboardState((prevState) => {
            return {
              ...prevState,
              data: response.data,
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refresh === 0) {
      setRefresh(1);
    }
  }, [refresh]);

  useEffect(() => {
    setRefresh(0);
  }, [count]);

  return (
    <>
      <Navigation />
      <InputForm
        form={dashboardState.form}
        cancelFunction={cancelForm}
        onFormSubmit={onFormSubmit}
      />
      <TodoList
        data={dashboardState.data}
        msg={dashboardState.msg}
        editFunction={editFunction}
        deleteFunction={deleteFunction}
      />
      <Footer />
    </>
  );
};

export default Dashboard;
