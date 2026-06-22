import Image from 'next/image';
import Link from 'next/link';
import { BsCartPlus } from "react-icons/bs";
import AddToCartButton from '../button/AddToCartButton';

const ProductCard = ({ product }) => {

    const discountedPrice = product.discount
        ? product.price - (product.price * product.discount / 100)
        : product.price;

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-base-200 h-full">
            <figure className="relative h-56 w-full bg-white p-4 border-b border-base-200 overflow-hidden">

                <Image
                    width={200}
                    height={200}
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full w-full"
                />

                {product.discount > 0 && (
                    <div className="badge badge-secondary absolute top-4 right-4">
                        -{product.discount}%
                    </div>
                )}
            </figure>


            <div className="card-body p-5 flex flex-col">
                <h2 className="card-title text-[1rem] leading-snug line-clamp-2"
                    // href={`/products/${product._id}`}
                    title={product.bangla || product.title}>
                    {product.bangla || product.title}
                </h2>

                <div className="flex items-center gap-2 mt-auto pt-4">
                    <span className="text-xl font-bold text-primary">৳{discountedPrice}</span>
                    {product.discount > 0 && (
                        <span className="text-sm line-through text-base-content/50">৳{product.price}</span>
                    )}
                </div>

                <div className="card-actions justify-between items-center mt-4 w-full">
                    {/* <button className="btn btn-primary btn-sm flex-1">
                        <BsCartPlus className="text-lg" /> Add to Cart
                    </button> */}

                    <AddToCartButton product={product} />


                    <Link
                        href={`/products/${product._id}`}
                        className="btn btn-outline btn-sm">
                        Details
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default ProductCard;