const express = require("express")
const mongoose = require("mongoose") 
const routes = require("./routes/routes") 
    
mongoose

.connect("mongodb+srv://izanyibukayvette:j3kpwvKDtkNQGwRp@cluster0.b83eeem.mongodb.net/")
.then(() => {
    const app = express()
    app.use(express.json()) 
    app.use("/api", routes)

    app.listen(5000, () => {
        console.log("Server has started!")
    })
})