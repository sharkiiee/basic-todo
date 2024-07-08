const express = require("express");
const cors = require("cors");
const app = express();

// Object destructuring
const {createTodo} = require("./types");
const {updateTodo} = require("./types");
const { Todo } = require("./db.");


// Making sure all the post endpoint will work
app.use(express.json());

// This will allow your backend to connect to the particular frontend silently.
app.use(cors({
    origin:"http://localhost:5173"
}));

// app.use(cors()) --> This allow any frontend to connect to your backend.

//post endpoint to post all the todos
app.post("/todo",async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        return res.status(411).json({
            message: "something is wrong with the inputs"
        })
    }

    await Todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })
    res.json({
        message: "todo is been added"
    })
})

//GET - To get all the todos.
app.get("/todos",async function(req,res){
    const todos =await Todo.find({});

    res.json({
        todos
    })

})

//PUT - Mark complete when todo is been completed.
app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            message: "id is incorrect"
        })
        return;
    }
    
    await Todo.updateOne({
        _id:req.body.id
    },{
        completed:true
    });

    res.json({
        message: "todo is been updated"
    })
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})