"use client";

import { Suspense, useEffect, useState } from "react";
import { Package, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "../shared/ui/Badge";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../store/cartSlice";

function HeaderSearch() {
  const pathname = usePathname();
  const showSearchBar = pathname === "/";
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterProducts(searchTerm));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, dispatch]);

  if (!showSearchBar) return null;

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300" />

      <input
        type="text"
        className="outline-none w-80 border border-green-300 py-2 pl-8 rounded-md text-sm"
        placeholder="Search products...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default function Header() {
  const items = useAppSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-10 backdrop-blur items-center w-full flex justify-between py-5 px-20 border-b border-gray-500">
      <Link href="/" className="flex gap-2">
        <Package className="text-red-500" />
        <span className="font-semibold">TachStore</span>
      </Link>

      <div className="flex gap-4 items-center">
        <Suspense fallback={null}>
          <HeaderSearch />
        </Suspense>

        <Link href="/cart" className="relative">
          <ShoppingCart className="w-5 h-5" />

          <Badge className="bg-red-500 h-5 w-5 text-white text-center text-sm absolute -top-3 -right-4">
            {totalQuantity}
          </Badge>
        </Link>
      </div>
    </header>
  );
}
