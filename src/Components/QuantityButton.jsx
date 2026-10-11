"use client";
import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, removeFromCart } from "../../store/cartSlice";

export default function QuantityButton({ product }) {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.cart.items.find((cartItem) => cartItem.products.id === product.id),
  );

  const handleAddButton = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ products: product, quantity: 1 }));
  };
  const handleMinusButton = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart({ productsId: product.id, quantity: 1 }));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
       
        className="font-medium text-sm rounded-md w-9 h-9 cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white"
        onClick={handleMinusButton}
      >
        <Minus className=" w-4 h-4 " />
      </button>
      <span>{item?.quantity ?? 0}</span>
      <button
        type="button"
        
        className="font-medium text-sm rounded-md w-9 h-9 cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white"
        onClick={handleAddButton}
      >
        <Plus className=" w-4 h-4 " />
      </button>
    </div>
  );
}
