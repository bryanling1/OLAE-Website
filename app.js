const express = require("express")
const router = require("./routes/riot-api")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3001);