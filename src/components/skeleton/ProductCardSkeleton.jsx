const ProductCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 h-full animate-pulse">
            {/* Image placeholder */}
            <div className="h-56 w-full bg-base-300 rounded-t-box" />

            <div className="card-body p-5 flex flex-col gap-3">
                {/* Title lines */}
                <div className="h-4 bg-base-300 rounded w-full" />
                <div className="h-4 bg-base-300 rounded w-3/4" />

                {/* Price */}
                <div className="flex items-center gap-2 mt-auto pt-4">
                    <div className="h-6 bg-base-300 rounded w-20" />
                    <div className="h-4 bg-base-300 rounded w-12" />
                </div>

                {/* Buttons */}
                <div className="card-actions justify-between items-center mt-4 w-full gap-2">
                    <div className="h-9 bg-base-300 rounded-btn flex-1" />
                    <div className="h-9 bg-base-300 rounded-btn w-20" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
