import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Grid, List, Heart, Filter, X } from "lucide-react";
import ProductDetailsModal from "./ProductDetailsModal";
import ContactModal from "./ProductContactModal";
import { PRODUCTS_DATA } from "@/data/productsData";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState(PRODUCTS_DATA);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Instantly loaded, no blocking spinner
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(() => {
    return [...new Set(PRODUCTS_DATA.map((product) => product.category))].filter(Boolean);
  });
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);



  useEffect(() => {
    let filtered = productsData.filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case "price-high":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, productsData, sortBy, selectedCategory]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const CategoryFilter = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Categories</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </button>
      </div>
      <div className={`space-y-2 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden group transition-all duration-300 flex flex-col h-full"
      data-aos="fade-up"
    >
      <div className="relative">
        <div className="aspect-square relative">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md transition-all"
          >
            <Heart 
              className={`w-5 h-5 ${
                wishlist.includes(product._id) 
                  ? 'fill-red-500 stroke-red-500' 
                  : 'stroke-gray-600'
              }`} 
            />
          </button>
          {product.category && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
              {product.category}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={() => setSelectedProduct(product)}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const ProductList = ({ product }) => (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden group transition-all duration-300 p-4 flex flex-col md:flex-row gap-6"
      data-aos="fade-up"
    >
      <div className="relative w-full md:w-56 aspect-square md:aspect-auto md:h-56">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
            {product.category}
          </span>
        )}
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-grow md:flex-grow-0 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${
                wishlist.includes(product._id) 
                  ? 'fill-red-500 stroke-red-500' 
                  : 'stroke-gray-600'
              }`} 
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <header className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Discover <span className="text-blue-600">Products</span>
            </h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="sm:hidden p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`flex flex-col sm:flex-row gap-4 ${showMobileSearch ? 'block' : 'hidden sm:flex'}`}>
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {viewMode === "grid" ? (
                  <List className="w-5 h-5" />
                ) : (
                  <Grid className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Category Filter Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilter />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="border-4 border-gray-200 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : filteredProducts.length ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  viewMode === "grid" ? (
                    <ProductCard key={product._id} product={product} />
                  ) : (
                    <ProductList key={product._id} product={product} />
                  )
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Products Found
                </h2>
                <p className="text-gray-500">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onContact={() => setShowContact(true)}
          isWishlisted={wishlist.includes(selectedProduct._id)}
          onToggleWishlist={() => toggleWishlist(selectedProduct._id)}
        />
      )}
      
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>  
  );
};

export default Products;
