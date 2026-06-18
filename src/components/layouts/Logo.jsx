import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/">
            <div className='flex items-center gap-2'>
                <Image src="/assets/Logo.png" alt="Logo" width={50} height={50} className='rounded-full'></Image>
                
                <h1 className='text-2xl font-bold'>Little Wonders</h1>
            </div>
        </Link>
    );
};

export default Logo;