import { Suspense } from 'react';
import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import ProductsSkeleton from '@/components/skeleton/ProductsSkeleton';

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8">



      {/* Hero Section */}
      <section>
        <Banner />
      </section>

      {/* Products Section */}
      <section>
        <Suspense fallback={<ProductsSkeleton />}>
          <Products />
        </Suspense>
      </section>

    </div>
  );
}
