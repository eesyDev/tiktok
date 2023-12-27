import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import { GoVerified } from 'react-icons/go';

import { IUser } from '@/types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

const SuggestedAccounts = ({fetchAllUsers, allUsers} : IProps) => {
  return (
    <div className='xl:border-b-2 border-gray-300 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 '>SuggestedAccounts</p>
      <div>
        {allUsers.map((user: IUser, i: number) => (
          <Link href={`/profile/${user._id}`} key={i}>
              <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer'>
                <div className='w-8 h-8'>
                    <Image src={user.image} alt='user-profile' width={30} height={30} className='rounded-full'/>
                </div>
                <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold lowercase'>
                      {user.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className='text-blue-400'/>
                    </p>
                    <p className='capitalize'>
                      {user.userName}
                    </p>
                </div>
              </div>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts