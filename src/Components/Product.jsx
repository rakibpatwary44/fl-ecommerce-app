"use client";
import { ShoppingCart } from "lucide-react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useAppSelector } from "../../store/hooks";
import QuantityButton from "./QuantityButton";
import { useRouter } from "next/navigation";


export default function Product() {
  const { items, products } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
 

  const handleAddToCart = (e, pd) => {
    e.stopPropagation();
    dispatch(addToCart({ products: pd, quantity: 1 }));
  };
  return (
    <div className="py-6 px-20">
      <div className="grid grid-cols-4 gap-6 w-full">
        {products.map((pd) => (
          <div
            key={pd.id}
            className="rounded-lg shadow-sm border border-amber-300 overflow-hidden  flex flex-col cursor-pointer" onClick={() => router.push(`/product/${pd.id}`)}
          >
            <div className="aspect-square">
              <Image
                src={pd.image}
                width={200}
                height={200}
                alt={pd.name}
                className="object-cover  h-full w-full"
              />
            </div>
            <div className="p-4 flex flex-col grow justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                  {pd.category}
                </p>
                <h3 className="font-medium leading-tight text-base ">
                  {pd.name}
                </h3>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="mt-2 text-lg font-semibold text-black">
                  ${pd.price}
                </p>
                {items.some((item) => item.products.id === pd.id) ? (
                  <QuantityButton product={pd} />
                ) : (
                  <button
                    className="font-medium text-sm px-3 border border-amber-200 py-2 cursor-pointer rounded-md flex items-center justify-center gap-2 shadow-xs "
                    onClick={(e) => handleAddToCart(e, pd)}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
