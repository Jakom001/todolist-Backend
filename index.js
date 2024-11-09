const express = require('express');
const app = express();
const PORT = 3000

const appRoutes = require('./routes/itemsRoute')

app.use(express.json())
app.use('/api/items', appRoutes)


app.listen(PORT, () =>{
    console.log(`server is running on http:localhost:${PORT}`)
});