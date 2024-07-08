const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sarthak231203:saagrawal%40980@cluster0.wr1lefw.mongodb.net/");

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Todo = mongoose.model("todos",todoSchema);

module.exports = {
    Todo
}