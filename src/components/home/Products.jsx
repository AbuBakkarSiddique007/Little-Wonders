import ProductCard from '../productCard/ProductCard';
import { getProducts } from '@/action/server/products';


const Products = async () => {
    const { data } = await getProducts()

    return (
        <div className="py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                    Featured <span className="text-primary">Products</span>
                </h2>
                <p className="text-base-content/70 mt-2">Find the perfect educational toy for your little wonder</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {data.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="text-center mt-12">
                <button className="btn btn-outline btn-wide rounded-full">View All Products</button>
            </div>
        </div>
    );
};

export default Products;