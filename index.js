const express = require ("express")
const {registerController , loginController} =  require("./controllers/userController")
const mongoose = require ("mongoose")
const bodyparser = require ("body-parser")
const app = express()


app.use(bodyparser.json())


const Port = 6000
const url = "mongodb://localhost:27017/mr_kitchen"



if(mongoose.connect(url))

{
    console.log(`Database Connected on ${url}`)
}
else {
    console.log("Database Eror ")
}






// route middle ware 



app.get('/' , (req , res )=>{ res.send("hello world ")})

app.post('/register' , registerController )
app.post('/login' , loginController )







// server start 
app.listen(Port, ()=>{ console.log(`server started on port ${Port}`)})