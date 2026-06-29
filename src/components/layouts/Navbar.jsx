import React from 'react';
import Logo from './Logo';
import NavLink from '../button/NavLink';
import Link from 'next/link';
import { BsCart3 } from "react-icons/bs";
import AuthButton from '../button/AuthButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption';
import { getCart } from '@/action/server/carts';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    let totalProductCount = 0;

    if (session?.user) {
        const cart = await getCart();
        if (cart?.success && cart?.data) {
            totalProductCount = cart.data.reduce((acc, item) => acc + item.quantity, 0);
        }
    }

    const nav = (
        <>
            <li>
                <NavLink href={"/"} >Home</NavLink>
            </li>
            <li>
                <NavLink href={"/products"} >Products</NavLink>
            </li>
            <li>
                <NavLink href={"/blog"} >Blog</NavLink>
            </li>
            <li>
                <NavLink href={"/contact"} >Contact</NavLink>
            </li>
        </>
    )

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-4 rounded-2xl border border-base-200">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {
                                nav
                            }
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {
                            nav
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    <Link href={"/cart"} className="relative btn btn-ghost btn-circle text-primary mr-2">
                        <div className="indicator">
                            <BsCart3 size={24} />
                            {totalProductCount > 0 && (
                                <span className="badge badge-secondary badge-sm indicator-item font-semibold">
                                    {totalProductCount}
                                </span>
                            )}
                        </div>
                    </Link>

                    <AuthButton></AuthButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;