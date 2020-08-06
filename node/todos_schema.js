var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(
  "mongodb://127.0.0.1/todosDatabase"
);
autoIncrement.initialize(connection);

var TodosSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
});

TodosSchema.plugin(autoIncrement.plugin, {
  model: "todos",
  startAt: 1,
  incrementBy: 1,
});

var TodosModel = mongoose.model("todos", TodosSchema);
module.exports = TodosModel;
