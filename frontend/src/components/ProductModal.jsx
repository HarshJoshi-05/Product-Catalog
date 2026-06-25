import { useState } from "react";
import { createProduct } from "../services/api";
import "./ProductModal.css";

const ProductModal = ({
    isOpen,
    onClose,
    onProductAdded
}) => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!name.trim() || !category || !price) {

            alert("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            await createProduct({

                name,

                category,

                price: Number(price)

            });

            setName("");
            setCategory("Electronics");
            setPrice("");

            onClose();

            onProductAdded();

        }

        catch (error) {

            alert(error.message);

        }

        finally {

            setLoading(false);

        }

    };

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Add Product</h2>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    <option>Electronics</option>
                    <option>Books</option>
                    <option>Furniture</option>
                    <option>Gaming</option>
                    <option>Sports</option>
                    <option>Beauty</option>

                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="add-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ProductModal;