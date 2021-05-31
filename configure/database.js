const mysql = require("mysql");
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

module.exports = db;
