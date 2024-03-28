const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();
const express_port_no = process.env.express_server_port_no;
const databaseConnection = require("./dbConfiguration");
const base_api_endpoint = process.env.base_api_endpoint;
const { signinRouter, signupRouter } = require("./auth-controllers");

databaseConnection();
app.use(express.json());
app.use(base_api_endpoint, signupRouter);
app.use(base_api_endpoint, signinRouter);
app.get("/", (req, res) => {
  res.json({ message: `Application launched successfully` });
});

server.listen(express_port_no, () => {
  console.log(`Application running successfully on port no ${express_port_no}`);
});
