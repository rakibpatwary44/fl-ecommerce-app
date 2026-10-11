import { notFound } from "next/navigation";
import ProductDetail from "@/Components/ProductDetail";
import { findProductById, PRODUCTS } from "../../../../utils/product";

export function generateStaticParams() {
  return PRODUCTS.map(({ id }) => ({ id }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = findProductById(id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
