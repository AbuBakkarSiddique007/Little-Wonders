"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const AuthButton = () => {
    const session = useSession()

    return (
        <div>
            {
                session.status === "authenticated" ? (
                    <div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className='btn btn-primary'>Logout</button>
                    </div>
                ) : (
                    <Link href={"/login"} ><button className="btn btn-neutral">Login</button></Link>
                )
            }
        </div>
    );
};

export default AuthButton;