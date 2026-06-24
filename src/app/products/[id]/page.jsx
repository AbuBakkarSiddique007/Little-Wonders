import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSingleProduct } from '@/action/server/products';
import { BsCartPlus, BsStarFill, BsStarHalf, BsStar, BsShieldCheck, BsTruck, BsArrowLeft } from 'react-icons/bs';
import { MdOutlineSell } from 'react-icons/md';
import AddToCartButton from '@/components/button/AddToCartButton';


function StarRating({ rating }) {
    const stars = [];
    const full = Math.floor(rating);

    const half = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) stars.push(<BsStarFill key={i} className="text-amber-400" />);

    if (half) stars.push(<BsStarHalf key="h" className="text-amber-400" />);

    while (stars.length < 5) stars.push(<BsStar key={`e${stars.length}`} className="text-amber-400/40" />);

    return <div className="flex gap-0.5">{stars}</div>;
}


export async function generateMetadata({ params }) {
    const { id } = await params;
    const { data: product, success } = await getSingleProduct(id);

    if (!success || !product) {
        return {
            title: "Product Not Found",
        };
    }

    const { title, bangla, description, image } = product;
    const displayTitle = bangla || title;


    const productImageUrl = image || "https://i.ibb.co.com/mCWKWx7C/image.png";

    return {
        title: displayTitle,
        description: description?.substring(0, 160) || `Buy ${displayTitle} from Little Wonders.`,
        openGraph: {
            title: `${displayTitle} | Little Wonders`,
            description: description?.substring(0, 160) || `Buy ${displayTitle} from Little Wonders.`,
            url: `https://little-wonders-livid.vercel.app/products/${id}`,
            images: [
                {
                    url: productImageUrl,
                    width: 800,
                    height: 800,
                    alt: displayTitle,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${displayTitle} | Little Wonders`,
            description: description?.substring(0, 160) || `Buy ${displayTitle} from Little Wonders.`,
            images: [productImageUrl],
        },
    };
}


export default async function SingleProduct({ params }) {
    const { id } = await params;

    const { data: product, success } = await getSingleProduct(id);

    if (!success || !product) notFound();

    const {
        _id,
        bangla,
        title,
        discount,
        price,
        image,
        ratings,
        reviews,
        sold,
        info,
        sizes,
        color,
        description,
        qna
    } = product;

    const discountedPrice = discount
        ? Math.round(price - (price * discount / 100))
        : price;

    const savings = price - discountedPrice;

    return (
        <div className="py-8 max-w-6xl mx-auto">

            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6 text-base-content/60">
                <ul>
                    <li><Link href="/">Home</Link></li>

                    <li><Link href="/products">Products</Link></li>

                    <li className="text-base-content font-medium">
                        <span className="line-clamp-1">{bangla || title}</span>
                    </li>
                </ul>
            </div>

            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

                {/* Image Column */}
                <div className="flex flex-col gap-4">
                    <div className="relative bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden aspect-square flex items-center justify-center p-8">
                        {discount > 0 && (
                            <div className="absolute top-4 left-4 badge badge-secondary badge-lg font-bold z-10">
                                -{discount}% OFF
                            </div>
                        )}
                        <Image
                            src={image}
                            alt={title}
                            width={480}
                            height={480}
                            className="object-contain w-full h-full drop-shadow-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Details Column */}
                <div className="flex flex-col gap-5">

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-base-content leading-snug mb-1">
                            {bangla || title}
                        </h1>
                        <p className="text-base-content/50 text-sm">{title}</p>
                    </div>

                    {/* Rating & Stats */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <StarRating rating={ratings} />
                            <span className="font-semibold text-base-content">{ratings}</span>
                        </div>
                        <span className="text-base-content/40">|</span>
                        <span className="text-sm text-base-content/60">
                            <span className="font-medium text-base-content">{reviews}</span> Reviews
                        </span>
                        <span className="text-base-content/40">|</span>
                        <span className="text-sm text-base-content/60 flex items-center gap-1">
                            <MdOutlineSell className="text-success" />
                            <span className="font-medium text-base-content">{sold}</span> Sold
                        </span>
                    </div>

                    {/* Price */}
                    <div className="bg-base-200/60 rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-extrabold text-primary">৳{discountedPrice}</span>
                            {discount > 0 && (
                                <span className="text-lg line-through text-base-content/40 mb-1">৳{price}</span>
                            )}
                        </div>
                        {savings > 0 && (
                            <p className="text-sm text-success font-medium">
                                আপনি সাশ্রয় করছেন ৳{savings}
                            </p>
                        )}
                    </div>

                    {/* Info Highlights */}
                    {info?.length > 0 && (
                        <ul className="space-y-2">
                            {info.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-base-content/80">
                                    <BsShieldCheck className="text-primary mt-0.5 shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Sizes */}
                    {sizes?.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold mb-2 text-base-content/70">Size</p>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((s, i) => (
                                    <button key={i} className="btn btn-outline btn-sm rounded-full">{s}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {color?.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold mb-2 text-base-content/70">Color</p>
                            <div className="flex flex-wrap gap-2">
                                {color.map((c, i) => (
                                    <button key={i} className="btn btn-outline btn-sm rounded-full">{c}</button>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-2">
                        {/* <button className="btn btn-primary btn-sm flex-1">
                            <BsCartPlus className="text-lg" /> Add to Cart
                        </button> */}

                        <AddToCartButton
                            product={{ ...product, _id: _id?.toString() }}

                        ></AddToCartButton>

                        {/* <button className="btn btn-outline flex-1 rounded-full">
                            এখনই কিনুন
                        </button> */}
                    </div>

                    {/* Delivery Note */}
                    <div className="flex items-center gap-2 text-sm text-base-content/60 border border-base-200 rounded-xl px-4 py-3">
                        <BsTruck className="text-primary text-lg shrink-0" />
                        <span>সারাদেশে ডেলিভারি পাওয়া যাচ্ছে</span>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            {description && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-base-content mb-4 pb-2 border-b border-base-200">
                        পণ্যের বিবরণ
                    </h2>
                    <div className="text-base-content/80 leading-relaxed space-y-4 text-sm md:text-base">
                        {description.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>
            )}

            {/* Q&A Section */}
            {qna?.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-base-content mb-4 pb-2 border-b border-base-200">
                        সচরাচর জিজ্ঞাসা
                    </h2>
                    <div className="space-y-3">
                        {qna.map((item, i) => (
                            <div key={i} className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-200">
                                <input type="radio" name="qna-accordion" defaultChecked={i === 0} />
                                <div className="collapse-title font-semibold text-sm md:text-base pr-8">
                                    {item.question}
                                </div>
                                <div className="collapse-content text-sm text-base-content/70">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Back Button */}
            <div className="pt-2">
                <Link href="/products" className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-base-content">
                    <BsArrowLeft />
                    সকল পণ্য দেখুন
                </Link>
            </div>

        </div>
    );
}