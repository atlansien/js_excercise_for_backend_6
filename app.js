const express = require("express");
const router = require("./router");

const app = express();
const PORT = 3001;

app.use('/', router);
app.listen(PORT, () => {
    console.log(`Example app listenng on port ${PORT}`);
});