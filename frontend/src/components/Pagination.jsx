import "./Pagination.css";

const Pagination = ({
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
    loading
}) => {

    return (

        <div className="pagination">

            <button
                onClick={onPrevious}
                disabled={!hasPrevious || loading}
            >
                ← Previous
            </button>

            <button
                onClick={onNext}
                disabled={!hasNext || loading}
            >
                Next →
            </button>

        </div>

    );

};

export default Pagination;