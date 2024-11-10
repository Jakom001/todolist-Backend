require('dotenv').config();

const express = require('express');
const appRoutes = require('./routes/itemsRoute')
const mongoose = require('mongoose')

const app = express();
const PORT = 3000
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/tododb")
.then(() => console.log("Connectd to MongoDB"))
.catch(err => console.error('could not connect to MongoDb:', err))
app.use('/api/items', appRoutes)

app.listen(PORT, () =>{
    console.log(`server is running on http:localhost:${PORT}`)
});