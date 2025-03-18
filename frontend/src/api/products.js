import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getProducts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admin operations
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
