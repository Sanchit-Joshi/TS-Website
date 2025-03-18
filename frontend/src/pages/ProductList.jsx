import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const pageNumber = searchParams.get("page") || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/products?${category ? `category=${category}&` : ""}${
            keyword ? `keyword=${keyword}&` : ""
          }pageNumber=${pageNumber}`
        );
        setProducts(data.products);
        setPage(data.page);
        setTotalPages(data.pages);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, keyword, pageNumber]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {category ? `Category: ${category}` : "All Products"}
        </h1>
        {keyword && (
          <p className="text-gray-600">
            Search results for: <span className="font-medium">{keyword}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalPages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`px-4 py-2 rounded ${
                page === x + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
