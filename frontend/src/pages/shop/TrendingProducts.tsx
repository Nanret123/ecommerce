import { useState } from "react";
import ProductsCard from "./ProductsCard";
import products from "../../data/products.json";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader pb-12">
        Check out our latest trends, inspired by fashion trends, accessories,
        and footwear from around the world.
      </p>

      {/* Product Card */}
      <ProductsCard products={products.slice(0, visibleProducts)} />

      {/* Load More Products Button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn btn--primary" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
