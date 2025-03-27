'use client'
// import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Themetoggle } from './ThemeToggle';
import SignInButton from './SignInButoon';
import UserAccountNav from './UserAccountNav';


const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className="z-50 sticky top-0 w-full bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border-b border-primary/10 px-4 lg:px-8
">
      <div className="max-w-[88rem] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className='flex items-center space-x-12'>
            <Link href="/" className="flex items-center">
              {/* <Image
                width={500}
                height={500}
                src={image}
                alt="talko.png"
                quality={100}
                priority={true}
                className="w-10 h-10 mt-1 rounded-full object-cover flex-shrink-0"
              /> */}
              <h3 className="text-2xl font-bold">Talko</h3>
            </Link>

          </div>

          <div className="flex items-center space-x-1">
            <Themetoggle />
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton text={"Sign In"} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;