import { useEffect, useState } from "react";

import "./App.css";

import { fetchProducts, deleteProduct } from "./services/api";

import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import ProductModal from "./components/ProductModal";

function App() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const [nextCursor, setNextCursor] = useState(null);

  const [cursorHistory, setCursorHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProducts = async (
    selectedCategory = category,
    cursor = null,
    resetHistory = false
  ) => {

    try {

      setLoading(true);
      setError("");

      const data = await fetchProducts(
        selectedCategory,
        cursor?.cursorCreatedAt,
        cursor?.cursorId
      );

      setProducts(data.products);

      setNextCursor(data.nextCursor);

      if (resetHistory) {
        setCursorHistory([]);
      }

    }

    catch (err) {

      setError(err.message);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts(category, null, true);

  }, [category]);

  const handleNext = () => {

    if (!nextCursor) return;

    setCursorHistory(prev => [...prev, nextCursor]);

    loadProducts(category, nextCursor);

  };

  const handlePrevious = () => {

    if (cursorHistory.length === 0) return;

    const history = [...cursorHistory];

    history.pop();

    const previousCursor =
      history.length === 0
        ? null
        : history[history.length - 1];

    setCursorHistory(history);

    loadProducts(category, previousCursor);

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      await loadProducts(category, null, true);

      alert("Product deleted successfully.");

    }

    catch (error) {

      alert(error.message);

    }

  };

  const handleProductAdded = async () => {

    setIsModalOpen(false);

    await loadProducts(category, null, true);

  };

  return (

    <div className="app">

      <header>

        <div className="header-top">

          <div>

            <h1>Product Catalog</h1>

            <p>
              Browse Products
            </p>

          </div>

          <button
            className="open-modal-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Product
          </button>

        </div>

      </header>

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      {loading ? (

        <div className="loading">

          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>

        </div>

      ) : error ? (

        <div className="error">

          {error}

        </div>

      ) : (

        <>

          <ProductList
            products={products}
            onDelete={handleDelete}
          />

          <Pagination
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={cursorHistory.length > 0}
            hasNext={nextCursor !== null}
            loading={loading}
          />

        </>

      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

    </div>

  );

}

export default App;