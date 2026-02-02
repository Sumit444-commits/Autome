import "dotenv/config";
import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import githubRoutes from "./routes/github-routes.js";
import userRoutes from "./routes/user-readme-routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDB from "./config/db-config.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      process.env.BACKEND_API,
      process.env.FRONTEND_API,
      process.env.FRONTEND_LOCAL_API,
      process.env.BACKEND_LOCAL_API,
    ],
    credentials: true,
  }),
);
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false, // Set to false in production for better security and to save storage
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 7 * 24 * 60 * 60, // Sessions will last 14 days
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV === "production" ? true : false, // true on Render (HTTPS), false on Localhost
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' is required for cross-origin cookies on Render
      httpOnly: true,
    },
  }),
);

app.use(express.json());

// routes for backend
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/user", userRoutes);

// default route to confirm server is running
app.get("/", (req, res) => {
  console.log("server is runing...");
  res.send("Server is Running...");
});

app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
