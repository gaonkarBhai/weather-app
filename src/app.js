// 3/12/2022

// requireing the express
const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000

// serving the public folder
app.use(express.static(path.join(__dirname, "../public")))

// routing
app.get("", (req, res) => {
    res.render("index")
})

// listing at the port
app.listen(port, () => {
    console.log("server started...")
})