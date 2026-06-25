const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (
    category = "",
    cursorUpdatedAt = null,
    cursorId = null
) => {

    try {

        const params = new URLSearchParams();

        if (category) {
            params.append("category", category);
        }

        if (cursorUpdatedAt && cursorId) {
            params.append("cursorUpdatedAt", cursorUpdatedAt);
            params.append("cursorId", cursorId);
        }

        const url = params.toString()
            ? `${BASE_URL}?${params.toString()}`
            : BASE_URL;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        throw error;

    }

};