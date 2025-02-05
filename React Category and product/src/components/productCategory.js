// ProductCategory.js
import React from "react";

export default function ProductCategory({
  categories,
  selectedCategory,
  handleCategoryClick,
  scrollCategories,
}) {
  return (
    <div className="category-container">
      <button className="scroll-btn" onClick={() => scrollCategories("left")}>
        ⬅
      </button>
      <div className="category-wrapper" id="categoryWrapper">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.slug}
              className={`category-button ${
                selectedCategory === category.slug ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
      <button className="scroll-btn" onClick={() => scrollCategories("right")}>
        ➡
      </button>
    </div>
  );
}
