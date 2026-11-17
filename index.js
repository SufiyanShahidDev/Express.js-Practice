import express from "express"

const app = express();

app.use(express.json())

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


app.listen(5500, () => {
    console.log("Server is listening on port: 5500");
    
})