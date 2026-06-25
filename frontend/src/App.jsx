import { useEffect, useState } from "react";

import "./App.css";

import { fetchProducts } from "./services/api";

import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";

function App() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const [nextCursor, setNextCursor] = useState(null);

  const [cursorHistory, setCursorHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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
        cursor?.cursorUpdatedAt,
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

    if (cursorHistory.length === 0) {

      loadProducts(category, null, true);

      return;

    }

    const history = [...cursorHistory];

    history.pop();

    const previousCursor =
      history.length === 0
        ? null
        : history[history.length - 1];

    setCursorHistory(history);

    loadProducts(category, previousCursor);

  };

  return (

    <div className="app">

      <header>

        <h1>Product Catalog</h1>

        <p>
          Browse Products 
        </p>

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

    </div>

  );

}

export default App;