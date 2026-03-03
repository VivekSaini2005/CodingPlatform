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

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://coding-platform-eta-woad.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use('/user', userAuth);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);

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

    app.listen(process.env.PORT, () => {
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