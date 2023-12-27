import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import useAuthStore from "@/store/authStore";
import { IUser, Video } from "@/types";


const Search = ({videos} : {videos: Video[]}) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers } : {allUsers: IUser[]} = useAuthStore();

    const router = useRouter();
    const { searchTerm } : any = router.query;

    const searchedAccounts = allUsers?.filter((user : IUser) => user.userName.toLowerCase().includes(searchTerm))

    const accounts = isAccounts ?  'border-b-2 border-black' : 'text-gray-400';
    const video = !isAccounts ?  'border-b-2 border-black' : 'text-gray-400';

    return (
        <div className="w-full">
            <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
                <p className={` ${accounts} text-xl font-semibold mt-2 cursor-pointer`} onClick={() => setIsAccounts(true)}>Accounts</p>
                <p className={`${video} text-xl font-semibold mt-2 cursor-pointer`} onClick={() => setIsAccounts(false)}>Videos</p>
            </div>
            {isAccounts ? (             
                <div className="mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, i: number) => (
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
                        ))
                    ) : (
                        <NoResults text={`No Accounts Results for ${searchTerm}`} />
                    )}
                
            </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {videos?.length > 0 ? (
                        videos?.map((post: Video, index: number) => (
                            <VideoCard post={post} key={index} />
                        ))
                    ) : (
                        <NoResults text={`No video Results for ${searchTerm}`}/>
                    )}
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = async ({
    params: { searchTerm }
} : {
    params : { searchTerm: string }
}) => {
    const res = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);

    return {
        props: { videos: res.data }
    }
}

export default Search;