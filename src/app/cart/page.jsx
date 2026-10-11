"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addToCart, removeFromCart } from "../../../store/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-6xl items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Browse the store and add something you love. Your items will show up here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-6 py-10 md:px-10 lg:px-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <section className="min-w-0 flex-1">
          <div className="mb-5 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
              <p className="mt-1 text-sm text-gray-500">
                {items.reduce((count, item) => count + item.quantity, 0)} items
              </p>
            </div>
          </div>

          <ul className="divide-y divide-gray-200">
            {items.map(({ products, quantity }) => (
              <li key={products.id} className="flex gap-4 py-5 sm:gap-6">
                <Link
                  href={`/product/${products.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32"
                >
                  <Image
                    src={products.image}
                    alt={products.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {products.category}
                    </p>
                    <Link
                      href={`/product/${products.id}`}
                      className="mt-1 block font-medium text-gray-900 hover:underline"
                    >
                      {products.name}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatPrice(products.price)} each
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="flex items-center rounded-md border border-gray-200">
                      <button
                        type="button"
                        aria-label={`Decrease ${products.name} quantity`}
                        className="px-3 py-2 text-gray-600 hover:text-gray-950"
                        onClick={() =>
                          dispatch(
                            removeFromCart({ productsId: products.id, quantity: 1 }),
                          )
                        }
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${products.name} quantity`}
                        className="px-3 py-2 text-gray-600 hover:text-gray-950"
                        onClick={() =>
                          dispatch(addToCart({ products, quantity: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="w-20 text-right text-sm font-semibold text-gray-900">
                      {formatPrice(products.price * quantity)}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${products.name} from cart`}
                      className="text-gray-400 transition hover:text-red-600"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productsId: products.id,
                            quantity,
                          }),
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="h-fit w-full rounded-xl border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-28 lg:w-80">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3 border-b border-gray-200 pb-5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between pt-5 font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Taxes and any delivery details are confirmed at checkout.
          </p>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-md bg-gray-300 px-4 py-3 text-sm font-medium text-gray-600"
            title="Checkout is not available yet"
          >
            Checkout coming soon
          </button>
        </aside>
      </div>
    </main>
  );
}
