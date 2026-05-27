import React, { useState } from "react";
import {
  X,
  Heart,
  Share2,
  MessageCircle,
  Check,
  Info,
  ChevronRight,
  ZoomIn,
  Package,
  Truck,
  Shield
} from "lucide-react";

const ProductDetailsModal = ({
  product,
  onClose,
  onContact,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [showAlert, setShowAlert] = useState({ show: false, message: "", type: "" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleAlert = (message, type = "success") => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleWhatsAppQuery = () => {
    const message = `Hi! I'm interested in purchasing:\n\nProduct: ${product.name}\nCategory: ${product.category}\n\nPlease provide pricing and availability details.`;
    window.open(`https://wa.me/918825430312?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      handleAlert("Product link copied to clipboard!");
    } catch (err) {
      handleAlert("Failed to copy link", "error");
    }
  };

  const getAlertStyles = (type) => ({
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  }[type] || "bg-blue-100 text-blue-800");

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-2 md:p-4 overflow-y-auto">
      <div className="relative w-full max-w-7xl bg-white rounded-3xl shadow-2xl transform transition-all">
        {/* Alert Component */}
        {showAlert.show && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto animate-fade-in">
            <div className={`px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md ${getAlertStyles(showAlert.type)}`}>
              {showAlert.type === "success" && <Check className="h-5 w-5" />}
              {showAlert.type === "warning" && <Info className="h-5 w-5" />}
              <span className="font-medium">{showAlert.message}</span>
            </div>
          </div>
        )}

        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header Section */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl px-6 py-4 border-b flex justify-between items-center rounded-t-3xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 flex items-center">
                {product.category} <ChevronRight className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-gray-900 md:hidden truncate">
                {product.name}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleWishlist}
                className="p-2.5 rounded-full hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:scale-110"
              >
                <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:scale-110"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-gray-100 border border-gray-200 transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Section */}
              <div className="space-y-6">
                <div 
                  className={`relative aspect-square rounded-3xl overflow-hidden shadow-xl group cursor-zoom-in
                    ${isZoomed ? 'fixed inset-0 z-50 bg-black/90 rounded-none cursor-zoom-out' : ''}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  </div>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-all duration-700 
                      ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                      ${isZoomed ? 'scale-110' : 'group-hover:scale-105'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm">
                    <ZoomIn className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-8">
                <div className="hidden md:block">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Specifications Section */}
                {product.category&& (
                  <div className="flex flex-col p-3 rounded-xl hover:bg-white/50 transition-colors">
                    <span className="text-sm text-gray-600">category</span>
                    <span className="font-medium mt-1">{product.category}</span>
                  </div>
                )}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Specifications
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {product.weightHoldingCapacity && (
                      <div className="flex flex-col p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <span className="text-sm text-gray-600">Weight Holding Capacity</span>
                        <span className="font-medium mt-1">{product.weightHoldingCapacity}</span>
                      </div>
                    )}
                    {product.color && (
                      <div className="flex flex-col p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <span className="text-sm text-gray-600">Color</span>
                        <span className="font-medium mt-1">{product.color}</span>
                      </div>
                    )}
                    {product.packagingType && (
                      <div className="flex flex-col p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <span className="text-sm text-gray-600">Packaging Type</span>
                        <span className="font-medium mt-1">{product.packagingType}</span>
                      </div>
                    )}
                     
                    {product.additionalInfo?.map((info, index) => (
                      <div key={index} className="flex flex-col p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <span className="text-sm text-gray-600">{info.key}</span>
                        <span className="font-medium mt-1">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onContact}
                    className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl 
                      transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 active:scale-95 
                      hover:-translate-y-0.5"
                  >
                    Get Best Quote
                  </button>
                  <button
                    onClick={handleWhatsAppQuery}
                    className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl 
                      transition-all duration-300 hover:shadow-lg hover:shadow-green-200 active:scale-95 
                      hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Quick Cart on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
