//External Imports ......
const express = require("express");
const { success, error } = require("console");
const dotenv = require("dotenv");
const http = require("http");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
// Internal Imports ....
const connectDB = require("./db");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

//Strategy
const userStrategy = require("./strategy/user.strategy");

// Routes Data import ....
const faq = require("./routes/faqRoute");
const home = require("./routes/homeRoute");
const auth = require("./routes/loginRoute");
const users = require("./routes/usersRoute");
const category = require("./routes/categoryRoute");
const quiz = require("./routes/quizRoute");
const slider = require("./routes/sliderRoute");
const tags = require("./routes/tagsRoute");
const alldata = require("./routes/dashboardRoute");
const questions = require("./routes/questionsRoute");
const study = require("./routes/studyRoute");
const recall = require("./routes/recallRoute");
const result = require("./routes/resultRoute");
const subscription = require("./routes/subscriptionRoute");
const controlpanel = require("./routes/controlPanelRoute");
const forgotpassword = require("./routes/forgot_password_Route");
const contactUs = require("./routes/contactUsRoute")

//config .......
const app = express();
const corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));
dotenv.config();
const server = http.createServer(app);

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// Routing Setup .........
app.use("/", home);
app.use("/api", auth);
app.use("/api/faq", faq);
app.use("/api/users", users);
app.use("/api/category", category);
app.use("/api/slider", slider);
app.use("/api/quiz", quiz);
app.use("/api/questions", questions);
app.use("/api/tags", tags);
app.use("/api/alldata", alldata);
app.use("/api/study", study);
app.use("/api/recall", recall);
app.use("/api/result", result);
app.use("/api/subscription", subscription);
app.use("/api/control", controlpanel);
app.use("/api/auth", forgotpassword);
app.use("/api/contact-us", contactUs);

userStrategy();

// 404 not found handler
app.use(notFoundHandler);

// common Error Handler
app.use(errorHandler);

const start = async () => {
  try {
    connectDB();
    server.listen(process.env.PORT || 8000);
    console.log(`App is running on ${process.env.PORT}`);
  } catch (err) {
    error(`Opps ! failed to connect the server ${err}`);
  }
};
module.exports = start;
