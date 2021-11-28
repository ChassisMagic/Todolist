const User = require("../models").User;
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async register(req, res) {
    const error = (msg) => res.status(400).json({ msg });
    const { email, password, confPassword, name } = req.body;
    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      return error("Email is registered");
    }

    if (!email || !password || !confPassword || !name) {
      return error("Nama or Email or password are empty.");
    }

    if (password !== confPassword) {
      return error("Check your password again.");
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      return User.create({
        email,
        password: hash,
        name
      })
        .then((user) =>
          res.status(201).json({
            msg: "Success",
            data: {
              email: user.email,
              name: user.name
            },
          })
        )
        .catch((error) =>
          res.status(400).json({
            msg: "Failed to register, please try again.",
            error,
          })
        );
    });
  },
  async login(req, res) {
    const error = (msg) => res.status(400).json({ msg });
    const { email, password } = req.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (!userExist) {
      return error("Account is not registered. Please register.");
    }

    const match = await bcrypt.compare(password, userExist.password);

    if (!match) {
      return error("Wrong Password");
    } else {
      return res.status(200).json({
        msg: "Password Accepted",
      });
    }
  },
};
