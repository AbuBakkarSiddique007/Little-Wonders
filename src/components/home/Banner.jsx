import { fontBangla } from '@/app/layout';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10 md:py-16'>
            <div className='w-full flex flex-col justify-center gap-6'>
                <h1 className={` ${fontBangla.className} text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-tight `}>
                    শিশুর হাসি, মায়ের আস্থা | <span className='text-primary'>ছোট্ট বিস্ময়</span>
                </h1>
                <p className='text-lg md:text-xl text-base-content/80'>
                    শিক্ষামূলক বোর্ড থেকে সুপারহিরো পোশাক | শেখা আর খেলা এখন একসাথে!
                </p>
                <div className='flex flex-wrap gap-4 mt-2'>
                    <button className='btn btn-primary btn-lg rounded-full'>Shop Now</button>
                    <button className='btn btn-outline btn-lg rounded-full'>Explore Categories</button>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <Image
                    src="/assets/hero.png"
                    width={800}
                    height={800}
                    alt="Little Wonders Hero"
                    className='w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl'
                    priority
                />
            </div>
        </div>
    );
};

export default Banner;