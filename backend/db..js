const mongoose = require("mongoose");

mongoose.connect("YOUR OWN MONGODB URL");

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Todo = mongoose.model("todos",todoSchema);

module.exports = {
    Todo
}
