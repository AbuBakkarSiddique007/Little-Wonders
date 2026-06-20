import Products from '@/components/home/Products';

export const metadata = {
    title: "All Products",
    description: "Explore our wide collection of educational toys, learning cards, and costumes for your little ones at Little Wonders.",
    openGraph: {
        title: "All Products | Little Wonders",
        description: "Explore our wide collection of educational toys, learning cards, and costumes for your little ones.",
        url: "https://little-wonders-livid.vercel.app/products",
        images: [
            {
                url: "https://i.ibb.co.com/4nVDG1Yb/image.png",
                width: 1200,
                height: 630,
                alt: "Little Wonders Products Page",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "All Products | Little Wonders",
        description: "Explore our wide collection of educational toys, learning cards, and costumes for your little ones.",
        images: ["https://i.ibb.co.com/4nVDG1Yb/image.png"],
    },
};

const ProductsPage = () => {
    return (
        <div>
            <Products></Products>
        </div>
    );
};

export default ProductsPage;