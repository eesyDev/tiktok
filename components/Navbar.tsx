import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import  { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';
import { IUser } from '../types';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile, addUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
        <Link href="/">
            <div className='w-[100px] md:w-[130px] md:h-[30px] h-[40px]'>
                <Image 
                    src={Logo}
                    alt='logo'
                    className='cursor-pointer'
                />
            </div>
        </Link>
        <div>SEARCH</div>
        <div>
          {
            user ? (
              <div>{user.userName}</div>
              // <button>googleLogout()</button>
            ) : (
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response, addUser)}
                onError={() => console.log('Error')}
              />
            )
          }
        </div>
    </div>
  )
}

export default Navbar