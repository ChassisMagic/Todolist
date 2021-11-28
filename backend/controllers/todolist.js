const Todolist = require("../models").Todolist;

module.exports = {
  async getList(req, res) {
    const getList = Todolist.findAll();

    await getList
      .then((response) => {
        return res.status(200).json({
          msg: "Success",
          data: response,
        });
      })
      .catch((error) => {
        return error("Problem while fetching data");
      });
  },
  async createList(req, res) {
    const error = (msg) => res.status(400).json(msg);
    const { title, activity, complete } = req.body;

    if (!title || !complete) {
      return error("Title or Complete is empty");
    }

    const createList = Todolist.create({
      title,
      activity,
      complete,
    });

    await createList
      .then((response) => {
        return res.status(201).json({
          msg: "List add successfully",
          data: response,
        });
      })
      .catch((error) => {
        return error(error);
      });
  },
  async editList(req, res) {
    const errorMsg = (msg) => res.status(400).json({ msg });
    const { postID, title, activity, complete } = req.body;

    const editList = Todolist.update(
      {
        title,
        activity,
        complete,
      },
      {
        where: {
          id: postID,
        },
      }
    );

    if (!title || !complete) {
      return errorMsg("Title or Complete is empty");
    }

    await editList.then((response) => {
      if (!response[0]) {
        return errorMsg("Post doesn't exist");
      } else {
        return res.status(200).json({
          msg: "Edit successfully",
          data: {
            id: postID,
            title,
            activity,
            complete,
          },
        });
      }
    });
  },
  async deleteList(req,res) {
    const errorMsg = (msg) => res.status(400).json({msg})
    const {postID} = req.body;

    const deleteList = Todolist.destroy({
      where: {
        id: postID,
      },
    });

    await deleteList
      .then((response) => {
        if (!response) {
          return errorMsg("Post doesn't exist");
        } else {
          return res.status(200).json({
            msg: "Post deleted Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
