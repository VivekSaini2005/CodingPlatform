const express = require('express')
const app = express();
require("dotenv").config();
const main = require('./config/db')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userAuth = require('./routes/userAuth')
const redisClient = require('./config/redis')
const problemRouter = require('./routes/problemCreator')
const submitRouter = require('./routes/submit')
const rankRoute = require("./routes/rankRoute");
const aiRouter = require("./routes/aiChatting");
const discussionRoutes = require("./routes/discussionRoutes.js");
const { Server } = require("socket.io");
const { socketHandler } = require("./services/socketHandler.js");
const http = require("http");
const notificationRoutes = require("./routes/notificationRoutes");


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://coding-platform-eta-woad.vercel.app"
    ],
    credentials: true
  }
});

socketHandler(io);


app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://coding-platform-eta-woad.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {

    // allow requests with no origin (server-server, Postman, health checks)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked CORS origin:", origin);
    return callback(null, false); // don't throw error
  },
  credentials: true
}));

app.use('/user', userAuth);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use("/api", rankRoute);
app.use('/ai', aiRouter);
app.use('/discussion', discussionRoutes);
app.use("/api/notifications", notificationRoutes);

const InitalizeConnection = async () => {
  try {
    await main();
    console.log("DB Connected");
  }
  catch (err) {
    console.log("DB is not connected , Error: ", err);
    return;
  }

  try {
    await redisClient.connect();
    console.log("Redis Connected");
  }
  catch (error) {
    console.log("Redis Connection Failed (Ignoring): ", error.message);
  }

  server.listen(process.env.PORT, () => {
    console.log("Listening at the port number: " + process.env.PORT)
  })
}

InitalizeConnection();

// main()
// .then(async ()=>{

//     app.listen(process.env.PORT, ()=>{
//         console.log("Listening at the port number: " + process.env.PORT)
//     })
// })
// .catch((error) => {
//     console.log(error);
// })

