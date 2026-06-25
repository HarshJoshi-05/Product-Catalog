import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ products, onDelete }) => {

    if (products.length === 0) {

        return (

            <div className="empty-state">

                <h2>No Products Found</h2>

                <p>Try selecting another category.</p>

            </div>

        );

    }

    return (

        <div className="product-grid">

            {
                products.map((product) => (

                    <ProductCard
                        key={product._id}
                        product={product}
                        onDelete={onDelete}
                    />

                ))
            }

        </div>

    );

};

export default ProductList;