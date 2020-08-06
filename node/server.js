console.log("Welcome to NodeJs in Angular7");
// Backend
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

require("./db");
const TodosModel = require("./todos_schema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Allow client ti access cross domain or ip-address
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "content-type,x-access-token");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.end("Welcome to root path");
});

app.post("/todos", (req, res) => {
  const todo = req.body.todo;
  const completed = false;

  TodosModel.create(req.body, (err, doc) => {
    if (err) res.json({ result: "failed", todo: todo, completed: completed });

    res
      .status(201)
      .json({ result: "success", todo: todo, completed: completed });
  });
});

app.get("/todos", (req, res) => {
  TodosModel.find((err, doc) => {
    if (err) res.json({ result: "failed" });
    res.json({ result: "success", data: doc });
  });
});

app.get("/todos/:id", (req, res) => {
  TodosModel.findById(req.params.id, (err, doc) => {
    res.status(200).json({ result: "success", data: doc });
  });
});

app.patch("/todos/:id", (req, res) => {
  // const todo = req.body.todo;
  const completed = req.body.completed;
  TodosModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        // todo: req.body.todo,
        completed: req.body.completed,
      },
    },
    {
      upsert: true,
    }
  )
    .then((result) => {
      res.status(200).json({
        result: "edit success",
        // data: { todo: todo, completed: completed },
      });
    })
    .catch((error) => console.error(error));
});

app.delete("/todos/:id", (req, res) => {
  TodosModel.remove({ _id: req.params.id })
    .then((result) => {
      /* ... */
      console.log(result.deletedCount);
      if (result.deletedCount == 0) {
        res.json({ result: "faild" });
      } else {
        res.status(200).json({
          result: "deleted success",
        });
      }
    })
    .catch((error) => console.error(error));
});

app.listen(3000, () => {
  console.log("Server is running...");
});
