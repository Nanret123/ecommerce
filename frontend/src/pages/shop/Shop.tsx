import { useEffect, useMemo, useState } from "react";
import productsData from '../../data/products.json'
import ProductsCards from "./ProductsCard";
import ShopFiltering from "./ShopFiltering";
import { Filters, SelectedFilters } from "../../interfaces";

const filters: Filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black','red','gold','blue', 'green', 'silver', 'beige'],
  priceRange: [
    { label: "Under $50", min: 0 , max: 50},
    { label: "$50 - $100", min: 50 , max: 100},
    { label: "$100 - $200", min: 100 , max: 200},
    { label: "$200 and above ", min: 200 , max: Infinity},
  ],
}

const Shop = () => {
  const [products,setProducts] = useState(productsData)
  const [filtersState, setFiltersState] = useState<SelectedFilters>({
    category: 'all',
    color: 'all',
    priceRange: { min: 0, max: Infinity }
  })
  //filtering function
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];
  
    //filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filtered = filtered.filter((product) => product.category === filtersState.category);
    }

    //filter by color
    if (filtersState.color && filtersState.color !== "all") {
      filtered = filtered.filter((product) => product.color === filtersState.color);
    }

    //filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter((product) => product.price >= filtersState.priceRange.min &&
      product.price <= filtersState.priceRange.max
    )
    }
  
    return filtered;
  }, [filtersState]); // Only recalculates when dependencies change
  
  // Set the state when filteredProducts changes
  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts]);

  //clear the filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: { min: 0, max: Infinity }, // ✅ Reset properly
    });

  };


  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Browse our wide selection of clothing, accessories, and footwear. From chic dresses to versatile shoes, we have got you covered.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-3">
          {/* left side */}
          <ShopFiltering
          filters={filters}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
          clearFilters={clearFilters}
           />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">Products Available: {products.length}</h3>
            <ProductsCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
