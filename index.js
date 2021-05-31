const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./secure.env" });

//  create mysql connection
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DATABASE_PORT,
});

// connect
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("mysql connected");
});

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
