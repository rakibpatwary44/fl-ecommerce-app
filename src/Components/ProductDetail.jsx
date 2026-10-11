"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import QuantityButton from "./QuantityButton";
import { addToCart } from "../../store/cartSlice";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isInCart = items.some((item) => item.products.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ products: product, quantity: 1 }));
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>
      <div className="mt-6 flex flex-col gap-8 md:flex-row">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 md:flex-1">
          <Image
            src={product.image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={product.name}
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wider text-red-500">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold">${product.price}</p>
          <p className="mt-4 leading-relaxed text-gray-700">
            {product.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {isInCart ? (
              <QuantityButton product={product} />
            ) : (
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-amber-200 bg-red-500 px-5 py-2 font-medium text-white shadow-xs"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            )}
            <button
              type="button"
              className="rounded-md border border-blue-500 px-5 py-2 text-sm font-medium shadow-xs"
              onClick={() => router.push("/cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
