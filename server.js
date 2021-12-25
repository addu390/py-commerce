const express = require("express");
var cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });

require("./config/db-connection");
const useRouter = require("./routes/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', useRouter);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV == "production") {
    res.redirect(`https://${req.header('host')}${req.url}`)
  }
  next();
});


if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log('Listening on port: ', port);
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});
