const express = require('express')
// call my controller
const funcRoutes = require('./routes/FuncionarioRoutes')

const app = express()

const port = 3000

app.use(express.json())

// routes
app.use('/api',funcRoutes)

app.listen(port,()=>{
    console.log("Server running at port " + port)
})

