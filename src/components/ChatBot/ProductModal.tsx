// src/components/ChatBot/ProductModal.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

interface Capacity {
  value: string;
  active: boolean;
}

interface ProductModalProps {
  product: {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    price: string;
    capacities: Capacity[];
    buttonText: string;
  };
  likeCount: number;
  heartColor: string;
  onLikeClick: () => void;
  onOrderClick: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  likeCount,
  heartColor,
  onLikeClick,
  onOrderClick,
  modalRef,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div ref={modalRef} className="w-11/12 max-w-md relative">
        <Card className="shrink-0 w-full rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl bg-white hover:-translate-y-2">
          <div className="relative group">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={400}
              height={300}
              style={{ width: "auto", height: "auto" }}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <button
              onClick={onLikeClick}
              className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all bg-white/80 hover:bg-white"
            >
              <Heart className={`${heartColor} transition-colors`} size={24} />
            </button>
            {likeCount > 0 && (
              <span className="absolute top-4 right-16 bg-white/80 px-2.5 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                ❤️ {likeCount}
              </span>
            )}
          </div>
          <CardHeader className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.capacities.map((capacity, idx) =>
                capacity.value.toLowerCase() === "recipe" && capacity.active ? (
                  <Link href={`/recipe/${product.id}`} key={idx}>
                    <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all bg-blue-100 text-blue-600 hover:bg-blue-200">
                      {capacity.value}
                    </span>
                  </Link>
                ) : (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      capacity.active
                        ? "bg-teal-100 text-teal-600 border-teal-200"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {capacity.value}
                  </span>
                )
              )}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-6">
              <span className="text-xl font-bold text-blue-600">
                {product.price}
              </span>
              <button
                onClick={onOrderClick}
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-full font-semibold transition-all bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-xl hover:scale-105"
              >
                <ShoppingCart size={20} />
                {product.buttonText}
              </button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ProductModal;
