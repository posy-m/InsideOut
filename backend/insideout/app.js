const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("할 수 있어 !")
})

app.listen(PORT, () => {
    console.log("서버 대기")
})