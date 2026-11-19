import express from "express"
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json())

app.use(morgan("tiny"))

app.use((req, res, next) => {
    // console.log(req);
    
    console.log("mera pehla middleware -->")
    next()
})

app.use((req, res, next) => {
    // console.log(req);
    // req.requestTime = new Date();
    console.log("My second middleware")
    next()
})

// data Array

let users = [
    {
        username : "Arham",
        email : "arham@gmail.com"
    },
    {
        username : "abdullah",
        email : "abdullah@gmail.com"
    },
];

// Create

app.post("/users" , (req,res) => {

    const data = req.body;

    if (data) {
        users.push(data)
    }

    if(!data){
        return res.status(400).json({
            status: "false",
            message: "some error in data sending"
        })
    }

    res.status(200).json({
        status: "true",
        message: "Users added successfully"
    })
})

// read

app.get("/users", (req, res) => {
    res.status(200).json({
        status: "true",
        data: users
    })
})



// get Individual user

app.get("/user/:username", (req, res) => {
    
    const {username} = req.params;

    // console.log(param);

    let findUser = users.find((user) => {
        if(user.username == username){
            return user
        }
        
    })
    

    res.status(200).json({
        status : "true",
        message: "Individual user data",
        data : findUser
    })
})



// update user
app.put("/user/:username", (req, res) => {

    const body = req.body;
    const {username} = req.params;

   users = users.map((user) => {
    if(user.username == body.username){
        return user = body
    }

    return user
})

    res.status(200).json({
        status : "true",
        message:"user updated successfully!"
    })
})

// delete user

app.delete("/user/:username", (req, res) => {

    const {username} = req.params;

   users = users.filter((user) => user.username != username)

    res.status(200).json({
        status : "true",
        message:"user deleted successfully!"
    })
})


app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
    
})