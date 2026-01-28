import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import githubRoutes from "./routes/github-routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDB from "./config/db-config.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  }),
);
// app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true, // Change to true for testing
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false, // Must be false for localhost HTTP
      sameSite: 'lax', 
      httpOnly: true, // Recommended for security
    },
  }),
);
app.use(express.json());

// routes for backend
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);

// default route to confirm server is running
app.get("/", (req, res) => {
  console.log("server is runing...");
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
