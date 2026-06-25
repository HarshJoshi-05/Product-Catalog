const Product = require("../models/Product");

const getProducts = async (req, res) => {

    try {

        const {
            category,
            cursorCreatedAt,
            cursorId
        } = req.query;

        const query = {};

        if (category) {

            query.category = category;

        }

        if (cursorCreatedAt && cursorId) {

            query.$and = [

                ...(category ? [{ category }] : []),

                {

                    $or: [

                        {
                            createdAt: {
                                $lt: new Date(cursorCreatedAt)
                            }
                        },

                        {
                            createdAt: new Date(cursorCreatedAt),

                            _id: {
                                $lt: cursorId
                            }
                        }

                    ]

                }

            ];

            delete query.category;

        }

        const products = await Product.find(query)
            .sort({
                createdAt: -1,
                _id: -1
            })
            .limit(20)
            .lean();

        let nextCursor = null;

        if (products.length === 20) {

            const lastProduct = products[products.length - 1];

            nextCursor = {

                cursorCreatedAt: lastProduct.createdAt,

                cursorId: lastProduct._id

            };

        }

        res.status(200).json({

            products,

            nextCursor

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const createProduct = async (req, res) => {

    try {

        const { name, category, price } = req.body;

        if (!name || !category || price === undefined) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        if (price <= 0) {

            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0."
            });

        }

        const product = await Product.create({
            name,
            category,
            price
        });

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });

        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getProducts,
    createProduct,
    deleteProduct
};