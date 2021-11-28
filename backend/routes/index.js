const userController = require("../controllers").user;
const todolistController = require("../controllers").todolist;

module.exports = (app) => {
  const url = "/api";
  app.get(url, (req, res) =>
    res.status(200).send({
      massage: "Welcome to the Todolist API!",
    })
  );
  // User
  app.post(`${url}/user/register`, userController.register);
  app.post(`${url}/user/login`, userController.login);

  // TodoList
  app.get(`${url}/list/`, todolistController.getList)
  app.post(`${url}/list/add`, todolistController.createList)
  app.patch(`${url}/list/edit`, todolistController.editList)
  app.delete(`${url}/list/delete/`, todolistController.deleteList)

  
};
