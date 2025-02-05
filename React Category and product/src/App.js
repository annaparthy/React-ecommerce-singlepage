import { useEffect, useState } from "react";
import { PAGE_SIZE } from "./constants";
import ProductCard from "./components/productCard";
import ProductCategory from "./components/productCategory";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const categoryData = await fetch(
      "https://dummyjson.com/products/categories"
    );

    const json = await data.json();
    const categoryJson = await categoryData.json();

    //console.log("Category Data:", categoryJson);

    setProducts(json.products);
    setCategories(categoryJson);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const totalProducts = filteredProducts.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const gotonextpage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const gotopreviouspage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Scroll function for categories
  const scrollCategories = (direction) => {
    const container = document.getElementById("categoryWrapper");
    if (container) {
      if (direction === "left") {
        container.scrollLeft -= 200; // Adjust as needed
      } else {
        container.scrollLeft += 200;
      }
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset to first page when category is changed
  };

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div className="App">
      <h2>ALL COLLECTIONS</h2>

      {/* Pass the necessary props to ProductCategory */}
      <ProductCategory
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        scrollCategories={scrollCategories}
      />

      <h2>
        {selectedCategory
          ? `Products in ${
              categories.find((cat) => cat.slug === selectedCategory)?.name ||
              selectedCategory
            }`
          : "All Products"}
      </h2>
      <div className="productcontainer">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .slice(start, end)
            .map((p) => (
              <ProductCard
                key={p.id}
                image={p.thumbnail}
                title={p.title}
                price={p.price}
                rating={p.rating}
                returnPolicy={p.returnPolicy}
                stock={p.stock}
                s
              />
            ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>

      <div className="paginationcontainer">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => gotopreviouspage()}
        >
          ⬅
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            className={"page-number" + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          className="page-number"
          onClick={() => gotonextpage()}
        >
          ➡
        </button>
      </div>
    </div>
  );
}
