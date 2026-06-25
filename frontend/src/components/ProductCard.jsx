import "./ProductCard.css";

const ProductCard = ({ product, onDelete }) => {

    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(product.price);

    const formattedDate = new Date(product.updatedAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

    return (

        <div className="product-card">

            <div className="product-header">

                <h3>{product.name}</h3>

                <span className="price">
                    {formattedPrice}
                </span>

            </div>

            <div className="category">
                {product.category}
            </div>

            <div className="updated">
                Updated {formattedDate}
            </div>

            <button
                className="delete-btn"
                onClick={() => onDelete(product._id)}
            >
                🗑 Delete Product
            </button>

        </div>

    );

};

export default ProductCard;