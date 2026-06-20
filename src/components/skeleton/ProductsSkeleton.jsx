import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';

const ProductsSkeleton = () => {
    return (
        <div className="py-12">
            <div className="text-center mb-10">
                <div className="h-10 bg-base-300 rounded w-64 mx-auto animate-pulse" />
                <div className="h-4 bg-base-300 rounded w-80 mx-auto mt-3 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
                
            </div>
        </div>
    );
};

export default ProductsSkeleton;
