const express = require ("express")
const {registerController , loginController} =  require("./controllers/userController")
const authHandler = require ('./middleware/auth')
const mongoose = require ("mongoose")
const cors = require('cors')
const bodyparser = require ("body-parser")
const app = express()


app.use(bodyparser.json())
app.use(cors())


const Port = 4000
const url = "mongodb://localhost:27017/mr_kitchen"



if(mongoose.connect(url))

{
    console.log(`Database Connected on ${url}`)
}
else {
    console.log("Database Eror ")
}






// route middle ware 



app.get('/' , (req , res )=>{   
    
    
    
    
    res.json({message : "hello world "})}
    
    )

app.post('/user/register' , registerController )
app.post('/user/login' , loginController )
app.get ('/user/homepage' , authHandler)







// server start 
app.listen(Port, ()=>{ console.log(`server started on port ${Port}`)})