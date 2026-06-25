const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (
    category = "",
    cursorCreatedAt = null,
    cursorId = null
) => {

    try {

        const params = new URLSearchParams();

        if (category) {

            params.append("category", category);

        }

        if (cursorCreatedAt && cursorId) {

            params.append("cursorCreatedAt", cursorCreatedAt);

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

    }

    catch (error) {

        console.error(error);

        throw error;

    }

};

export const createProduct = async (product) => {

    const response = await fetch(BASE_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Failed to create product");

    }

    return data;

};

export const deleteProduct = async (id) => {

    const response = await fetch(`${BASE_URL}/${id}`, {

        method: "DELETE"

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

};