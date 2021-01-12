const express = require("express");
const cors = require("cors");
const articleRouter = require("./src/routes/articleRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const server = express();
dotenv.config();

const port = process.env.PORT || 3001;
const mongodbUri = process.env.MONGODB_URI;

mongoose
	.connect(mongodbUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log("DB Connection Error! ", err));

//SETTING UP MIDDLEWARES
server.use(cors());
server.use(express.json());

//ROUTES
server.use("/articles", articleRouter);

server.listen(port, () => {
	if (server.get("env") === "production") {
		console.log("Server is running on CLOUD on port:", port);
	} else {
		console.log("Server is running on LOCALLY on port:", port);
	}
});
