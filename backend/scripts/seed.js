const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/Product");
const generateProduct = require("../utils/generateProduct");

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 10000;

const seedDatabase = async () => {

    try {

        await connectDB();

        // Delete old products
        await Product.deleteMany({});
        console.log("Existing products deleted.");

        console.log("Starting Seeding...\n");

        for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {

            const products = [];

            for (let j = 0; j < BATCH_SIZE; j++) {
                products.push(generateProduct());
            }

            await Product.insertMany(products);

            console.log(`${i + BATCH_SIZE} Products Inserted`);
        }

        console.log("\nSeeding Completed Successfully");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedDatabase();