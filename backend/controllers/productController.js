const Product = require("../models/Product");

const getProducts = async (req, res) => {

    try {

        const category = req.query.category;
        const cursorUpdatedAt = req.query.cursorUpdatedAt;
        const cursorId = req.query.cursorId;

       

        const query = {};

        
        if (category) {
            query.category = category;
        }

        
        if (cursorUpdatedAt && cursorId) {

            query.$and = [
                ...(query.category ? [{ category: query.category }] : []),

                {
                    $or: [
                        {
                            updatedAt: {
                                $lt: new Date(cursorUpdatedAt)
                            }
                        },
                        {
                            updatedAt: new Date(cursorUpdatedAt),
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
                updatedAt: -1,
                _id: -1
            })
            .limit(20);

      

        let nextCursor = null;

        if (products.length === 20 ) {

            const lastProduct = products[products.length - 1];

            nextCursor = {
                cursorUpdatedAt: lastProduct.updatedAt,
                cursorId: lastProduct._id
            };

        }

        

        res.status(200).json({
            products,
            nextCursor
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getProducts
};