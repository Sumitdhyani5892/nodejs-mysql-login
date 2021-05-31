const express = require("express");
const path = require("path");
const database = require("./configure/database");

const app = express();

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const defaultPORT = process.env.NODEJS_PORT;

app.listen(defaultPORT, () => {
	console.log(`server started running on port ${defaultPORT}`);
});
