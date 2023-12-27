import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { IUser, Video } from '@/types';

interface IProps {
    data: {
        user: IUser;
        userVideo: Video[];
        userLikedVideo: Video[];
    }
}


const Profile = ({ data } : IProps) => {
    const { user, userVideo, userLikedVideo } = data;
    const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
    const [videoList, setVideoList] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            if (showUserVideos) {
                setVideoList(userVideo)
            } else {
                setVideoList(userLikedVideo)
            }
        };
        fetchVideos();
    }, [showUserVideos, userLikedVideo, userVideo]);;

    const videos = showUserVideos ?  'border-b-2 border-black' : 'text-gray-400';
    const likes = !showUserVideos ?  'border-b-2 border-black' : 'text-gray-400';

    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        width={120}
                        height={120}
                        className='rounded-full'
                        src={user?.image}
                        alt='user-profile'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='lowercase text-md md:text-2xl font-bold flex gap-2 items-center justify-center'>
                        <span>{user?.userName.replace(/\s+/g, '')}</span>
                        <GoVerified className='text-blue-400 md:text-xl text-md'/>
                    </div>
                    <p>{user?.userName}</p>
                </div>
            </div>
            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={` ${videos} text-xl font-semibold mt-2 cursor-pointer`} onClick={() => setShowUserVideos(true)}>Videos</p>
                    <p className={`${likes} text-xl font-semibold mt-2 cursor-pointer`} onClick={() => setShowUserVideos(false)}>Liked</p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {videoList?.length > 0 ? (
                        videoList?.map((post: Video, index: number) => (
                            <VideoCard post={post} key={index} />
                        ))
                    ) : (
                        <NoResults text='No res'/>
                    )}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({
    params: { userId }
} : {
    params : { userId: string }
}) => {
    const res = await axios.get(`http://localhost:3000/api/profile/${userId}`);

    return {
        props: { data: res.data }
    }
}
export default Profile;