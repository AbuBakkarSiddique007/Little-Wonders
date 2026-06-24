import { Suspense } from 'react';
import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import ProductsSkeleton from '@/components/skeleton/ProductsSkeleton';
import { getServerSession } from 'next-auth';
import Test from '@/components/Test/Test';

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8">


      <div className='text-center p-6 bg-base-200 border border-base-300 rounded-2xl'>
        <h1 className='text-2xl font-bold mb-4'>User Session</h1>
        <h2 className='text-left'>{JSON.stringify(session)}</h2>

        <br />


        <Test></Test>
      </div>



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
