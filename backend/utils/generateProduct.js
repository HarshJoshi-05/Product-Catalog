const { faker } = require("@faker-js/faker");

const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Sports",
    "Furniture",
    "Beauty",
    "Gaming",
    "Home"
];

const generateProduct = () => {

    // Random date within the last 365 days
    const randomDate = faker.date.between({
        from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        to: new Date()
    });

    return {
        name: faker.commerce.productName(),

        category: faker.helpers.arrayElement(categories),

        price: Number(
            faker.commerce.price({
                min: 100,
                max: 100000
            })
        ),

        createdAt: randomDate,

        updatedAt: randomDate
    };
};

module.exports = generateProduct;