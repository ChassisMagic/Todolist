import axios from "axios";

export const getList = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/list");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveList = async (title, activity, complete) => {
  try {
    const response = await axios.post("http://localhost:5000/api/list/add", {
      title,
      activity,
      complete,
    });
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
};

export const editList = async (postID, title, activity, complete) => {
  try {
    const response = await axios.patch("http://localhost:5000/api/list/edit", {
      title,
      activity,
      complete,
      postID,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (postID) => {
  try {
    console.log(postID);
    const response = await axios.delete(`http://localhost:5000/api/list/delete/`, {
      data : {
        postID
      }
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
