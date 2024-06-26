const express = require('express')
const app = express();

const mainRouter = require('')

app.use(express.json())
app.use('/api/v1',mainRouter)

app.listen(3000,() => {
    console.log('Server Running')
})