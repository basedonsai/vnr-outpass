require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const outpassRoutes = require("./routes/outpassRoutes");

const app = express(); // ✅ app should be declared first

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/gatepass", outpassRoutes); // ✅ move this after app declaration

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
