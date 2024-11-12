require('dotenv').config();

const express = require('express');
const appRoutes = require('./routes/itemsRoute')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();
const PORT = 5000
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/tododb")
.then(() => console.log("Connectd to MongoDB"))
.catch(err => console.error('could not connect to MongoDb:', err))
app.use('/api/items', appRoutes)

app.get("/", (req, res) =>{
    res.send("Server running...")
    console.log("Server running...")
})

app.listen(PORT, () =>{
    console.log(`server is running on http:localhost:${PORT}`)
});