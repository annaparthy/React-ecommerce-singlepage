import { useState } from "react";

export default function ProductCard({
  image,
  title,
  price,
  rating,
  returnPolicy,
  stock, // Fixed typo in the prop name
}) {
  const [isLoading, setIsLoading] = useState(true);
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    const validRating = rating != null ? rating : 0; // Ensures rating is not null or undefined

    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star full-star">
            ★
          </span>
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <span key={i} className="star half-star">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty-star">
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="productcard">
      {/* Skeleton Loader */}
      {isLoading && <div className="skeleton skeleton-image"></div>}

      {/* Product Image */}
      <img
        className={`productimage ${isLoading ? "hidden" : "visible"}`}
        src={image}
        alt={title}
        onLoad={() => setIsLoading(false)}
      />
      <div className="productcard-text">
        <h3>{title}</h3>
        <p className="price">${price}</p>

        <div className="rating">
          {renderStars(rating)} {/* Use rating prop directly */}
          <span className="rating-value">({rating.toFixed(1)})</span>{" "}
          {/* Use rating directly */}
        </div>

        <p className="return-policy">{returnPolicy}</p>
        <p>
          {stock > 1
            ? ``
            : stock === 1
            ? "1 stock available, hurry up!"
            : "Out of stock"}
        </p>
      </div>
    </div>
  );
}
