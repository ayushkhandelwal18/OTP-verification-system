const express = require('express')
const cors = require('cors');


const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000


app.use(express.json())


//calling Database function
require('./config/database').connect()

app.use(cors({
  origin: 'http://localhost:5173',  // React dev server port
  credentials: true
}));


//route importing and mounting
const user = require('./routes/user')

app.use('/api/v1', user)


app.listen(PORT, ()=>{
    console.log("Server Started")
   
})