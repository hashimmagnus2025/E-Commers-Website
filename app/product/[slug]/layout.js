import { getProduct, products } from '../../../data/products';

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }) { const { slug } = await params; const product = getProduct(slug); if (!product) return { title: 'Piece not found' }; return { title: product.name, description: product.description, alternates: { canonical: `/product/${product.slug}` }, openGraph: { title: `${product.name} — Veloce`, description: product.description, images: product.images.map((url) => ({ url, alt: product.name })) } }; }
export default function ProductLayout({ children }) { return children; }
