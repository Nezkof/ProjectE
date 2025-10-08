import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import http from "http";
import { Server } from "socket.io";

import usersRouter from "./routes/usersRoutes.js";
import authRouter from "./routes/authRoutes.js";
import albumsRouter from "./routes/albumsRoutes.js";
import matricesRouter from "./routes/matricesRoutes.js";
import ignoredAlbumsRouter from "./routes/ignoredAlbumsRoutes.js";
import metricsRouter from "./routes/metricsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: `http://localhost:${process.env.FRONTEND_PORT}`,
      credentials: true,
   },
});
app.set("io", io);

app.use(
   cors({
      origin: `http://localhost:${process.env.FRONTEND_PORT}`,
      credentials: true,
   })
);

app.use(express.json());
app.use(cookieParser());

app.use(
   session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
   })
);

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: `http://localhost:${PORT}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
         return done(null, profile);
      }
   )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/matrices", matricesRouter);
app.use("/api/ignoredAlbums", ignoredAlbumsRouter);
app.use("/api/metrics", metricsRouter);
app.use("/", authRouter);


connectDB().then(() => {
   server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
   });
});

io.on("connection", (socket) => {
   console.log("(+) Client connected:", socket.id);

   socket.on("disconnect", () => {
      console.log("(-) Client disconnected:", socket.id);
   });
});
