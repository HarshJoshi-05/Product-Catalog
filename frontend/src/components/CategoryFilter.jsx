import "./CategoryFilter.css";

const CategoryFilter = ({ category, setCategory }) => {

    const categories = [
        "",
        "Electronics",
        "Books",
        "Clothing",
        "Sports",
        "Furniture",
        "Beauty",
        "Gaming",
        "Home"
    ];

    return (
        <div className="filter-container">

            <label htmlFor="category">
                Category
            </label>

            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>

                {
                    categories.slice(1).map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))
                }

            </select>

        </div>
    );
};

export default CategoryFilter;