const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const models = require('./models');
const port = parseInt(5000);

app.set('port', port)

models.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Connected on Port : ", port)
    })
})

require('./routes')(app);

app.get('*', (req,res) => res.status(200).send({
    message: "welcome to the beginning of nothingness."
}))

module.exports = app;