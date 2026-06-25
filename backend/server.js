require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect Database
connectDB();

// Middlewares
const cors = require("cors");

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://product-catalog-pi-liard.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
    })
);
app.use(express.json());

// Routes
app.use("/products", productRoutes);


// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Product Catalog API is Running"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});